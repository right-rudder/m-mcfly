export default function ArticleCard({ post }) {
  return (
    <a
      href={post.url}
      className="group block overflow-hidden rounded-2xl ring-1 ring-zinc-200 hover:ring-primary-300 focus:outline-none text-white"
    >
      <div className="aspect-[16/9] w-full bg-zinc-100">
        {post.heroImage ? (
          <img
            src={post.heroImage}
            alt={post.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {(post.tags || []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-primary-500 px-2 py-0.5 text-xs bg-primary-500/10"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-base leading-snug font-semibold group-hover:underline sm:text-lg text-primary-500">
          {post.title}
        </h3>
        {post.description ? (
          <p className="mt-2 line-clamp-2 text-sm">
            {post.description}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-white/70">
          {post.pubDate ? new Date(post.pubDate).toLocaleDateString() : ""}
          {post.author ? ` • ${post.author}` : ""}
        </p>
      </div>
    </a>
  );
}
