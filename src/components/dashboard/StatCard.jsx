export default function StatCard({
  title,
  value,
  change,
  icon,
  positive = true,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className="w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? "↑" : "↓"} {change}
        </span>

        <span className="ml-2 text-sm text-slate-400">
          vs last month
        </span>
      </div>
    </div>
  );
}