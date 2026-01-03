import { Mail } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
            <Mail className="text-yellow-500" size={26} />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Verify your email
          </h1>
        </div>

        <p className="text-gray-300 leading-relaxed mb-6">
          We’ve sent a verification link to your email. Please check your inbox
          and spam folder to complete your registration.
        </p>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <p className="text-sm text-gray-400">
            Didn’t receive the email? It may take a minute to arrive, and make
            sure to check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
