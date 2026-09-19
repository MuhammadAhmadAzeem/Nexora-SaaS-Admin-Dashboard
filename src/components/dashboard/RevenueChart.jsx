export default function RevenueChart() {
  const revenueData = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 42 },
    { month: "Apr", value: 65 },
    { month: "May", value: 55 },
    { month: "Jun", value: 78 },
    { month: "Jul", value: 70 },
    { month: "Aug", value: 90 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Revenue Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Monthly revenue performance
          </p>
        </div>

        <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none">
          <option>Last 8 Months</option>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-4 h-64 border-b border-slate-200">
        {revenueData.map((item) => (
          <div
            key={item.month}
            className="flex-1 h-full flex flex-col justify-end items-center gap-2"
          >
            <div
              className="w-full max-w-10 bg-linear-to-t from-indigo-500 to-violet-500 rounded-t-md hover:opacity-80 transition"
              style={{ height: `${item.value * 2.2}px` }}
            ></div>

            <span className="text-xs text-slate-500">
              {item.month}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}