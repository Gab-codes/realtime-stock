import crypto from "crypto";
import Referral from "@/models/referral.model";
import UserExtra from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";
import mongoose from "mongoose";

export const REFERRAL_AMOUNT = 100;
export const MIN_INVESTMENT = 500;

export const generateReferralCode = (len = 8) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len)
    .toUpperCase();
};

export async function ensureReferralCodeForUser(userExtra: any) {
  if (userExtra.referralCode) return userExtra.referralCode;

  const code = generateReferralCode();

  const exists = await UserExtra.findOne({ referralCode: code });
  if (exists) return ensureReferralCodeForUser(userExtra);

  userExtra.referralCode = code;
  await userExtra.save();
  return code;
}

export async function createPendingReferral(
  referrerUserExtraId: string,
  referredUserExtraId: string
) {
  const exists = await Referral.findOne({
    referrer: referrerUserExtraId,
    referred: referredUserExtraId,
  });

  if (exists) return exists;

  return Referral.create({
    referrer: referrerUserExtraId,
    referred: referredUserExtraId,
    amount: REFERRAL_AMOUNT,
    status: "pending",
  });
}

export async function awardReferralIfEligible(referredUserExtraId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get pending referral for THIS USER
    const referral = await Referral.findOne({
      referred: referredUserExtraId,
      status: "pending",
    }).session(session);

    if (!referral) {
      await session.abortTransaction();
      return;
    }

    // Fetch referred user (to access auth userId)
    const referredUser = await UserExtra.findById(referral.referred).session(
      session
    );

    if (!referredUser) throw new Error("Referred user not found");

    const authUserId = referredUser.userId;

    // Check COMPLETED deposit exists
    const hasDeposit = await Transaction.exists({
      userId: authUserId,
      type: "deposit",
      status: "completed",
    });

    if (!hasDeposit) {
      await session.abortTransaction();
      return;
    }

    // Check COMPLETED investment exists
    const qualifyingInvestment = await Transaction.findOne({
      userId: authUserId,
      type: "investment",
      status: "completed",
      amount: { $gte: MIN_INVESTMENT },
    }).session(session);

    if (!qualifyingInvestment) {
      await session.abortTransaction();
      return;
    }

    // Prevent double-award
    if (referral.status === "awarded") {
      await session.abortTransaction();
      return;
    }

    // Credit referrer
    const referrer = await UserExtra.findById(referral.referrer).session(
      session
    );

    if (!referrer) throw new Error("Referrer not found");

    referrer.depositedBalance += referral.amount;
    await referrer.save({ session });

    // Create transaction
    const txn = await Transaction.create(
      [
        {
          userId: referrer.userId,
          type: "referral-bonus",
          amount: referral.amount,
          currency: "USD",
          status: "completed",
          description: "Referral bonus awarded",
        },
      ],
      { session }
    );

    // Update referral
    referral.status = "awarded";
    referral.awardedAt = new Date();
    referral.transactionId = txn[0]._id.toString();
    await referral.save({ session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    console.error("Referral award failed:", err);
  } finally {
    session.endSession();
  }
}

export const getReferralsForCurrentUser = async () => {
  try {
    const { auth } = await import("@/lib/better-auth/auth");
    const { headers } = await import("next/headers");
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Not authenticated" };

    const userId = session.user.id;
    const userExtra = await UserExtra.findOne({ userId });
    if (!userExtra)
      return { success: true, data: { referralCode: null, referrals: [] } };

    // Ensure referral code exists
    if (!userExtra.referralCode) {
      await ensureReferralCodeForUser(userExtra);
    }

    const referrals = await Referral.find({ referrer: userExtra._id })
      .sort({ createdAt: -1 })
      .lean();

    const enriched = await Promise.all(
      referrals.map(async (r: any) => {
        const referred = await UserExtra.findById(r.referred).lean();

        return {
          ...r,

          // FIX: convert ObjectIds to strings
          _id: r._id.toString(),
          referrer: r.referrer?.toString(),
          referred: referred
            ? {
                id: (referred as any)._id.toString(),
                email: (referred as any).email,
                fullName: (referred as any).fullName,
              }
            : null,

          // FIX: Dates → ISO strings
          createdAt: r.createdAt?.toISOString(),
          updatedAt: r.updatedAt?.toISOString(),
        };
      })
    );

    return {
      success: true,
      data: { referralCode: userExtra.referralCode, referrals: enriched },
    };
  } catch (err) {
    console.error("getReferralsForCurrentUser error:", err);
    return { success: false, error: "Failed to fetch referrals" };
  }
};
