import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={17}
        strokeWidth={2}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-10
          pr-10
          text-sm
          text-slate-900
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          hover:border-slate-300
          focus:border-blue-400
          focus:ring-4
          focus:ring-blue-500/10
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:placeholder:text-slate-500
          dark:hover:border-slate-600
          dark:focus:border-blue-500
        "
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute
            right-2
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
            dark:hover:bg-slate-800
            dark:hover:text-slate-200
          "
        >
          <X size={15} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}