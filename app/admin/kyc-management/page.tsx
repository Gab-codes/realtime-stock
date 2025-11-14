import AdminKycTable from "@/components/admin/kyc/KycTable";

const KycManagement = () => {
  return (
    <div className="rounded-2xl border bg-muted shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">KYC Verification</h2>
          <p className="text-sm text-muted-foreground">
            Review and manage user KYC submissions
          </p>
        </div>
      </div>
      <AdminKycTable />
    </div>
  );
};

export default KycManagement;
