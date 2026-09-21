import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:
    "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-600",

  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",

  outline:
    "border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20",

  danger:
    "bg-red-600 text-white shadow-sm shadow-red-500/20 hover:bg-red-700",

  success:
    "bg-green-600 text-white shadow-sm shadow-green-500/20 hover:bg-green-700",

  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
};

const sizeStyles = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-semibold
        outline-none
        transition-all
        duration-200
        focus-visible:ring-4
        focus-visible:ring-blue-500/20
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && (
        <Loader2
          size={16}
          strokeWidth={2.5}
          className="animate-spin"
        />
      )}

      <span>{children}</span>
    </button>
  );
}