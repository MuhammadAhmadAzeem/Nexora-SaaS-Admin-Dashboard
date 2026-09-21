import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using Nexora, you agree to follow these Terms of Service. If you do not agree with these terms, you should not use the service.",
      "These terms apply to the Nexora application, website and related services provided through the platform.",
    ],
  },
  {
    title: "2. Using Nexora",
    content: [
      "Nexora is designed to provide workspace and business management functionality, including project management, task tracking, user management and analytics.",
      "You agree to use the service only for lawful purposes and in a way that does not interfere with the operation or security of the platform.",
    ],
  },
  {
    title: "3. Account Responsibilities",
    content: [
      "You are responsible for providing accurate account information and keeping your login credentials confidential.",
      "You are also responsible for activity performed through your account. If you believe your account has been accessed without authorization, you should contact the Nexora team as soon as possible.",
    ],
  },
  {
    title: "4. Workspace Content",
    content: [
      "You remain responsible for the information, files, tasks, projects and other content that you add to your workspace.",
      "You should ensure that content uploaded or entered into Nexora does not violate applicable laws or the rights of other people or organizations.",
    ],
  },
  {
    title: "5. Prohibited Activities",
    content: [
      "You must not use Nexora to conduct unlawful activities, attempt to gain unauthorized access, interfere with platform security or intentionally disrupt the service.",
      "You must not use the platform to distribute malicious software, abuse system resources or attempt to access another user's account without authorization.",
    ],
  },
  {
    title: "6. Service Availability",
    content: [
      "Nexora may be updated, modified, temporarily unavailable or discontinued as the product evolves.",
      "Reasonable efforts may be made to maintain availability, but uninterrupted access cannot be guaranteed.",
    ],
  },
  {
    title: "7. Intellectual Property",
    content: [
      "The Nexora name, interface, visual design, software and related materials may be protected by applicable intellectual property laws.",
      "Except where permission is provided, you should not copy, modify, distribute or commercially exploit Nexora's proprietary materials.",
    ],
  },
  {
    title: "8. Account Termination",
    content: [
      "An account may be suspended or terminated when there is a violation of these terms, misuse of the platform or another legitimate operational or security reason.",
      "Where appropriate, users may also choose to stop using the service or request account changes through the available support channels.",
    ],
  },
  {
    title: "9. Changes to These Terms",
    content: [
      "These terms may be updated as Nexora, its features or applicable requirements change.",
      "The latest version published on this page will apply to continued use of the service after the effective date of the update.",
    ],
  },
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the Nexora Terms of Service to understand the general rules and responsibilities associated with using the platform."
      />

      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              aria-label="Nexora home"
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-md shadow-blue-500/20">
                N
              </div>

              <span className="font-bold tracking-tight">
                Nexora
              </span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <ArrowLeft size={16} />

              <span className="hidden sm:inline">
                Back to Home
              </span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Intro */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <FileText size={14} />
              Legal Information
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
              These terms describe the general rules and responsibilities
              associated with using the Nexora platform.
            </p>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Effective date: September 20, 2026
            </p>
          </div>

          {/* Quick Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <TermsCard
              icon={CheckCircle2}
              title="Use Responsibly"
              text="Use Nexora lawfully and respect the platform and other users."
            />

            <TermsCard
              icon={ShieldCheck}
              title="Protect Access"
              text="Keep your account credentials secure and confidential."
            />

            <TermsCard
              icon={FileText}
              title="Stay Informed"
              text="Review this page when the terms are updated."
            />
          </div>

          {/* Terms */}
          <article className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-500 dark:text-slate-400"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Disclaimer */}
              <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/5">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-700 dark:text-amber-400">
                    This page provides general product terms for the
                    Nexora portfolio application. Before using it as
                    the legal terms for a real commercial service,
                    it should be reviewed and adapted by an appropriate
                    legal professional.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Questions about these terms?
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Contact the Nexora team if you need clarification.
                    </p>
                  </div>

                  <a
                    href="mailto:hello@nexora.example"
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    <Mail size={15} />
                    Contact
                  </a>
                </div>
              </section>
            </div>
          </article>

          {/* Bottom Navigation */}
          <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/"
              className="font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              ← Back to Nexora
            </Link>

            <Link
              to="/privacy"
              className="font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Read Privacy Policy →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-5 py-7 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
            © 2026 Nexora. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}

function TermsCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <Icon size={18} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}