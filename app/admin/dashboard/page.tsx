import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import AdminKycTable from "@/components/admin/kyc/KycTable";

const Dashboard = () => {
  // Dummy data for development
  const metrics = {
    totalUsers: 1247,
    totalInvestments: 89,
    totalInvestedAmount: 245000,
    activeInvestments: 67,
    totalDeposits: 890000,
    totalWithdrawals: 120000,
    kycStats: {
      pending: 23,
      approved: 156,
      rejected: 8,
    },
  };

  const recentActivities = {
    transactions: [
      {
        id: "txn1",
        user: "John Doe",
        type: "deposit",
        amount: 5000,
        status: "completed",
      },
      {
        id: "txn2",
        user: "Jane Smith",
        type: "withdrawal",
        amount: 2500,
        status: "pending",
      },
      {
        id: "txn3",
        user: "Bob Johnson",
        type: "investment",
        amount: 10000,
        status: "completed",
      },
      {
        id: "txn4",
        user: "Alice Brown",
        type: "deposit",
        amount: 7500,
        status: "completed",
      },
      {
        id: "txn5",
        user: "Charlie Wilson",
        type: "withdrawal",
        amount: 3000,
        status: "pending",
      },
    ],
    investments: [
      {
        id: "inv1",
        user: "John Doe",
        planLabel: "30-day Plan",
        principal: 10000,
        status: "active",
      },
      {
        id: "inv2",
        user: "Jane Smith",
        planLabel: "60-day Plan",
        principal: 25000,
        status: "active",
      },
      {
        id: "inv3",
        user: "Bob Johnson",
        planLabel: "90-day Plan",
        principal: 50000,
        status: "completed",
      },
      {
        id: "inv4",
        user: "Alice Brown",
        planLabel: "30-day Plan",
        principal: 15000,
        status: "active",
      },
      {
        id: "inv5",
        user: "Charlie Wilson",
        planLabel: "60-day Plan",
        principal: 30000,
        status: "active",
      },
    ],
    kyc: [
      {
        id: "kyc1",
        user: "David Lee",
        status: "pending",
        createdAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "kyc2",
        user: "Emma Davis",
        status: "approved",
        createdAt: "2024-01-14T14:30:00Z",
      },
      {
        id: "kyc3",
        user: "Frank Miller",
        status: "rejected",
        createdAt: "2024-01-13T09:15:00Z",
      },
      {
        id: "kyc4",
        user: "Grace Taylor",
        status: "pending",
        createdAt: "2024-01-12T16:45:00Z",
      },
      {
        id: "kyc5",
        user: "Henry Anderson",
        status: "approved",
        createdAt: "2024-01-11T11:20:00Z",
      },
    ],
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.kycStats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">Needs resubmission</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.transactions.slice(0, 5).map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(txn.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        txn.status === "completed" ? "default" : "secondary"
                      }
                      className={
                        txn.status === "completed"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
