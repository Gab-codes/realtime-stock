const DashboardLoading = () => {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-white/15 rounded animate-pulse" />
      <div className="bg-white/15 border border-white/10 rounded-lg p-6 h-36 animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-28 bg-white/15 rounded-lg animate-pulse" />
        <div className="h-28 bg-white/15 rounded-lg animate-pulse" />
      </div>
      <div className="h-48 bg-white/15 rounded-lg animate-pulse" />
    </div>
  );
};

export default DashboardLoading;
