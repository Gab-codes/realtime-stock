"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  frontImageUrl: string;
  backImageUrl: string;
}

const KYCModal = ({
  isOpen,
  onClose,
  userName,
  frontImageUrl,
  backImageUrl,
}: KYCModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("KYC approved for:", userName);
    setIsProcessing(false);
    onClose();
  };

  const handleReject = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("KYC rejected for:", userName);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[86vh] mx-3 overflow-y-auto bg-gray-800 border-gray-600 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            KYC Verification - {userName}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Review the submitted ID documents and approve or reject the KYC
            request.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Front ID */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">ID Front</h4>
            <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center">
              <img
                src={frontImageUrl}
                alt="ID Front"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Back ID */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-300">ID Back</h4>
            <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center">
              <img
                src={backImageUrl}
                alt="ID Back"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">
            Verification Details
          </h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Document Type: ID Card / Passport</li>
            <li>• Submitted: 2 days ago</li>
            <li>• Document Quality: Clear and legible</li>
          </ul>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Reject"}
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KYCModal;
