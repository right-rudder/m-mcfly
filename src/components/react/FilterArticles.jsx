export default function FilterArticles({
  tags = [],
  currentTag = "All",
  onTagChange,
  query,
  onQueryChange,
  count = 0,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2 pb-1 max-w-2xl lg:max-w-none">
        {tags.map((t) => {
          const active = t === currentTag;
          return (
            <button
              key={t}
              onClick={() => onTagChange(t)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm whitespace-nowrap",
                active
                  ? "bg-primary-500 text-black"
                  : "border-primary-300 text-white hover:border-zinc-400",
              ].join(" ")}
              aria-pressed={active}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Search articles…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded-full border border-accent-300 px-4 py-2 text-sm outline-none focus:border-primary-500 sm:w-72"
          aria-label="Search articles"
        />
        <span className="hidden text-sm text-zinc-500 sm:inline">
          {count} results
        </span>
      </div>
    </div>
  );
}
