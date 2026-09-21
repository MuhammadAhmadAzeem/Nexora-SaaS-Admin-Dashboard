import {
  BarChart3,
  ClipboardList,
  FolderKanban,
  Users,
} from "lucide-react";

import RecentActivity from "../components/dashboard/RecentActivity";
import RecentOrders from "../components/dashboard/RecentOrders";
import RevenueChart from "../components/dashboard/RevenueChart";
import StatCard from "../components/dashboard/StatCard";

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Projects",
    value: "48",
    change: "+8.2%",
    icon: FolderKanban,
    trend: "up",
  },
  {
    title: "Total Tasks",
    value: "1,284",
    change: "+5.4%",
    icon: ClipboardList,
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$24.8K",
    change: "-2.1%",
    icon: BarChart3,
    trend: "down",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Overview
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Welcome back, Ahmad
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Here&apos;s what&apos;s happening across your workspace today.
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Today
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              September 20, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        aria-label="Dashboard statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </section>

      {/* Revenue */}
      <section>
        <RevenueChart />
      </section>

      {/* Activity + Orders */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentActivity />
        <RecentOrders />
      </section>
    </div>
  );
}