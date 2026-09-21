import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you create or use a Nexora account, the application may collect information such as your name, email address, account preferences and workspace data.",
      "The application may also collect technical information such as browser type, device information and usage activity when these features are enabled.",
    ],
  },
  {
    title: "2. How We Use Information",
    content: [
      "Information may be used to provide and improve Nexora services, maintain your account, personalize your workspace and support application functionality.",
      "Usage information may also be used to understand how features are used and to improve the overall product experience.",
    ],
  },
  {
    title: "3. Account Information",
    content: [
      "You are responsible for keeping your account credentials secure and for the activity performed through your account.",
      "You can review and update available profile and account settings from the Nexora settings area.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "Nexora is designed with security in mind. Appropriate technical and organizational measures should be used to protect account and workspace information against unauthorized access or misuse.",
      "No online service can guarantee absolute security, so users should also use strong passwords and protect their login credentials.",
    ],
  },
  {
    title: "5. Cookies and Local Storage",
    content: [
      "Nexora may use browser storage technologies to remember preferences and maintain application state. For example, appearance preferences can be stored locally on your device.",
      "If analytics or other third-party services are added in the future, their respective privacy practices should also be reviewed.",
    ],
  },
  {
    title: "6. Third-Party Services",
    content: [
      "Some Nexora functionality may rely on third-party services. When such services are used, information shared with them should be limited to what is necessary for the relevant functionality.",
      "Third-party services may have their own terms and privacy policies.",
    ],
  },
  {
    title: "7. Your Choices",
    content: [
      "Depending on the functionality available in your account, you may be able to update your profile information, change preferences or request changes to your account data.",
      "For questions about your information or account, contact the Nexora support team.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      "This privacy policy may be updated when Nexora functionality, data practices or legal requirements change.",
      "When changes are made, the updated version should be published on this page together with an updated effective date.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the Nexora Privacy Policy to learn how account, workspace and usage information may be handled."
      />

      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="Nexora home"
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
              <ShieldCheck size={14} />
              Privacy & Data
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
              This page explains, at a high level, how information
              may be handled when using the Nexora application.
            </p>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Effective date: September 20, 2026
            </p>
          </div>

          {/* Quick Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <PrivacyCard
              icon={LockKeyhole}
              title="Account Data"
              text="Used to provide account and workspace functionality."
            />

            <PrivacyCard
              icon={ShieldCheck}
              title="Security"
              text="Security practices are designed to protect account information."
            />

            <PrivacyCard
              icon={CheckCircle2}
              title="Your Choices"
              text="Review available account and preference controls."
            />
          </div>

          {/* Policy */}
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

              {/* Contact */}
              <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Privacy questions?
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Contact the Nexora team for questions about this
                      policy or your account information.
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
              to="/terms"
              className="font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Read Terms of Service →
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

function PrivacyCard({ icon: Icon, title, text }) {
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