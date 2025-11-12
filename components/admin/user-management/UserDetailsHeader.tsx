"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit2, Check, X } from "lucide-react";
import Link from "next/link";

interface UserDetailsHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    joinedDate: string;
    kycStatus: "pending" | "verified" | "rejected";
    totalDeposits: number;
    totalWithdraws: number;
    activeInvestments: number;
  };
}

const UserDetailsHeader = ({ user }: UserDetailsHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSave = () => {
    // API call would go here
    console.log("Saving name:", editedName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setIsEditing(false);
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "pending":
      default:
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 mb-6">
      {/* Navigation */}
      <Link
        href="/admin/user-management"
        className="text-yellow-500 hover:text-yellow-400 text-sm mb-4 inline-block"
      >
        ← Back to Users
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left: User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="h-8 bg-gray-700 border-gray-500 text-white"
                  />
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-white mb-1">
                  {user.name}
                </h1>
              )}
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-400 border-blue-500/30"
            >
              {user.role}
            </Badge>
            <Badge
              variant="outline"
              className={`border ${getKYCStatusColor(user.kycStatus)}`}
            >
              KYC{" "}
              {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
            </Badge>
          </div>

          {/* Edit Button */}
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSave}
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit Name
            </Button>
          )}
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-2 gap-4 min-w-[300px]">
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Total Deposits
            </p>
            <p className="text-white text-lg font-bold">
              ${user.totalDeposits.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Total Withdraws
            </p>
            <p className="text-white text-lg font-bold">
              ${user.totalWithdraws.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Active Investments
            </p>
            <p className="text-white text-lg font-bold">
              {user.activeInvestments}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Joined Date
            </p>
            <p className="text-white text-sm font-semibold">
              {user.joinedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsHeader;
