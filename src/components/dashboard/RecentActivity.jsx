import {
  CheckCircle2,
  CreditCard,
  FolderPlus,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New user registered",
    description: "Ali Khan created a new account.",
    time: "10 minutes ago",
    icon: UserPlus,
    iconClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Project created",
    description: "Nexora Website project was created.",
    time: "35 minutes ago",
    icon: FolderPlus,
    iconClass:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
  },
  {
    id: 3,
    title: "Payment received",
    description: "Payment of $480 was received.",
    time: "1 hour ago",
    icon: CreditCard,
    iconClass:
      "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  },
  {
    id: 4,
    title: "Task completed",
    description: "Dashboard optimization task was completed.",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Latest activity across your workspace
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="group flex gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6 dark:hover:bg-slate-800/40"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${activity.iconClass}`}
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {activity.title}
                  </h3>

                  <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}