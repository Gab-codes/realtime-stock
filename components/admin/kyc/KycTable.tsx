"use client";

import {
  Table,
  TableBody,
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
import { Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { getAdminKycSubmissions } from "@/lib/actions/adminKyc.action";
import { toast } from "sonner";

interface KycUser {
  id: string;
  name: string;
  email: string;
  frontImageUrl: string;
  backImageUrl: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  idType: string;
  remarks?: string;
}

const AdminKycTable = () => {
  const [kycUsers, setKycUsers] = useState<KycUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<KycUser | null>(null);

  useEffect(() => {
    const fetchKycSubmissions = async () => {
      try {
        setLoading(true);
        const result = await getAdminKycSubmissions();
        if (result.success) {
          setKycUsers(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to fetch KYC submissions");
        console.error("Error fetching KYC submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKycSubmissions();
  }, []);

  const handleApprove = (id: string) => {
    // Will be handled by performKycAction
    performKycAction(id, "approve");
  };

  const handleReject = (id: string) => {
    // Will be handled by performKycAction
    performKycAction(id, "reject");
  };

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<
    "approve" | "reject" | null
  >(null);

  const performKycAction = async (id: string, action: "approve" | "reject") => {
    if (!id) return;
    try {
      setProcessingId(id);
      setProcessingAction(action);

      const endpoint =
        action === "approve"
          ? "/api/admin/kyc/approve"
          : "/api/admin/kyc/reject";

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, remarks: "" }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        // update local state
        setKycUsers((prev) =>
          prev.map((u) =>
            u.id === id
              ? { ...u, status: action === "approve" ? "approved" : "rejected" }
              : u
          )
        );
        toast.success(
          data.message ||
            `KYC ${action === "approve" ? "approved" : "rejected"} successfully`
        );
      } else {
        toast.error(data?.error || `Failed to ${action} KYC`);
      }
    } catch (err) {
      console.error(`Error performing ${action} on KYC:`, err);
      toast.error(`Failed to ${action} KYC`);
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
      // close dialog
      setSelectedUser(null);
    }
  };

  if (loading) {
    return (
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
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Loading KYC submissions...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
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
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-red-400">
                Error: {error}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

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
            {kycUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No KYC submissions found
                </TableCell>
              </TableRow>
            ) : (
              kycUsers.map((user) => (
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
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
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
                                src={selectedUser.frontImageUrl}
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
                                src={selectedUser.backImageUrl}
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
                            disabled={processingId !== null}
                            className={
                              processingId !== null
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }
                          >
                            {processingId === selectedUser?.id &&
                            processingAction === "reject" ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                                Rejecting...
                              </span>
                            ) : (
                              "Reject"
                            )}
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleApprove(selectedUser?.id!)}
                            disabled={processingId !== null}
                            className={
                              processingId !== null
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }
                          >
                            {processingId === selectedUser?.id &&
                            processingAction === "approve" ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                                Approving...
                              </span>
                            ) : (
                              "Approve"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdminKycTable;
