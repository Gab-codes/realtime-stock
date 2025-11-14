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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface KycUser {
  id: string;
  name: string;
  email: string;
  frontImage: string;
  backImage: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

// Mock data
const kycUsers: KycUser[] = [
  {
    id: "1",
    name: "Gab Admin",
    email: "gab@example.com",
    frontImage: "/mock/kyc-front.jpg",
    backImage: "/mock/kyc-back.jpg",
    status: "pending",
    submittedAt: "2025-03-12",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    frontImage: "/mock/kyc-front2.jpg",
    backImage: "/mock/kyc-back2.jpg",
    status: "approved",
    submittedAt: "2025-02-01",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    frontImage: "/mock/kyc-front3.jpg",
    backImage: "/mock/kyc-back3.jpg",
    status: "rejected",
    submittedAt: "2025-01-28",
  },
];

const AdminKycTable = () => {
  const [selectedUser, setSelectedUser] = useState<KycUser | null>(null);

  const handleApprove = (id: string) => {
    console.log("Approve KYC:", id);
    // TODO: Implement API call to approve
  };

  const handleReject = (id: string) => {
    console.log("Reject KYC:", id);
    // TODO: Implement API call to reject
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "approved"
                        ? "default"
                        : user.status === "rejected"
                        ? "outline"
                        : "secondary"
                    }
                    className={
                      user.status === "approved"
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : user.status === "rejected"
                        ? "bg-red-400/10 text-red-600 border-red-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.submittedAt)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md bg-accent max-h-[90dvh] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>KYC Details</DialogTitle>
                      </DialogHeader>

                      {selectedUser && (
                        <div className="space-y-4 w-full">
                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                              Front Image
                            </h4>
                            <Image
                              src={selectedUser.frontImage}
                              alt="Front"
                              width={400}
                              height={200}
                              className="rounded-lg w-full object-contain border"
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                              Back Image
                            </h4>
                            <Image
                              src={selectedUser.backImage}
                              alt="Back"
                              width={400}
                              height={200}
                              className="rounded-lg w-full object-contain border"
                            />
                          </div>
                        </div>
                      )}

                      <DialogFooter className="flex gap-3 mt-4">
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(selectedUser?.id!)}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => handleApprove(selectedUser?.id!)}
                        >
                          Approve
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminKycTable;
