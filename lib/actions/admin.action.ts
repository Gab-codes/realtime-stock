// "use server";

// import { headers } from "next/headers";
// import { auth } from "@/lib/better-auth/auth";
// import userExtraModel from "@/models/userExtra.model";
// import Investment from "@/models/investment.model";
// import Transaction from "@/models/transaction.model";
// import { kycModel } from "@/models/kyc.model";

// export const getAdminDashboardData = async () => {
//   try {
//     const session = await auth.api.getSession({ headers: await headers() });
//     if (!session?.user) return { success: false, error: "Not authenticated" };

//     const sessionUser = session.user as unknown as User;
//     if (sessionUser.role !== "admin") {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Get total users count
//     const totalUsers = await userExtraModel.countDocuments();

//     // Get total investments and amounts
//     const investments = await Investment.find({});
//     const totalInvestments = investments.length;
//     const totalInvestedAmount = investments.reduce(
//       (sum, inv) => sum + inv.principal,
//       0
//     );
//     const activeInvestments = investments.filter(
//       (inv) => inv.status === "active"
//     ).length;

//     // Get total deposits and withdrawals
//     const transactions = await Transaction.find({});
//     const totalDeposits = transactions
//       .filter((txn) => txn.type === "deposit" && txn.status === "completed")
//       .reduce((sum, txn) => sum + txn.amount, 0);
//     const totalWithdrawals = transactions
//       .filter((txn) => txn.type === "withdrawal" && txn.status === "completed")
//       .reduce((sum, txn) => sum + txn.amount, 0);

//     // Get KYC stats
//     const kycStats = await kycModel.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const kycCounts = {
//       pending: 0,
//       approved: 0,
//       rejected: 0,
//     };

//     kycStats.forEach((stat) => {
//       kycCounts[stat._id] = stat.count;
//     });

//     // Get recent activities (last 10 transactions)
//     const recentTransactions = await Transaction.find({})
//       .sort({ createdAt: -1 })
//       .limit(10)
//       .populate("userId", "name email")
//       .lean();

//     // Get recent investments (last 5)
//     const recentInvestments = await Investment.find({})
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("userId", "name email")
//       .lean();

//     // Get recent KYC submissions (last 5)
//     const recentKyc = await kycModel
//       .find({})
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("userId", "name email")
//       .lean();

//     return {
//       success: true,
//       data: {
//         metrics: {
//           totalUsers,
//           totalInvestments,
//           totalInvestedAmount,
//           activeInvestments,
//           totalDeposits,
//           totalWithdrawals,
//           kycStats: kycCounts,
//         },
//         recentActivities: {
//           transactions: recentTransactions.map((txn) => ({
//             id: txn._id.toString(),
//             type: txn.type,
//             amount: txn.amount,
//             currency: txn.currency,
//             status: txn.status,
//             createdAt: txn.createdAt,
//             user: txn.userId ? (txn.userId as any).name : "Unknown",
//           })),
//           investments: recentInvestments.map((inv) => ({
//             id: inv._id.toString(),
//             principal: inv.principal,
//             planLabel: inv.planLabel,
//             status: inv.status,
//             createdAt: inv.createdAt,
//             user: inv.userId ? (inv.userId as any).name : "Unknown",
//           })),
//           kyc: recentKyc.map((kyc) => ({
//             id: kyc._id.toString(),
//             status: kyc.status,
//             createdAt: kyc.createdAt,
//             user: kyc.userId ? (kyc.userId as any).name : "Unknown",
//           })),
//         },
//       },
//     };
//   } catch (error: any) {
//     console.error("Error fetching admin dashboard data:", error);
//     return { success: false, error: "Internal server error" };
//   }
// };
