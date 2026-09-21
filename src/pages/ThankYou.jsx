import {
  ArrowRight,
  CheckCircle2,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

export default function ThankYou() {
  return (
    <>
      <SEO
        title="Account Created"
        description="Your Nexora account has been created successfully. Access your workspace and start managing your projects, users, tasks and business activity."
      />

      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12 dark:bg-slate-950 sm:px-8">
        <div className="w-full max-w-lg text-center">
          {/* Logo */}
          <Link
            to="/"
            className="mx-auto flex w-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
              N
            </div>

            <div className="text-left">
              <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Nexora
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                SaaS Platform
              </p>
            </div>
          </Link>

          {/* Success Card */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
              <CheckCircle2
                size={34}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>

            <p className="mt-6 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Account created successfully
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to Nexora
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Your workspace is ready. Start managing projects, users,
              tasks and business activity from your Nexora dashboard.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
              >
                <LayoutDashboard size={17} />
                Go to Dashboard
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Home size={17} />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-7 flex justify-center gap-5 text-xs text-slate-400">
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
      </main>
    </>
  );
}