"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, CheckCircle } from "lucide-react";
import KYCModal from "./KYCModal";

interface KYCSection {
  status: "pending" | "verified" | "rejected";
  frontImage: string;
  backImage: string;
  submittedDate: string;
}

interface KYCSectionComponentProps {
  kycData: KYCSection;
  userName: string;
}

const KYCSection = ({ kycData, userName }: KYCSectionComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          color: "text-green-600 bg-green-500/10 border-green-500/20",
          label: "Verified",
          description: "KYC documents have been verified and approved.",
        };
      case "rejected":
        return {
          icon: ShieldAlert,
          color: "text-red-600 bg-red-500/10 border-red-500/20",
          label: "Rejected",
          description: "KYC documents were rejected. User needs to resubmit.",
        };
      case "pending":
      default:
        return {
          icon: ShieldAlert,
          color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20",
          label: "Pending",
          description: "KYC documents are awaiting review and verification.",
        };
    }
  };

  const statusInfo = getStatusInfo(kycData.status);
  const IconComponent = statusInfo.icon;

  return (
    <>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${statusInfo.color}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                KYC Verification
              </h2>
              <p className="text-sm text-gray-400">{statusInfo.description}</p>
            </div>
          </div>
          <Badge variant="outline" className={`border ${statusInfo.color}`}>
            {statusInfo.label}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
              Submitted Date
            </p>
            <p className="text-white font-medium">{kycData.submittedDate}</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
              Document Type
            </p>
            <p className="text-white font-medium">National ID / Passport</p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Document Preview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 aspect-video flex items-center justify-center">
              <img
                src={kycData.frontImage}
                alt="ID Front"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 aspect-video flex items-center justify-center">
              <img
                src={kycData.backImage}
                alt="ID Back"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        {kycData.status === "pending" && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Review & Verify KYC Documents
          </Button>
        )}
      </div>

      {/* KYC Modal */}
      <KYCModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userName={userName}
        frontImageUrl={kycData.frontImage}
        backImageUrl={kycData.backImage}
      />
    </>
  );
};

export default KYCSection;
