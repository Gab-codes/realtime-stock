// import CancelDialog from "@/components/protected/portfolio/CancelDialog";
import InvestmentMobileList from "@/components/user/portfolio/InvestmentMobileList";
import PortfolioTable from "@/components/user/portfolio/PortfolioTable";
import PortfolioSummary from "@/components/user/portfolio/Summary";
import { getPortfolio } from "@/lib/actions/investment.action";

export default async function PortfolioPage() {
  const { data } = await getPortfolio();
  const {
    investments = [],
    totals = { totalInvested: 0, active: 0, profitEarned: 0 },
  } = data || {};

  return (
    <div className="px-3 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      <PortfolioSummary totals={totals} />

      <div className="bg-[#071022] border border-white/5 rounded-lg">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-lg font-semibold">Active Investments</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your AI-managed investments.
          </p>
        </div>
        <PortfolioTable investments={investments} />
        <InvestmentMobileList investments={investments} />
      </div>

      {/* <CancelDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={confirmCancel}
        target={cancelTarget}
        isLoading={isCanceling}
        format={format}
      /> */}
    </div>
  );
}
