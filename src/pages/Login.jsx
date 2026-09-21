import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SEO from "../components/common/SEO";

const DEMO_EMAIL = "admin@nexora.com";
const DEMO_PASSWORD = "password123";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath =
    location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      if (
        email !== DEMO_EMAIL ||
        password !== DEMO_PASSWORD
      ) {
        setError(
          "Invalid email or password. Use the demo credentials below."
        );
        return;
      }

      localStorage.setItem(
        "nexoraAuth",
        JSON.stringify({
          isAuthenticated: true,
          email,
          role: "Administrator",
          loginAt: new Date().toISOString(),
        })
      );

      navigate(redirectPath, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your Nexora workspace and manage projects, users, tasks, orders and business analytics."
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Left Branding */}
          <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
            <div className="absolute inset-0 bg-linear-to-br from-blue-700 via-blue-900 to-slate-950" />

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
              <Link
                to="/"
                className="flex w-fit items-center gap-3"
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
                  <ShieldCheck size={14} />
                  Secure workspace
                </span>

                <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                  Manage your entire workspace from one place.
                </h1>

                <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/80">
                  Monitor projects, manage users, track tasks and understand
                  your business performance with Nexora.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <Feature value="48+" label="Projects" />
                  <Feature value="2.5K" label="Users" />
                  <Feature value="99.9%" label="Uptime" />
                </div>
              </div>

              <p className="text-xs text-blue-200/60">
                © 2026 Nexora. All rights reserved.
              </p>
            </div>
          </section>

          {/* Login */}
          <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <Link
                to="/"
                className="mx-auto flex w-fit items-center gap-3 lg:hidden"
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
                    Welcome back
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Sign in to Nexora
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Enter your account details to access your dashboard.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                  noValidate
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() =>
                          setError(
                            "Password reset will be connected to the backend."
                          )
                        }
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="login-password"
                        name="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600"
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
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500 dark:border-slate-600"
                    />

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Remember me
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Signing in..."
                      : "Sign In"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                    Demo Account
                  </p>

                  <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <p>
                      Email:{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        admin@nexora.com
                      </span>
                    </p>

                    <p>
                      Password:{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        password123
                      </span>
                    </p>
                  </div>
                </div>

                {/* Signup */}
                <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Create an account
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

function Feature({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <p className="text-lg font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-blue-200/70">
        {label}
      </p>
    </div>
  );
}