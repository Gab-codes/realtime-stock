"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  UserX2,
  UserCheck2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useUserAdminActions } from "@/hooks/useUserAdminActions";

const UserTable = ({
  usersData,
  refetchUsers,
}: {
  usersData: UserExtra[];
  refetchUsers: () => void;
}) => {
  const {
    banUserMutation,
    unbanUserMutation,
    kycApprovalMutation,
    deleteUserMutation,
  } = useUserAdminActions();

  const handleBanUser = (id: string) =>
    banUserMutation.mutate(id, { onSuccess: () => refetchUsers() });
  const handleRemoveBan = (id: string) =>
    unbanUserMutation.mutate(id, { onSuccess: () => refetchUsers() });
  const handleApproveKyc = (id: string) =>
    kycApprovalMutation.mutate(id, { onSuccess: () => refetchUsers() });
  const handleDeleteUser = (id: string) =>
    deleteUserMutation.mutate(id, { onSuccess: () => refetchUsers() });

  return (
    <div className="rounded-2xl border bg-muted shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all platform users
          </p>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Full Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Deposite Balance</TableHead>
            <TableHead>Ban Status</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersData.map((user) => (
            <TableRow
              key={user.userId}
              className="hover:bg-muted/30 transition"
            >
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                $
                {user.depositedBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                {user.isBanned ? (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <UserX2 className="h-4 w-4" /> Banned
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <UserCheck2 className="h-4 w-4" /> Unbanned
                  </span>
                )}
              </TableCell>

              <TableCell>
                {user.kycStatus === "verified" ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle className="h-4 w-4" /> {user.kycStatus}
                  </span>
                ) : user.kycStatus === "pending" ? (
                  <span className="flex items-center gap-1 text-amber-500 font-medium">
                    <Clock className="h-4 w-4" /> {user.kycStatus}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <XCircle className="h-4 w-4" /> {user.kycStatus}
                  </span>
                )}
              </TableCell>

              <TableCell>{formatDate(user.createdAt)}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-muted-foreground"
                    align="end"
                  >
                    <DropdownMenuItem
                      onClick={() => handleApproveKyc(user.userId)}
                    >
                      Approve Kyc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBanUser(user.userId)}
                    >
                      Ban User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRemoveBan(user.userId)}
                    >
                      Remove Ban
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
