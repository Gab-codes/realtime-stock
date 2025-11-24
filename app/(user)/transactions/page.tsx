import TransactionHistory from "@/components/user/transactions/History";
import { getUserTransactions } from "@/lib/actions/transactions.action";

const TransactionHistoryPage = async () => {
  const { data } = await getUserTransactions();

  return <TransactionHistory transactions={data || []} />;
};

export default TransactionHistoryPage;
