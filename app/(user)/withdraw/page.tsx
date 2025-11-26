import WithdrawalForm from "@/components/user/withdrawal/withdrawal-form";
import { getUserData } from "@/lib/actions/user.action";

async function fetchPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=usd",
    { next: { revalidate: 300 } }
  );

  const data = await res.json();
  return {
    BTC: data.bitcoin?.usd ?? 0,
    USDT: data.tether?.usd ?? 1,
  };
}

export default async function WithdrawalPage() {
  const { data: userData } = await getUserData();
  if (!userData) return null;

  const { depositedBalance, kycStatus } = userData as UserExtra;

  const prices = await fetchPrices();

  return (
    <WithdrawalForm
      depositedBalance={depositedBalance}
      kycStatus={kycStatus}
      prices={prices}
    />
  );
}
