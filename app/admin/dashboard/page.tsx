import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react";
import AdminKycTable from "@/components/admin/kyc/KycTable";
import TransactionsTable from "@/components/admin/transactions/TransactionsTable";
import { getAdminMetrics } from "@/lib/actions/adminMetrics.action";

type Metrics = {
  totalUsers: number;
  totalInvestments: number;
  totalInvestedAmount: number;
  activeInvestments: number;
  totalDeposits: number;
  totalWithdrawals: number;
  kycStats: { pending: number; approved: number; rejected: number };
};

const Dashboard = async () => {
  // fetch real metrics from the database
  const result = await getAdminMetrics();

  const metrics: Metrics =
    result && result.success
      ? (result.data as Metrics)
      : {
          totalUsers: 0,
          totalInvestments: 0,
          totalInvestedAmount: 0,
          activeInvestments: 0,
          totalDeposits: 0,
          totalWithdrawals: 0,
          kycStats: { pending: 0, approved: 0, rejected: 0 },
        };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of platform metrics and recent activities
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investments
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalInvestments}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeInvestments} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invested
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(metrics.totalInvestedAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all investments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deposits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(metrics.totalDeposits)}
            </div>
            <p className="text-xs text-muted-foreground">
              Withdrawals: {formatPrice(metrics.totalWithdrawals)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KYC Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.kycStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.kycStats.approved}
            </div>
            <p className="text-xs text-muted-foreground">Verified users</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <TransactionsTable preview={true} />

      {/* Recent KYC Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent KYC Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminKycTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
