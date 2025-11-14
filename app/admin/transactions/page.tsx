import TransactionsTable from "@/components/admin/transactions/TransactionsTable";

const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Transactions Management
        </h1>
        <p className="text-gray-400">Review and manage all user transactions</p>
      </div>
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
