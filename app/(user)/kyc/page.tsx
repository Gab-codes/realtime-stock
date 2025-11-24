import KycForm from "@/components/user/kyc/KycForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUserData } from "@/lib/actions/user.action";

const config: Record<
  string,
  {
    variant: "default" | "destructive";
    title: string;
    message: string;
  }
> = {
  pending: {
    variant: "default",
    title: "KYC Pending",
    message: "Your KYC submission is currently under review.",
  },
  canceled: {
    variant: "destructive",
    title: "KYC Canceled",
    message: "Your previous KYC submission was canceled. Please submit again.",
  },
  verified: {
    variant: "default",
    title: "KYC Verified",
    message:
      "Your identity has already been verified. No further action is required.",
  },
};
export default async function KycPage() {
  const { data } = await getUserData();

  if (!data) return null;

  const { kycStatus } = data as UserExtra;

  const renderAlert = () => {
    if (!kycStatus) return null;

    const statusConfig = config[kycStatus];
    if (!statusConfig) return null;

    return (
      <Alert variant={statusConfig.variant}>
        <AlertTitle>{statusConfig.title}</AlertTitle>
        <AlertDescription>{statusConfig.message}</AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-md w-full space-y-4">
        {/* Status alert */}
        {renderAlert()}

        {/* Show form only if not verified */}
        {kycStatus !== "verified" && <KycForm kycStatus={kycStatus} />}
      </div>
    </div>
  );
}
