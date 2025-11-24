"use client";

import Link from "next/link";
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
import { MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { byPassKycApproval } from "@/lib/actions/adminKyc.action";

const UserTable = ({ usersData }: { usersData: UserExtra[] }) => {
  const handleDeleteUser = (id: string) => {
    console.log("Delete user:", id);
    // confirmation + API call
  };

  const handleApproveKyc = (id: string) => {
    approveKycMutation.mutate(id);
  };

  const approveKycMutation = useMutation({
    mutationFn: (id: string) => byPassKycApproval(id),

    onMutate: () => {
      // Show a loading toast and store its ID for update later
      const toastId = toast.loading("Approving KYC...");
      return { toastId };
    },

    onSuccess: (_data, _id, context) => {
      toast.success("KYC approved successfully!", {
        id: context?.toastId,
      });
    },

    onError: (error: any, _variables, context) => {
      toast.error(error?.message || "Failed to approve KYC", {
        id: context?.toastId,
      });
    },
  });

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
            <TableHead>Total Deposited</TableHead>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/user-management/${user.userId}`}>
                        View User
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleApproveKyc(user.userId)}
                    >
                      Approve Kyc
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
