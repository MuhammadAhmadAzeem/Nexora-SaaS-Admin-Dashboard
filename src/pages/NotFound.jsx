import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found. Return to the Nexora home page or dashboard."
      />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 w-full max-w-2xl text-center">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Nexora home"
            className="mx-auto flex w-fit items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
              N
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Nexora
            </span>
          </Link>

          {/* 404 */}
          <div className="mt-12">
            <div
              className="flex items-center justify-center gap-2"
              aria-label="404"
            >
              <span
                aria-hidden="true"
                className="text-7xl font-black tracking-tighter text-slate-200 dark:text-slate-800 sm:text-9xl"
              >
                4
              </span>

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20 sm:h-28 sm:w-28">
                <Compass
                  size={48}
                  strokeWidth={1.6}
                  className="sm:h-16 sm:w-16"
                  aria-hidden="true"
                />
              </div>

              <span
                aria-hidden="true"
                className="text-7xl font-black tracking-tighter text-slate-200 dark:text-slate-800 sm:text-9xl"
              >
                4
              </span>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Page Not Found
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Looks like you&apos;re off track.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist or may
              have been moved. Let&apos;s get you back to somewhere useful.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-200 hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
            >
              <Home size={16} aria-hidden="true" />

              Back to Home

              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <LayoutDashboard size={16} aria-hidden="true" />
              Go to Dashboard
            </Link>
          </div>

          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition duration-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:hover:text-slate-200"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Go back to previous page
          </button>

          {/* Footer */}
          <p className="mt-12 text-xs text-slate-400">
            © 2026 Nexora. All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
}