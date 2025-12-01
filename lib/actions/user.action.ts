import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import { headers } from "next/headers";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { unstable_cache } from "next/cache";

export const getUserData = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    const userData = await userExtraModel.findOne({ userId }).lean();

    if (!userData) {
      return {
        success: true,
        message: "User data not found",
        data: {
          depositedBalance: 0,
          totalProfit: 0,
          kycStatus: "unverified",
        },
      };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("getUserBalance error:", error);
    return { success: false, error: "Failed to get user balance" };
  }
};

export const getAllUsersData = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const allUsers = await userExtraModel.find({}).lean();
    if (!allUsers?.length) {
      return { success: true, data: [] };
    }

    // Collect user ids from userExtra table
    const rawIds = Array.from(
      new Set(allUsers.map((u) => u.userId).filter(Boolean))
    );

    const objectIds: ObjectId[] = [];
    const stringIds: string[] = [];

    for (const id of rawIds) {
      try {
        objectIds.push(ObjectId.createFromHexString(id));
      } catch {
        stringIds.push(id);
      }
    }

    const usersColl = mongoose.connection?.db?.collection("user");
    if (!usersColl) {
      return { success: true, data: [] };
    }

    let authUsers: any[] = [];
    if (objectIds.length || stringIds.length) {
      const orClauses: any[] = [];
      if (objectIds.length) orClauses.push({ _id: { $in: objectIds } });
      if (stringIds.length) orClauses.push({ _id: { $in: stringIds } });

      const query = orClauses.length === 1 ? orClauses[0] : { $or: orClauses };

      authUsers = await usersColl
        .find(query)
        .project({
          _id: 1,
          email: 1,
          name: 1,
          banned: 1,
          disabled: 1,
          status: 1,
        })
        .toArray();
    }

    const authById = new Map<string, any>();
    for (const u of authUsers) {
      authById.set(String(u._id), u);
    }

    const merged = allUsers.map((ue) => {
      const authUser = authById.get(String(ue.userId)) || null;

      const isBanned =
        !!authUser &&
        !!(
          authUser.banned ||
          authUser.disabled ||
          ["banned", "disabled", "suspended"].includes(authUser.status)
        );

      return {
        ...ue,
        authUser: authUser
          ? {
              id: String(authUser._id),
              email: authUser.email ?? null,
              name: authUser.name ?? null,
              rawStatus: authUser.status ?? null,
            }
          : null,
        isBanned,
      };
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(merged)),
    };
  } catch (error) {
    console.error("getAllUsersData error:", error);
    return { success: false, error: "Failed to fetch all users" };
  }
};
