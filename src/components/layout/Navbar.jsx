import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

const searchablePages = [
  {
    name: "Dashboard",
    path: "/dashboard",
    keywords: ["dashboard", "home", "overview"],
  },
  {
    name: "Users",
    path: "/users",
    keywords: ["users", "user", "customers", "people"],
  },
  {
    name: "Projects",
    path: "/projects",
    keywords: ["projects", "project"],
  },
  {
    name: "Tasks",
    path: "/tasks",
    keywords: ["tasks", "task", "kanban"],
  },
  {
    name: "Orders",
    path: "/orders",
    keywords: ["orders", "order", "sales"],
  },
  {
    name: "Analytics",
    path: "/analytics",
    keywords: ["analytics", "reports", "revenue", "statistics"],
  },
  {
    name: "Notifications",
    path: "/notifications",
    keywords: ["notifications", "notification", "alerts"],
  },
  {
    name: "Settings",
    path: "/settings",
    keywords: ["settings", "account", "profile", "security"],
  },
];

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your business and system activity.",
  },
  "/users": {
    title: "Users",
    description: "Manage users and account access.",
  },
  "/projects": {
    title: "Projects",
    description: "Manage projects, progress and priorities.",
  },
  "/tasks": {
    title: "Tasks",
    description: "Track and manage your team's tasks.",
  },
  "/orders": {
    title: "Orders",
    description: "Monitor customer orders and transactions.",
  },
  "/analytics": {
    title: "Analytics",
    description: "Track performance and business insights.",
  },
  "/notifications": {
    title: "Notifications",
    description: "Stay updated with your latest activity.",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your account and preferences.",
  },
};

export default function Navbar({
  onMobileMenuToggle,
  isMobileMenuOpen = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const currentPage =
    pageTitles[location.pathname] || pageTitles["/dashboard"];

  const searchResults = searchablePages.filter((page) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return (
      page.name.toLowerCase().includes(query) ||
      page.keywords.some((keyword) =>
        keyword.includes(query)
      )
    );
  });

  useEffect(() => {
    setSearch("");
    setSearchFocused(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) {
      return;
    }

    const result = searchablePages.find(
      (page) =>
        page.name.toLowerCase() === query ||
        page.keywords.includes(query)
    );

    if (result) {
      navigate(result.path);
      setSearch("");
      setSearchFocused(false);
    }
  };

  const handleSearchResult = (path) => {
    navigate(path);
    setSearch("");
    setSearchFocused(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("nexoraAuth");
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-slate-200
        bg-white/90
        backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div
        className="
          flex
          min-h-20
          items-center
          gap-3
          px-4
          sm:px-6
        "
      >
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            lg:hidden
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          {isMobileMenuOpen ? (
            <X size={19} />
          ) : (
            <Menu size={19} />
          )}
        </button>

        {/* Page Heading */}
        <div className="hidden min-w-0 sm:block">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            {currentPage.title}
          </h1>

          <p className="mt-0.5 hidden text-xs text-slate-500 lg:block dark:text-slate-400">
            {currentPage.description}
          </p>
        </div>

        {/* Search */}
        <div
          ref={searchRef}
          className="
            relative
            ml-auto
            w-full
            max-w-xs
            lg:max-w-md
          "
        >
          <form onSubmit={handleSearchSubmit}>
            <div
              className={`
                flex
                h-10
                items-center
                rounded-xl
                border
                bg-slate-50
                transition
                dark:bg-slate-900

                ${
                  searchFocused
                    ? `
                      border-blue-400
                      bg-white
                      ring-4
                      ring-blue-500/10
                      dark:border-blue-500
                      dark:bg-slate-900
                    `
                    : `
                      border-slate-200
                      dark:border-slate-700
                    `
                }
              `}
            >
              <Search
                size={17}
                className="
                  ml-3
                  shrink-0
                  text-slate-400
                "
              />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search pages..."
                aria-label="Search pages"
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  text-sm
                  text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  dark:text-white
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchFocused(false);
                  }}
                  aria-label="Clear search"
                  className="
                    mr-1
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-200
                    hover:text-slate-700
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                  "
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </form>

          {/* Search Results */}
          {searchFocused && search.trim() && (
            <div
              className="
                absolute
                left-0
                right-0
                top-12
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
              {searchResults.length > 0 ? (
                searchResults.map((page) => (
                  <button
                    key={page.path}
                    type="button"
                    onClick={() =>
                      handleSearchResult(page.path)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      text-slate-700
                      transition
                      hover:bg-slate-100
                      dark:text-slate-200
                      dark:hover:bg-slate-800
                    "
                  >
                    <Search
                      size={15}
                      className="text-blue-500"
                    />

                    <span>{page.name}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    No pages found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try Dashboard, Users, Projects or Settings.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Theme */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="Open notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
                dark:ring-slate-900
              "
            />
          </button>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setProfileOpen((open) => !open)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-transparent
                p-1.5
                transition
                hover:border-slate-200
                hover:bg-slate-50
                dark:hover:border-slate-700
                dark:hover:bg-slate-900
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-linear-to-br
                  from-blue-600
                  to-cyan-500
                  text-xs
                  font-bold
                  text-white
                "
              >
                AA
              </div>

              <div className="hidden text-left xl:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Ahmad Azeem
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden
                  text-slate-400
                  transition-transform
                  xl:block
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-64
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
                <div
                  className="
                    border-b
                    border-slate-100
                    px-3
                    py-3
                    dark:border-slate-800
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-linear-to-br
                        from-blue-600
                        to-cyan-500
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      AA
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        Ahmad Azeem
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);
                  }}
                  className="
                    mt-1
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
                  <User size={17} />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);
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
                  <span>Settings</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

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
      </div>
    </header>
  );
}