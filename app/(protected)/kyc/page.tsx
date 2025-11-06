import KycForm from "@/components/protected/kyc/KycForm";

export default function KycPage() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-md w-full">
        <KycForm />
      </div>
    </div>
  );
}
