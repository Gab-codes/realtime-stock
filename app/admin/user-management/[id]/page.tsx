"use client";

import { useState } from "react";
import UserDetailsHeader from "@/components/admin/user-management/UserDetailsHeader";
import KYCSection from "@/components/admin/user-management/KYCSection";
import TransactionsTable from "@/components/admin/user-management/TransactionsTable";

// Mock user data
const mockUserData = {
  id: "u1",
  name: "Gab Admin",
  email: "gab@example.com",
  role: "User",
  joinedDate: "December 1, 2024",
  kycStatus: "pending" as const,
  totalDeposits: 25000,
  totalWithdraws: 5000,
  activeInvestments: 3,
  kycData: {
    status: "pending" as const,
    frontImage:
      "https://images.unsplash.com/photo-1606216174052-933919ba7c5f?w=500&h=500&fit=crop",
    backImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",
    submittedDate: "November 8, 2025",
  },
};

const UserDetailsPage = () => {
  const [user] = useState(mockUserData);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header Section */}
        <UserDetailsHeader user={user} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: KYC Section (Spans 1 column on desktop) */}
          <div className="lg:col-span-1">
            <KYCSection kycData={user.kycData} userName={user.name} />
          </div>

          {/* Right: Transactions (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2">
            <TransactionsTable userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
