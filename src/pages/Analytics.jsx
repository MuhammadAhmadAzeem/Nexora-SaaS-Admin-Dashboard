import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  FolderKanban,
  ShoppingCart,
  Users,
} from "lucide-react";

import RevenueChart from "../components/dashboard/RevenueChart";

const analyticsStats = [
  {
    title: "Total Revenue",
    value: "$952K",
    change: "+12.8%",
    trend: "up",
    icon: BarChart3,
  },
  {
    title: "Total Users",
    value: "2,543",
    change: "+8.4%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Projects",
    value: "48",
    change: "+5.7%",
    trend: "up",
    icon: FolderKanban,
  },
  {
    title: "Orders",
    value: "1,284",
    change: "-2.1%",
    trend: "down",
    icon: ShoppingCart,
  },
];

const performanceData = [
  {
    label: "User Growth",
    value: "78%",
    description: "Compared with last month",
    trend: "+12.5%",
    positive: true,
  },
  {
    label: "Project Completion",
    value: "64%",
    description: "Projects completed on time",
    trend: "+8.2%",
    positive: true,
  },
  {
    label: "Order Conversion",
    value: "42%",
    description: "Visitors converted to orders",
    trend: "-3.4%",
    positive: false,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Insights
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Analytics
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Monitor your business performance and understand what is happening
          across your workspace.
        </p>
      </section>

      {/* Analytics Stats */}
      <section
        aria-label="Analytics statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {analyticsStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <div
              key={stat.title}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                hover:shadow-blue-500/5
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-slate-700
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-5">
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
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}

                  {stat.change}
                </span>

                <span className="ml-2 text-xs text-slate-400">
                  vs last month
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Revenue */}
      <section>
        <RevenueChart />
      </section>

      {/* Performance */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Performance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Key performance indicators across your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
          {performanceData.map((item) => (
            <div key={item.label} className="p-5 sm:p-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>

              <div className="mt-3 flex items-end justify-between gap-3">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </h3>

                <span
                  className={`
                    text-xs font-semibold
                    ${
                      item.positive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  `}
                >
                  {item.trend}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    item.positive
                      ? "bg-linear-to-r from-blue-600 to-cyan-500"
                      : "bg-linear-to-r from-orange-500 to-red-500"
                  }`}
                  style={{ width: item.value }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}