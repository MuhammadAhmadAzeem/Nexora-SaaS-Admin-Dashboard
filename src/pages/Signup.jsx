import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import SEO from "../components/common/SEO";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms =
      "You must agree to the Terms and Privacy Policy.";
  }

  return errors;
}

function getPasswordStrength(password) {
  if (!password) {
    return {
      label: "",
      width: "w-0",
    };
  }

  if (password.length < 8) {
    return {
      label: "Weak",
      width: "w-1/4",
    };
  }

  let score = 1;

  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return {
      label: "Fair",
      width: "w-2/4",
    };
  }

  if (score === 3) {
    return {
      label: "Good",
      width: "w-3/4",
    };
  }

  return {
    label: "Strong",
    width: "w-full",
  };
}

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const existingUsers = JSON.parse(
        localStorage.getItem("nexoraUsers") || "[]"
      );

      const emailExists = existingUsers.some(
        (user) =>
          user.email.toLowerCase() ===
          form.email.trim().toLowerCase()
      );

      if (emailExists) {
        setSubmitError(
          "An account with this email already exists."
        );
        return;
      }

      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        role: "User",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "nexoraUsers",
        JSON.stringify([
          ...existingUsers,
          newUser,
        ])
      );

      localStorage.setItem(
        "nexoraAuth",
        JSON.stringify({
          isAuthenticated: true,
          email: newUser.email,
          role: newUser.role,
          loginAt: new Date().toISOString(),
        })
      );

      navigate("/thank-you", { replace: true });
    } catch {
      setSubmitError(
        "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Create Account"
        description="Create your Nexora account and manage projects, users, tasks, orders and business analytics in one modern workspace."
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Branding */}
          <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
            <div className="absolute inset-0 bg-linear-to-br from-blue-700 via-blue-900 to-slate-950" />

            <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
              <Link
                to="/"
                className="flex w-fit items-center gap-3"
                aria-label="Nexora home"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-600 shadow-lg">
                  N
                </div>

                <div>
                  <p className="text-lg font-bold tracking-tight text-white">
                    Nexora
                  </p>

                  <p className="text-xs text-blue-200">
                    SaaS Platform
                  </p>
                </div>
              </Link>

              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
                  <Check size={14} />
                  Start building today
                </span>

                <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Bring your projects and team together.
                </h1>

                <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/80">
                  Create your Nexora workspace and manage users,
                  projects, tasks and business activity from a single
                  dashboard.
                </p>

                <div className="mt-8 space-y-3">
                  <Benefit text="Centralized project management" />
                  <Benefit text="Simple team and user management" />
                  <Benefit text="Business analytics and reporting" />
                </div>
              </div>

              <p className="text-xs text-blue-200/60">
                © 2026 Nexora. All rights reserved.
              </p>
            </div>
          </section>

          {/* Signup Form */}
          <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <Link
                to="/"
                className="mx-auto flex w-fit items-center gap-3 lg:hidden"
                aria-label="Nexora home"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  N
                </div>

                <div>
                  <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    Nexora
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    SaaS Platform
                  </p>
                </div>
              </Link>

              <div className="mt-8 lg:mt-0">
                <div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Get started
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Create your account
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Set up your Nexora account and start managing your
                    workspace.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{submitError}</span>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-7 space-y-5"
                >
                  {/* Name */}
                  <Field
                    id="signup-name"
                    name="name"
                    label="Full Name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ahmad Azeem"
                    icon={User}
                    error={errors.name}
                    autoComplete="name"
                  />

                  {/* Email */}
                  <Field
                    id="signup-email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    icon={Mail}
                    error={errors.email}
                    autoComplete="email"
                  />

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password
                            ? "signup-password-error"
                            : undefined
                        }
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-900 dark:text-white ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700 dark:hover:border-slate-600"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((current) => !current)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {form.password && (
                      <div className="mt-2">
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${passwordStrength.width}`}
                          />
                        </div>

                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                          Password strength:{" "}
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {passwordStrength.label}
                          </span>
                        </p>
                      </div>
                    )}

                    {errors.password && (
                      <ErrorText id="signup-password-error">
                        {errors.password}
                      </ErrorText>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="signup-confirm-password"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        aria-invalid={Boolean(
                          errors.confirmPassword
                        )}
                        aria-describedby={
                          errors.confirmPassword
                            ? "signup-confirm-password-error"
                            : undefined
                        }
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-900 dark:text-white ${
                          errors.confirmPassword
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
                            : "border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700 dark:hover:border-slate-600"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <ErrorText id="signup-confirm-password-error">
                        {errors.confirmPassword}
                      </ErrorText>
                    )}
                  </div>

                  {/* Terms */}
                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={form.agreeToTerms}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600 focus:ring-blue-500 dark:border-slate-600"
                      />

                      <span className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>

                    {errors.agreeToTerms && (
                      <ErrorText>
                        {errors.agreeToTerms}
                      </ErrorText>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating account..."
                      : "Create Account"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    )}
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign in
                  </Link>
                </p>

                <div className="mt-8 flex justify-center gap-5 text-xs text-slate-400">
                  <Link
                    to="/privacy"
                    className="transition hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    Privacy
                  </Link>

                  <Link
                    to="/terms"
                    className="transition hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    Terms
                  </Link>

                  <Link
                    to="/"
                    className="transition hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : undefined
          }
          className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-slate-900 dark:text-white ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
              : "border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-blue-500/10 dark:border-slate-700 dark:hover:border-slate-600"
          }`}
        />
      </div>

      {error && (
        <ErrorText id={`${id}-error`}>
          {error}
        </ErrorText>
      )}
    </div>
  );
}

function ErrorText({ children, id }) {
  return (
    <p
      id={id}
      className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
    >
      {children}
    </p>
  );
}

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-blue-100/80">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-cyan-300">
        <Check size={14} />
      </span>

      {text}
    </div>
  );
}