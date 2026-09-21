import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import tasksData from "../data/tasks";

const columns = [
  {
    title: "To Do",
    description: "Tasks waiting to be started.",
  },
  {
    title: "In Progress",
    description: "Tasks currently being worked on.",
  },
  {
    title: "Review",
    description: "Tasks waiting for review.",
  },
  {
    title: "Completed",
    description: "Finished tasks.",
  },
];

const priorityStyles = {
  High: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Medium:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Low: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const initialForm = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  assignee: "",
  dueDate: "",
};

export default function Tasks() {
  const [tasks, setTasks] = useState(tasksData);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query);

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priorityFilter]);

  const moveTask = (taskId, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setFormError("");
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setFormError("Task title is required.");
      return;
    }

    if (!form.description.trim()) {
      setFormError("Task description is required.");
      return;
    }

    if (!form.assignee.trim()) {
      setFormError("Assignee is required.");
      return;
    }

    if (!form.dueDate) {
      setFormError("Due date is required.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      assignee: form.assignee.trim(),
      dueDate: form.dueDate,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    setForm(initialForm);
    setFormError("");
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(initialForm);
    setFormError("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Tasks
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Organize work, track progress and manage your team&apos;s tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-linear-to-r
              from-blue-600
              to-cyan-500
              px-5
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-blue-500/20
              transition
              hover:from-blue-700
              hover:to-cyan-600
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-blue-500/20
            "
          >
            <Plus size={17} />
            Add Task
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
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
              aria-label="Clear task search"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
          aria-label="Filter tasks by priority"
          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-3
            text-sm
            font-medium
            text-slate-700
            outline-none
            focus:border-blue-400
            focus:ring-4
            focus:ring-blue-500/10
            sm:w-44
            dark:border-slate-700
            dark:bg-slate-950
            dark:text-slate-200
          "
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </section>

      {/* Kanban */}
      <section className="overflow-x-auto pb-3">
        <div className="grid min-w-[1100px] grid-cols-4 gap-5">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.title
            );

            return (
              <div
                key={column.title}
                className="flex min-h-[520px] flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="mb-3 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      {column.title}
                    </h2>

                    <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                      {columnTasks.length}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {column.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onMove={moveTask}
                      onDelete={deleteTask}
                    />
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center dark:border-slate-700">
                      <ClipboardList
                        size={22}
                        className="mx-auto text-slate-300 dark:text-slate-600"
                      />

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        No tasks here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-task-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div>
                <h2
                  id="create-task-title"
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  Create Task
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Add a new task to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close create task modal"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateTask}
              className="space-y-5 p-5 sm:p-6"
            >
              {formError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                >
                  {formError}
                </div>
              )}

              <div>
                <label
                  htmlFor="task-title"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Task Title
                </label>

                <input
                  id="task-title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Build dashboard UI"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Describe the task..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormSelect
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  options={columns.map((column) => column.title)}
                />

                <FormSelect
                  label="Priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleFormChange}
                  options={["High", "Medium", "Low"]}
                />

                <div>
                  <label
                    htmlFor="task-assignee"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Assignee
                  </label>

                  <input
                    id="task-assignee"
                    name="assignee"
                    value={form.assignee}
                    onChange={handleFormChange}
                    placeholder="e.g. Ali Khan"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="task-due-date"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Due Date
                  </label>

                  <input
                    id="task-due-date"
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600"
                >
                  <Plus size={17} />
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, onMove, onDelete }) {
  const currentIndex = columns.findIndex(
    (column) => column.title === task.status
  );

  const nextStatus =
    currentIndex < columns.length - 1
      ? columns[currentIndex + 1].title
      : null;

  const previousStatus =
    currentIndex > 0
      ? columns[currentIndex - 1].title
      : null;

  const initials = task.assignee
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 text-sm font-bold leading-5 text-slate-900 dark:text-white">
          {task.title}
        </h3>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays size={13} />
          {task.dueDate}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-cyan-500 text-[10px] font-bold text-white">
          {initials}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <UserRound size={13} />
          <span className="truncate">{task.assignee}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {previousStatus && (
          <button
            type="button"
            onClick={() => onMove(task.id, previousStatus)}
            className="flex-1 rounded-lg border border-slate-200 px-2 py-2 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            ← Previous
          </button>
        )}

        {nextStatus && (
          <button
            type="button"
            onClick={() => onMove(task.id, nextStatus)}
            className="flex-1 rounded-lg bg-blue-50 px-2 py-2 text-[11px] font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
          >
            Next →
          </button>
        )}
      </div>
    </article>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={`task-${name}`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={`task-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}