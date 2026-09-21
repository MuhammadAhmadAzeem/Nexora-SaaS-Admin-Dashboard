import { ArrowUpRight, ShoppingCart } from "lucide-react";

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Ali Khan",
    amount: "$250.00",
    status: "Completed",
    date: "Sep 20, 2026",
  },
  {
    id: "#ORD-002",
    customer: "Ahmed Raza",
    amount: "$480.00",
    status: "Pending",
    date: "Sep 19, 2026",
  },
  {
    id: "#ORD-003",
    customer: "Sara Malik",
    amount: "$320.00",
    status: "Completed",
    date: "Sep 18, 2026",
  },
  {
    id: "#ORD-004",
    customer: "Usman Ali",
    amount: "$150.00",
    status: "Cancelled",
    date: "Sep 17, 2026",
  },
  {
    id: "#ORD-005",
    customer: "Ayesha Noor",
    amount: "$720.00",
    status: "Completed",
    date: "Sep 16, 2026",
  },
];

const statusStyles = {
  Completed:
    "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  Pending:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ShoppingCart size={18} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Latest customer transactions.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 self-start text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:self-auto dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all
          <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Order
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Customer
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="group transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {order.id}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                      {order.customer
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {order.customer}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {order.amount}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {order.date}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 px-5 py-3.5 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Showing the latest {recentOrders.length} orders
        </p>
      </div>
    </div>
  );
}