import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage ||
      typeof onPageChange !== "function"
    ) {
      return;
    }

    onPageChange(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
    >
      <p className="text-center text-xs text-slate-500 sm:text-left dark:text-slate-400">
        Page{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="
            inline-flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-600
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-40
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:border-slate-600
            dark:hover:bg-slate-800
            dark:hover:text-blue-400
          "
        >
          <ChevronLeft size={17} />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="flex h-9 min-w-7 items-center justify-center px-1 text-sm text-slate-400"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  inline-flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  px-2
                  text-sm
                  font-medium
                  transition
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-blue-500/20
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="
            inline-flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-600
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-40
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:border-slate-600
            dark:hover:bg-slate-800
            dark:hover:text-blue-400
          "
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </nav>
  );
}