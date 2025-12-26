import crypto from "crypto";
import Referral from "@/models/referral.model";
import UserExtra from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";
import Investment from "@/models/investment.model";
import { transporter } from "@/lib/nodemailer";

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
  // Ensure uniqueness
  const exists = await UserExtra.findOne({ referralCode: code });
  if (exists) return ensureReferralCodeForUser(userExtra);

  userExtra.referralCode = code;
  await userExtra.save();
  return code;
}

export async function createPendingReferral(
  referrerId: string | any,
  referredId: string | any
) {
  // Accept both ObjectId and string ids
  const exists = await Referral.findOne({
    referrer: referrerId,
    referred: referredId,
  });
  if (exists) return exists;

  const ref = await Referral.create({
    referrer: referrerId,
    referred: referredId,
    amount: REFERRAL_AMOUNT,
  });
  return ref;
}

export async function awardReferralIfEligible(referredUserId: string) {
  try {
    // Get referred user's extra doc
    const referred = await UserExtra.findOne({ userId: referredUserId });
    if (!referred) return { success: false, reason: "no_referred_user" };

    // Find a pending referral for this referred user
    const referral = await Referral.findOne({
      referred: referred._id,
      status: "pending",
    });

    // If no explicit referral record, check if referred.referrer exists and create a pending referral
    let referrerExtra = null;
    if (!referral) {
      if (!referred.referrer) return { success: false, reason: "no_referrer" };
      referrerExtra = await UserExtra.findById(referred.referrer);
      if (!referrerExtra)
        return { success: false, reason: "no_referrer_user_extra" };
    } else {
      referrerExtra = await UserExtra.findById(referral.referrer);
    }

    if (!referrerExtra) return { success: false, reason: "no_referrer_extra" };

    // Ensure there's at least one completed deposit transaction for referred
    const deposit = await Transaction.findOne({
      userId: referredUserId,
      type: "deposit",
      status: "completed",
    });
    if (!deposit) return { success: false, reason: "no_completed_deposit" };

    // Check for an active investment >= MIN_INVESTMENT
    const investment = await Investment.findOne({
      userId: referredUserId,
      status: "active",
      principal: { $gte: MIN_INVESTMENT },
    });
    if (!investment)
      return { success: false, reason: "no_qualifying_investment" };

    // At this point: eligible. Ensure we have a referral record
    let referralRecord = referral;
    if (!referralRecord) {
      referralRecord = await createPendingReferral(
        referrerExtra._id,
        referred._id
      );
    }

    if (referralRecord.status === "awarded") {
      return { success: false, reason: "already_awarded" };
    }

    // Award the referrer: create transaction and credit depositedBalance
    const session = await Transaction.db.startSession();
    session.startTransaction();
    try {
      const tx = await Transaction.create([
        {
          userId: referrerExtra.userId || referrerExtra.userId?.toString(),
          type: "referral-bonus",
          amount: REFERRAL_AMOUNT,
          currency: "USD",
          status: "completed",
          description: `Referral bonus for referring user ${
            referred.email || referred._id
          }`,
        },
      ]);

      // tx is an array because create with array returns array
      const createdTx: any = Array.isArray(tx) ? tx[0] : tx;

      referrerExtra.depositedBalance =
        (referrerExtra.depositedBalance || 0) + REFERRAL_AMOUNT;
      referrerExtra.totalReferralBonus =
        (referrerExtra.totalReferralBonus || 0) + REFERRAL_AMOUNT;
      await referrerExtra.save();

      referralRecord.status = "awarded";
      referralRecord.awardedAt = new Date();
      referralRecord.transactionId = createdTx._id;
      await referralRecord.save();

      await session.commitTransaction();
      session.endSession();

      // Send email to referrer (no inngest)
      try {
        const mailOptions = {
          from: `"Signalist" <${process.env.NODEMAILER_EMAIL}>`,
          to: referrerExtra.email,
          subject: `You received a $${REFERRAL_AMOUNT} referral bonus!`,
          text: `Congrats! You've received a $${REFERRAL_AMOUNT} referral bonus for referring ${
            referred.email || "a user"
          }. The funds have been added to your deposited balance.`,
          html: `<p>Congratulations <strong>${
            referrerExtra.fullName
          }</strong>!</p>
                 <p>You've received a <strong>$${REFERRAL_AMOUNT}</strong> referral bonus for referring <strong>${
            referred.email || "a user"
          }</strong>. The funds have been added to your deposited balance.</p>
                 <p>Thanks for sharing Signalist!</p>`,
        };
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Failed to send referral email:", err);
      }

      return {
        success: true,
        referral: referralRecord,
        transactionId: createdTx._id,
      };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error awarding referral:", err);
      return { success: false, error: err };
    }
  } catch (error) {
    console.error("awardReferralIfEligible error:", error);
    return { success: false, error };
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
          referred: referred
            ? {
                id: referred._id.toString(),
                email: referred.email,
                fullName: referred.fullName,
              }
            : null,
        };
      })
    );

    return { success: true, data: { referralCode: userExtra.referralCode, referrals: enriched } };
  } catch (err) {
    console.error("getReferralsForCurrentUser error:", err);
    return { success: false, error: "Failed to fetch referrals" };
  }
};
