import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  role: "User",
  status: "Active",
};

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.role) {
    errors.role = "Please select a role.";
  }

  if (!form.status) {
    errors.status = "Please select a status.";
  }

  return errors;
}

export default function UserForm({
  user = null,
  onSubmit,
  onCancel,
  loading = false,
  error = "",
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(user);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "User",
        status: user.status || "Active",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [user]);

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
      email: form.email.trim().toLowerCase(),
    };

    try {
      await onSubmit?.(cleanedForm);
    } catch {
      // Parent component can handle/display submit errors.
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="user-name"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Full Name
          </label>

          <input
            id="user-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Ahmad Azeem"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "user-name-error" : undefined}
            className={inputClass("name")}
          />

          {errors.name && (
            <p
              id="user-name-error"
              className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="user-email"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Email Address
          </label>

          <input
            id="user-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. ahmad@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "user-email-error" : undefined}
            className={inputClass("email")}
          />

          {errors.email && (
            <p
              id="user-email-error"
              className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="user-role"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Role
          </label>

          <select
            id="user-role"
            name="role"
            value={form.role}
            onChange={handleChange}
            aria-invalid={Boolean(errors.role)}
            className={inputClass("role")}
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Administrator">Administrator</option>
          </select>

          {errors.role && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.role}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="user-status"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Status
          </label>

          <select
            id="user-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            aria-invalid={Boolean(errors.status)}
            className={inputClass("status")}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {errors.status && (
            <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.status}
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
              ? "Update User"
              : "Create User"}
        </button>
      </div>
    </form>
  );
}