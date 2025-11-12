"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, Clock } from "lucide-react";

// Mock data
const users = [
  {
    id: "u1",
    name: "Gab Admin",
    email: "gab@example.com",
    totalDeposited: 25000,
    isInvesting: true,
    joinedAt: "2024-12-01",
    kycVerified: true,
  },
  {
    id: "u2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    totalDeposited: 8000,
    isInvesting: false,
    joinedAt: "2025-02-10",
    kycVerified: false,
  },
  {
    id: "u3",
    name: "John Smith",
    email: "john.smith@example.com",
    totalDeposited: 13000,
    isInvesting: true,
    joinedAt: "2025-03-21",
    kycVerified: true,
  },
];

const UserTable = () => {
  const handleViewUser = (id: string) => {
    console.log("View user:", id);
    // router.push(`/admin/users/${id}`);
  };

  const handleDeleteUser = (id: string) => {
    console.log("Delete user:", id);
    // confirmation + API call
  };

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
            <TableHead>Investing</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/30 transition">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                $
                {user.totalDeposited.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>

              <TableCell>
                <Badge
                  variant={user.isInvesting ? "default" : "secondary"}
                  className={`${
                    user.isInvesting
                      ? "bg-green-500/10 text-green-600 border-green-500/20"
                      : "bg-red-500/10 text-red-600 border-red-500/20"
                  }`}
                >
                  {user.isInvesting ? "Investing" : "Not Investing"}
                </Badge>
              </TableCell>

              <TableCell>
                {user.kycVerified ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle className="h-4 w-4" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-500 font-medium">
                    <Clock className="h-4 w-4" /> Pending
                  </span>
                )}
              </TableCell>

              <TableCell>
                {new Date(user.joinedAt).toLocaleDateString()}
              </TableCell>

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
                    <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                      View User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
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
