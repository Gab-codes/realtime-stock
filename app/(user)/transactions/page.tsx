import TransactionHistory from "@/components/user/transactions/History";
import Summary from "@/components/user/transactions/summary";
import { getUserTransactions } from "@/lib/actions/transactions.action";

const TransactionHistoryPage = async () => {
  const { data, stats } = await getUserTransactions();
  const {
    totalDeposits = 0,
    totalWithdrawals = 0,
    pendingDeposits = 0,
    pendingWithdrawals = 0,
  } = stats || {};

  return (
    <div className="pt-4 px-1 md:p-4 space-y-6 text-white">
      <Summary
        {...{
          totalDeposits,
          totalWithdrawals,
          pendingDeposits,
          pendingWithdrawals,
        }}
      />
      <TransactionHistory transactions={data || []} />
    </div>
  );
};

export default TransactionHistoryPage;
