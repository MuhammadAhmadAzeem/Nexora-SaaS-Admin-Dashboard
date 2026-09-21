import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  status: "Planning",
  priority: "Medium",
  progress: 0,
  dueDate: "",
};

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Project name is required.";
  } else if (form.name.trim().length < 3) {
    errors.name = "Project name must be at least 3 characters.";
  }

  if (!form.description.trim()) {
    errors.description = "Project description is required.";
  } else if (form.description.trim().length < 10) {
    errors.description =
      "Description must be at least 10 characters.";
  }

  if (!form.status) {
    errors.status = "Please select a project status.";
  }

  if (!form.priority) {
    errors.priority = "Please select a priority.";
  }

  const progress = Number(form.progress);

  if (Number.isNaN(progress) || progress < 0 || progress > 100) {
    errors.progress = "Progress must be between 0 and 100.";
  }

  if (!form.dueDate) {
    errors.dueDate = "Due date is required.";
  }

  return errors;
}

export default function ProjectForm({
  project = null,
  onSubmit,
  onCancel,
  loading = false,
  error = "",
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(project);

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "Planning",
        priority: project.priority || "Medium",
        progress: project.progress ?? 0,
        dueDate: project.dueDate || "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      progress: Number(form.progress),
    };

    try {
      await onSubmit?.(cleanedForm);
    } catch {
      // Parent component can handle submit errors.
    }
  };

  const inputClass = (fieldName) => `
    h-11
    w-full
    rounded-xl
    border
    bg-white
    px-3.5
    text-sm
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:ring-4
    dark:bg-slate-950
    dark:text-white
    dark:placeholder:text-slate-500
    ${
      errors[fieldName]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
        : "border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-500"
    }
  `;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="project-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Project Name
        </label>

        <input
          id="project-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Nexora Website"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "project-name-error" : undefined}
          className={inputClass("name")}
        />

        {errors.name && (
          <p
            id="project-name-error"
            className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Description
        </label>

        <textarea
          id="project-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what this project is about..."
          rows={4}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description
              ? "project-description-error"
              : undefined
          }
          className={`
            min-h-28
            w-full
            resize-y
            rounded-xl
            border
            bg-white
            px-3.5
            py-3
            text-sm
            leading-6
            text-slate-900
            outline-none
            transition
            placeholder:text-slate-400
            focus:ring-4
            dark:bg-slate-950
            dark:text-white
            dark:placeholder:text-slate-500
            ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
                : "border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-500"
            }
          `}
        />

        {errors.description && (
          <p
            id="project-description-error"
            className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {errors.description}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="project-status"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Status
          </label>

          <select
            id="project-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass("status")}
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>

          {errors.status && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.status}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="project-priority"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Priority
          </label>

          <select
            id="project-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={inputClass("priority")}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {errors.priority && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.priority}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="project-progress"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Progress (%)
          </label>

          <input
            id="project-progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className={inputClass("progress")}
          />

          {errors.progress && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.progress}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="project-due-date"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Due Date
          </label>

          <input
            id="project-due-date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className={inputClass("dueDate")}
          />

          {errors.dueDate && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.dueDate}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            h-11
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            text-sm
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-50
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            dark:hover:bg-slate-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading && (
            <Loader2
              size={16}
              className="animate-spin"
            />
          )}

          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}