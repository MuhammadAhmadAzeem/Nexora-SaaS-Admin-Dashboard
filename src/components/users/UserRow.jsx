import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";

export default function UserRow({
  user,
  onEdit,
  onDelete,
}) {
  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isActive = user.status === "Active";

  return (
    <tr className="group transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {user.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`
            inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold
            ${
              isActive
                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            }
          `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-green-500" : "bg-slate-400"
            }`}
          />

          {user.status}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {user.joinedAt}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(user)}
            aria-label={`Edit ${user.name}`}
            title="Edit user"
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-slate-400 transition
              hover:bg-blue-50 hover:text-blue-600
              focus-visible:outline-none
              focus-visible:ring-4 focus-visible:ring-blue-500/20
              dark:hover:bg-blue-500/10 dark:hover:text-blue-400
            "
          >
            <Edit3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(user)}
            aria-label={`Delete ${user.name}`}
            title="Delete user"
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-slate-400 transition
              hover:bg-red-50 hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-4 focus-visible:ring-red-500/20
              dark:hover:bg-red-500/10 dark:hover:text-red-400
            "
          >
            <Trash2 size={16} />
          </button>

          <button
            type="button"
            aria-label={`More actions for ${user.name}`}
            title="More actions"
            className="
              hidden h-9 w-9 items-center justify-center rounded-lg
              text-slate-400 transition sm:flex
              hover:bg-slate-100 hover:text-slate-700
              focus-visible:outline-none
              focus-visible:ring-4 focus-visible:ring-blue-500/20
              dark:hover:bg-slate-800 dark:hover:text-slate-200
            "
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}