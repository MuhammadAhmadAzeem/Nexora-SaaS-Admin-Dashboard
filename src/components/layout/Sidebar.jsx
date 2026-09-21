import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronDown,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const mainNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isMobileOpen = false,
  onMobileClose,
}) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("nexoraAuth");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");

    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onMobileClose}
          className="
            fixed
            inset-0
            z-40
            bg-slate-950/40
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-sm
          transition-transform
          duration-300
          dark:border-slate-800
          dark:bg-slate-950

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            dark:border-slate-800
          "
        >
          <button
            type="button"
            onClick={handleLogoClick}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              text-left
              outline-none
              transition
              hover:opacity-80
              focus-visible:ring-2
              focus-visible:ring-blue-500
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-linear-to-br
                from-blue-600
                to-cyan-500
                text-lg
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/20
              "
            >
              N
            </div>

            <div>
              <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Nexora
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                SaaS Platform
              </p>
            </div>
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              lg:hidden
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1.5">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            {mainNavigation.map((item) => (
              <SidebarLink
                key={item.path}
                item={item}
                onNavigate={onMobileClose}
              />
            ))}
          </nav>

          <nav className="mt-8 space-y-1.5">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            {secondaryNavigation.map((item) => (
              <SidebarLink
                key={item.path}
                item={item}
                onNavigate={onMobileClose}
              />
            ))}
          </nav>
        </div>

        {/* Profile */}
        <div
          className="
            shrink-0
            border-t
            border-slate-200
            p-4
            dark:border-slate-800
          "
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                p-2
                text-left
                transition
                hover:bg-slate-50
                dark:hover:bg-slate-900
              "
            >
              {/* Avatar */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-linear-to-br
                  from-blue-600
                  to-cyan-500
                  text-sm
                  font-semibold
                  text-white
                "
              >
                AA
              </div>

              {/* User Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  Ahmad Azeem
                </p>

                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={17}
                className={`
                  shrink-0
                  text-slate-400
                  transition-transform
                  duration-200
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="
                  absolute
                  bottom-full
                  left-0
                  mb-2
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1.5
                  shadow-xl
                  shadow-slate-900/10
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);

                    if (onMobileClose) {
                      onMobileClose();
                    }
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    text-slate-700
                    transition
                    hover:bg-slate-100
                    dark:text-slate-200
                    dark:hover:bg-slate-800
                  "
                >
                  <Settings size={17} />
                  <span>Account Settings</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    text-red-600
                    transition
                    hover:bg-red-50
                    dark:text-red-400
                    dark:hover:bg-red-950/30
                  "
                >
                  <LogOut size={17} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ item, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) => `
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          isActive
            ? `
              bg-blue-50
              text-blue-600
              shadow-sm
              dark:bg-blue-500/10
              dark:text-blue-400
            `
            : `
              text-slate-600
              hover:bg-slate-50
              hover:text-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-900
              dark:hover:text-white
            `
        }
      `}
    >
      {({ isActive }) => (
        <>
          <span
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-200"
              }
            `}
          >
            <Icon size={17} strokeWidth={2} />
          </span>

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}