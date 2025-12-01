import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import { headers } from "next/headers";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const allUsers = await userExtraModel.find({}).lean();
    if (!allUsers?.length) {
      return NextResponse.json({ success: true, data: [] });
    }

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
      return NextResponse.json({ success: true, data: [] });
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

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(merged)),
    });
  } catch (error) {
    console.error("getAllUsersData error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch all users" },
      { status: 500 }
    );
  }
};
