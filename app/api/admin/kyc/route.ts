import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import UserExtra from "@/models/userExtra.model";
import { NextRequest } from "next/server";
import { kycModel } from "@/models/kyc.model";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sessionUser = session.user as unknown as any;
    if (sessionUser.role !== "admin") {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 50;
    const skip = (page - 1) * limit;

    // fetch paginated KYC submissions
    const totalKyc = await kycModel.countDocuments();
    const kycSubmissions = await kycModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // gather unique userIds from KYC rows (coerce to string)
    const userIdSet = new Set<string>();
    for (const k of kycSubmissions) {
      if (k.userId) userIdSet.add(String(k.userId));
    }
    const userIds = Array.from(userIdSet);

    // fetch only relevant userExtra docs
    const userExtras =
      userIds.length > 0
        ? await UserExtra.find({ userId: { $in: userIds } }).lean()
        : [];

    // build lookup map (keyed by userId string)
    const userMap: Record<string, any> = {};
    for (const u of userExtras) {
      userMap[String(u.userId)] = u;
    }

    // transform KYC rows and inject user info
    const transformedData = kycSubmissions.map((kyc: any) => {
      const uid = kyc.userId ? String(kyc.userId) : null;
      const user = uid ? userMap[uid] : null;

      // allow either `name` or `fullName` in userExtra
      const name = user?.name || user?.fullName || "Unknown User";
      const email = user?.email || "No Email";

      return {
        id: kyc._id,
        userId: uid || kyc.userId,
        name,
        email,
        idType: kyc.idType,
        frontImageUrl: kyc.frontImageUrl,
        backImageUrl: kyc.backImageUrl,
        status: kyc.status,
        remarks: kyc.remarks ?? null,
        submittedAt: kyc.createdAt
          ? kyc.createdAt.toISOString().split("T")[0]
          : null,
        updatedAt: kyc.updatedAt
          ? kyc.updatedAt.toISOString().split("T")[0]
          : null,
      };
    });

    return Response.json({
      success: true,
      data: transformedData,
      pagination: {
        page,
        limit,
        total: totalKyc,
        totalPages: Math.ceil(totalKyc / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Error fetching KYC submissions:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
