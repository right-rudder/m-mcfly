import { useEffect, useMemo, useRef, useState } from "react";

export default function TestimonialsCarousel({
  items,
  autoPlayMs = 6000,
  className = "",
}) {
  const data = useMemo(
    () =>
      (items?.length ? items : PLACEHOLDER_TESTIMONIALS).map((t, i) => ({
        id: t.id ?? i,
        ...t,
      })),
    [items],
  );

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);

  const goTo = (i) => setIndex((i + data.length) % data.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Auto-play
  useEffect(() => {
    if (autoPlayMs <= 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) next();
    }, autoPlayMs);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [index, autoPlayMs, data.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const current = data[index];

  return (
    <section
      className={
        "relative mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24 " +
        "bg-muted-50/20 rounded-3xl shadow-sm ring-1 ring-black/5" +
        className
      }
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="text-muted-500 text-sm tracking-widest uppercase">
          What people say
        </p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Loved by creators & teams
        </h2>
      </div>

      {/* Slide */}
      <div className="relative">
        {/* Decorative opening quote */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-1/2 size-10 -translate-x-1/2 opacity-20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.3 1.86 4.16 4.17 4.16.4 0 .79-.06 1.16-.17-.46 1.76-1.9 3.09-3.66 3.46a.75.75 0 0 0 .16 1.48c3.72-.79 6.17-4.38 5.38-8.09C9.91 8.07 8.67 6 7.17 6Zm10 0C14.86 6 13 7.86 13 10.17c0 2.3 1.86 4.16 4.17 4.16.4 0 .79-.06 1.16-.17-.46 1.76-1.9 3.09-3.66 3.46a.75.75 0 0 0 .16 1.48c3.72-.79 6.17-4.38 5.38-8.09-.47-2.84-1.71-4.91-3.21-4.91Z" />
        </svg>

        <figure
          className="mx-auto max-w-3xl text-center transition-opacity duration-300"
          key={current.id}
        >
          <blockquote className="text-lg leading-relaxed text-balance sm:text-xl">
            “{current.quote}”
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-3">
            <img
              src={current.avatar || PLACEHOLDER_AVATAR}
              alt={current.author}
              className="size-16 rounded-full object-cover shadow-md ring-2 ring-white sm:size-20"
              loading="lazy"
              decoding="async"
            />
            <div className="text-center">
              <div className="font-semibold">{current.author}</div>
              <div className="text-muted-500 text-sm">
                {current.handle ? (
                  <a
                    href={`https://x.com/${current.handle.replace(/^@/, "")}`}
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    @{current.handle.replace(/^@/, "")}
                  </a>
                ) : null}
                {current.role ? (
                  <>
                    {current.handle ? " · " : null}
                    <span>{current.role}</span>
                  </>
                ) : null}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm ring-1 ring-black/10 ring-inset hover:bg-black/5"
          aria-label="Previous testimonial"
          onClick={prev}
        >
          <span aria-hidden>←</span>
        </button>
        <nav
          className="flex items-center gap-2"
          aria-label="Select testimonial"
        >
          {data.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={index === i}
              onClick={() => goTo(i)}
              className={
                "h-2.5 w-2.5 rounded-full transition-all " +
                (index === i
                  ? "bg-foreground w-6"
                  : "bg-black/20 hover:bg-black/30")
              }
            />
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm ring-1 ring-black/10 ring-inset hover:bg-black/5"
          aria-label="Next testimonial"
          onClick={next}
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}

const PLACEHOLDER_AVATAR =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces";

export const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "I don’t know where I was without this tool. It’s addictive and useful — I use it every day to speed up design work.",
    author: "Andrew B.",
    handle: "IGchef_andrewb",
    role: "Content Creator",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=faces",
  },
  {
    quote:
      "Simply outstanding. The ability to collaborate in real-time keeps our team in flow. We ship creatives 5× faster now.",
    author: "Navneet K.",
    handle: "navneet4",
    role: "Marketing Lead",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&h=300&fit=crop&crop=faces",
  },
  {
    quote:
      "The editor feels effortless and fun. Our interns were productive on day one — huge win for onboarding.",
    author: "Samira A.",
    role: "Design Ops",
    avatar:
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=300&h=300&fit=crop&crop=faces",
  },
];
