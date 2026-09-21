import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
}) {
  const isPositive = trend === "up";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105 dark:bg-blue-500/10 dark:text-blue-400">
          {Icon && <Icon size={20} strokeWidth={2} />}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span
          className={`
            inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
            ${
              isPositive
                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
            }
          `}
        >
          {isPositive ? (
            <ArrowUpRight size={13} strokeWidth={2.5} />
          ) : (
            <ArrowDownRight size={13} strokeWidth={2.5} />
          )}

          {change}
        </span>

        <span className="text-xs text-slate-400 dark:text-slate-500">
          vs last month
        </span>
      </div>
    </div>
  );
}