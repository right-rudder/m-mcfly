import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import FilterArticles from "./FilterArticles.jsx";

export default function BlogList({ posts }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [visible, setVisible] = useState(12);

  const tags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = tag === "All" || (p.tags || []).includes(tag);
      const matchesQ =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQ;
    });
  }, [posts, query, tag]);

  const toShow = filtered.slice(0, visible);

  return (
    <div className="bg-accent-950 relative isolate -z-0 overflow-hidden p-6 text-white sm:p-10 lg:p-16">
      <div class="from-primary-950/50 pointer-events-none absolute inset-0 -z-10 bg-radial-[at_20%_40%] to-transparent to-60%"></div>

      <FilterArticles
        tags={tags}
        currentTag={tag}
        onTagChange={setTag}
        query={query}
        onQueryChange={setQuery}
        count={filtered.length}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {toShow.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 9)}
            className="rounded-full bg-black px-5 py-2.5 text-white hover:opacity-90"
            aria-label="Load more articles"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
