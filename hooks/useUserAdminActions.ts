import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/auth-client";
import { byPassKycApproval } from "@/lib/actions/adminKyc.action";

export const useUserAdminActions = () => {
  const banUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return authClient.admin.banUser({
        userId,
        banReason: "Banned by admin",
        banExpiresIn: 60 * 60 * 24 * 7,
      });
    },
    onMutate: () => {
      const toastId = toast.loading("Banning user...");
      return { toastId };
    },
    onSuccess: (_data, _userId, context) => {
      toast.success("User banned successfully!", { id: context?.toastId });
    },
    onError: (error, _vars, context) => {
      toast.error(error?.message || "Failed to ban user", {
        id: context?.toastId,
      });
    },
  });

  const unbanUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return authClient.admin.unbanUser({ userId });
    },
    onMutate: () => {
      const toastId = toast.loading("Removing ban...");
      return { toastId };
    },
    onSuccess: (_data, _userId, context) => {
      toast.success("User unbanned successfully!", { id: context?.toastId });
    },
    onError: (error, _vars, context) => {
      toast.error(error?.message || "Failed to unban user", {
        id: context?.toastId,
      });
    },
  });

  const kycApprovalMutation = useMutation({
    mutationFn: async (id: string) => {
      return byPassKycApproval(id);
    },
    onMutate: () => {
      const toastId = toast.loading("Approving KYC...");
      return { toastId };
    },
    onSuccess: (_data, _id, context) => {
      toast.success("KYC approved successfully!", { id: context?.toastId });
    },
    onError: (error, _vars, context) => {
      toast.error(error?.message || "Failed to approve KYC", {
        id: context?.toastId,
      });
    },
  });

  return {
    banUserMutation,
    unbanUserMutation,
    kycApprovalMutation,
  };
};
