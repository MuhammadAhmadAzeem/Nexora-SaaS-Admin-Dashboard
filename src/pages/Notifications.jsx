import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  CircleDollarSign,
  Clock3,
  FolderKanban,
  MoreVertical,
  UserPlus,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "user",
    title: "New user registered",
    description: "Ali Khan created a new account.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    description: "A payment of $480 has been received.",
    time: "35 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "project",
    title: "Project updated",
    description: "Nexora Website project progress was updated.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "task",
    title: "Task deadline approaching",
    description: "Build sidebar navigation is due tomorrow.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 5,
    type: "user",
    title: "New user registered",
    description: "Sara Malik created a new account.",
    time: "4 hours ago",
    read: true,
  },
  {
    id: 6,
    type: "payment",
    title: "Payment completed",
    description: "Order #ORD-005 payment was completed.",
    time: "Yesterday",
    read: true,
  },
];

const notificationConfig = {
  user: {
    icon: UserPlus,
    iconClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  payment: {
    icon: CircleDollarSign,
    iconClass:
      "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  },
  project: {
    icon: FolderKanban,
    iconClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  task: {
    icon: Clock3,
    iconClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && !notification.read);

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Updates
            </p>

            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Stay updated with activity across your workspace.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-200
                  dark:hover:bg-slate-800
                "
              >
                <CheckCheck size={16} />
                Mark all read
              </button>
            )}

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  px-3.5
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                  dark:text-red-400
                  dark:hover:bg-red-500/10
                "
              >
                <X size={16} />
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="relative w-full sm:max-w-sm">
          <Bell
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notifications..."
            aria-label="Search notifications"
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-10
              pr-10
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-400
              focus:bg-white
              focus:ring-4
              focus:ring-blue-500/10
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-white
              dark:focus:bg-slate-950
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear notification search"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`
              rounded-lg px-4 py-2 text-sm font-semibold transition
              ${
                filter === "all"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }
            `}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`
              rounded-lg px-4 py-2 text-sm font-semibold transition
              ${
                filter === "unread"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }
            `}
          >
            Unread
          </button>
        </div>
      </section>

      {/* Notification List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredNotifications.map((notification) => {
              const config =
                notificationConfig[notification.type] ||
                notificationConfig.user;

              const Icon = config.icon;

              return (
                <article
                  key={notification.id}
                  className={`
                    group flex gap-4 p-5 transition sm:p-6
                    ${
                      notification.read
                        ? "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        : "bg-blue-50/40 hover:bg-blue-50/70 dark:bg-blue-500/[0.03] dark:hover:bg-blue-500/[0.06]"
                    }
                  `}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-blue-600"
                            aria-label="Unread"
                          />
                        )}

                        <h2
                          className={`text-sm ${
                            notification.read
                              ? "font-semibold"
                              : "font-bold"
                          } text-slate-900 dark:text-white`}
                        >
                          {notification.title}
                        </h2>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {notification.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/10"
                        >
                          <Check size={14} />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 opacity-100 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <X size={14} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Notification actions"
                    title="Notification actions"
                    className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:flex dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <MoreVertical size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <Bell size={25} />
            </div>

            <h2 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
              No notifications found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              {filter === "unread"
                ? "You have no unread notifications."
                : "There are no notifications matching your search."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}