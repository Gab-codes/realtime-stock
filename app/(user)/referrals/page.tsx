import ReferralInvite from "@/components/user/ReferralInvite";
import { getReferralsForCurrentUser } from "@/lib/actions/referral.action";

const ReferralsPage = async () => {
  const { data } = await getReferralsForCurrentUser();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Referrals</h2>
      <p className="text-sm text-gray-300">
        Share your referral link and track referred users here.
      </p>

      <div className="mt-6">
        <ReferralInvite
          referralCode={data?.referralCode}
          referrals={data?.referrals || []}
          baseUrl={process.env.NEXT_PUBLIC_BASE_URL}
        />
      </div>
    </div>
  );
};

export default ReferralsPage;
