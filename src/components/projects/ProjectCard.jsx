import {
  CalendarDays,
  Edit3,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

const statusStyles = {
  "In Progress":
    "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

  Planning:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",

  Completed:
    "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",

  "On Hold":
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};

const priorityStyles = {
  High: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Medium:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Low: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  if (!project) return null;

  const progress = Math.min(
    Math.max(Number(project.progress) || 0, 0),
    100
  );

  const statusClass =
    statusStyles[project.status] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  const priorityClass =
    priorityStyles[project.priority] ||
    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400";

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}
            >
              {project.status}
            </span>

            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityClass}`}
            >
              {project.priority}
            </span>
          </div>

          <h3 className="mt-4 truncate text-base font-bold text-slate-900 dark:text-white">
            {project.name}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(project)}
            aria-label={`Edit ${project.name}`}
            title="Edit project"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-blue-50
              hover:text-blue-600
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-blue-500/20
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-400
            "
          >
            <Edit3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(project)}
            aria-label={`Delete ${project.name}`}
            title="Delete project"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-red-50
              hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-red-500/20
              dark:hover:bg-red-500/10
              dark:hover:text-red-400
            "
          >
            <Trash2 size={16} />
          </button>

          <button
            type="button"
            aria-label={`More actions for ${project.name}`}
            title="More actions"
            className="
              hidden
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-blue-500/20
              sm:flex
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
        {project.description || "No project description available."}
      </p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Progress
          </span>

          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {progress}%
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${project.name} progress`}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-2 text-slate-400">
            <CalendarDays size={15} />

            <span className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              Due {project.dueDate || "Not set"}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            #{project.id}
          </span>
        </div>
      </div>
    </article>
  );
}