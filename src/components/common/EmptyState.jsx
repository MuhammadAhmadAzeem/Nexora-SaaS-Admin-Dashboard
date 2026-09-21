import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display here yet.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <Inbox size={26} strokeWidth={1.8} />
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}