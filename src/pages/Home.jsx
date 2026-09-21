import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Menu,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Organize projects, track progress and keep your team aligned from one workspace",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Manage users, roles and account access with a clean and centralized interface",
  },
  {
    icon: ClipboardList,
    title: "Task Tracking",
    description:
      "Create, assign and monitor tasks across different stages of your workflow",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Understand revenue, growth and workspace activity through useful analytics",
  },
];

const stats = [
  {
    value: "2.5K+",
    label: "Active Users",
  },
  {
    value: "48+",
    label: "Projects",
  },
  {
    value: "99.9%",
    label: "Platform Uptime",
  },
  {
    value: "24/7",
    label: "Workspace Access",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SEO
        title="Modern SaaS Workspace"
        description="Nexora is a modern SaaS workspace for managing projects, users, tasks, orders and business analytics"
      />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Nexora home"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-md shadow-blue-500/20">
              N
            </div>

            <div>
              <p className="text-base font-bold tracking-tight">
                Nexora
              </p>

              <p className="hidden text-[10px] font-medium text-slate-400 sm:block">
                SaaS Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex"
          >
            <a
              href="#features"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-400 dark:hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-400 dark:hover:text-white"
            >
              About
            </a>

            <Link
              to="/contact"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-400 dark:hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-200 hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
            >
              Get Started

              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((current) => !current)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-200 bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              <MobileNavLink
                href="#features"
                label="Features"
                onClick={closeMenu}
              />

              <MobileNavLink
                href="#about"
                label="About"
                onClick={closeMenu}
              />

              <Link
                to="/contact"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Contact
              </Link>
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-200 hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                <Zap size={14} aria-hidden="true" />
                Built for modern teams
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                Everything your team needs,
                <span className="block bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  in one workspace
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
                Nexora helps teams manage projects, users, tasks,
                orders and business analytics through one simple
                SaaS dashboard
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                >
                  Start Free

                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>

                <a
                  href="#features"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Explore Features
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-green-500"
                    aria-hidden="true"
                  />
                  No credit card required
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-blue-500"
                    aria-hidden="true"
                  />
                  Secure workspace
                </span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-linear-to-r from-blue-500/10 to-cyan-500/10 blur-2xl" />

              <div
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900"
                aria-label="Nexora dashboard preview"
              >
                {/* Browser Bar */}
                <div className="flex h-11 items-center gap-1.5 border-b border-slate-200 px-4 dark:border-slate-800">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-red-400"
                  />

                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-yellow-400"
                  />

                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-green-400"
                  />

                  <div className="ml-3 h-6 flex-1 rounded-md bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="flex min-h-[360px]">
                  {/* Preview Sidebar */}
                  <div className="hidden w-32 shrink-0 border-r border-slate-200 p-3 sm:block dark:border-slate-800">
                    <div className="mb-5 flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500" />
                      <div className="h-2.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <PreviewNav active />
                    <PreviewNav />
                    <PreviewNav />
                    <PreviewNav />
                    <PreviewNav />
                  </div>

                  {/* Preview Main */}
                  <div className="min-w-0 flex-1 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-3 w-24 rounded-full bg-slate-800 dark:bg-slate-200" />
                        <div className="mt-2 h-2 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                      </div>

                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-600 to-cyan-500" />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <PreviewStat value="2.5K" />
                      <PreviewStat value="48" />
                      <PreviewStat value="1.2K" />
                      <PreviewStat value="$24K" />
                    </div>

                    {/* Chart */}
                    <div className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="h-2.5 w-20 rounded-full bg-slate-800 dark:bg-slate-200" />
                        <div className="h-5 w-12 rounded-md bg-slate-100 dark:bg-slate-800" />
                      </div>

                      <div className="mt-5 flex h-28 items-end gap-2">
                        {[35, 48, 42, 62, 55, 76, 68, 88, 74, 95].map(
                          (height, index) => (
                            <div
                              key={index}
                              aria-hidden="true"
                              className="flex-1 rounded-t-md bg-linear-to-t from-blue-600 to-cyan-400 opacity-80"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <PreviewList />
                      <PreviewActivity />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-slate-200 px-4 py-4 text-center first:border-0 md:border-l dark:border-slate-800"
              >
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-20 px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Powerful features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Everything in one place
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
                A focused workspace designed to simplify everyday
                business and team operations
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                      <Icon size={20} aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-20 border-y border-slate-200 bg-slate-50 px-5 py-20 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Built for clarity
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Less complexity
                <span className="block">More visibility</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
                Nexora brings the most important parts of your
                workspace together so your team can spend less time
                switching between tools and more time getting work done
              </p>

              <div className="mt-7 space-y-4">
                <AboutPoint text="Centralized workspace for your team" />
                <AboutPoint text="Simple and responsive user experience" />
                <AboutPoint text="Actionable analytics and reporting" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={Zap}
                title="Fast"
                text="Quick access to the information your team needs"
              />

              <InfoCard
                icon={ShieldCheck}
                title="Secure"
                text="Designed with account and workspace security in mind"
              />

              <InfoCard
                icon={BarChart3}
                title="Insightful"
                text="Turn workspace activity into useful business insights"
              />

              <InfoCard
                icon={Users}
                title="Collaborative"
                text="Keep teams, projects and tasks connected"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-12 text-center shadow-2xl shadow-blue-500/20 sm:px-10 lg:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to organize your workspace?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
              Create your Nexora account and bring your projects,
              users and tasks together
            </p>

            <Link
              to="/signup"
              className="group mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-blue-600 shadow-lg transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Get Started

              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Nexora
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Modern SaaS workspace for teams
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs text-slate-400">
            <Link
              to="/contact"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              Contact
            </Link>

            <Link
              to="/privacy"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              Terms
            </Link>

            <Link
              to="/login"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-200"
            >
              Sign In
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 Nexora
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <Link
          to="/signup"
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
        >
          Get Started

          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {label}
    </a>
  );
}

function PreviewNav({ active = false }) {
  return (
    <div
      className={`mb-2 h-7 rounded-lg ${
        active ? "bg-blue-50 dark:bg-blue-500/10" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-2 mt-2 h-2 w-12 rounded-full ${
          active
            ? "bg-blue-400"
            : "bg-slate-200 dark:bg-slate-700"
        }`}
      />
    </div>
  );
}

function PreviewStat({ value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-2.5 dark:border-slate-800">
      <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />

      <p className="mt-2 text-sm font-bold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function PreviewList() {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
      <div className="h-2 w-16 rounded-full bg-slate-800 dark:bg-slate-200" />

      {[1, 2, 3].map((item) => (
        <div key={item} className="mt-3 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-500/20" />

          <div className="flex-1">
            <div className="h-1.5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="mt-1 h-1.5 w-12 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewActivity() {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
      <div className="h-2 w-16 rounded-full bg-slate-800 dark:bg-slate-200" />

      <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="mt-2 h-2 w-3/5 rounded-full bg-slate-100 dark:bg-slate-800" />

      <div className="mt-4 h-7 w-20 rounded-lg bg-blue-50 dark:bg-blue-500/10" />
    </div>
  );
}

function AboutPoint({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={18}
        className="shrink-0 text-green-500"
        aria-hidden="true"
      />

      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {text}
      </span>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <Icon size={18} aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}