import { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";

const PLACEHOLDER_TESTIMONIALS = [
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
      className={className}
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      {/* Heading */}
      <div className="mb-10 text-center">
        <p class="eyebrow mb-3 inline-flex items-center gap-2 px-3 py-1 text-[11px] tracking-widest uppercase">
          <span class="size-1.5 rounded-full bg-yellow-400/90"></span>
          What Our Students Say
          <span class="size-1.5 rounded-full bg-yellow-400/90"></span>
        </p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Inspiring Stories from Our Students
        </h2>
      </div>

      {/* Slide */}
      <div className="relative flex flex-col items-center">
        {/* Decorative opening quote */}
        <BiSolidQuoteLeft className="text-primary-500 size-10" />

        <figure className="max-w-4xl text-center transition-opacity duration-300">
          <blockquote className="text-xl leading-relaxed text-balance md:text-4xl w-full">
            “{current.quote}”
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-3">
            <div className="text-center">
              <div className="text-primary-500 text-lg font-semibold">
                {current.author}
              </div>
              <div className="text-muted-500 text-sm">
                {current.role ? (
                  <>
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
          className="ring-primary-500/30 inline-flex items-center justify-center rounded-full px-3 py-2 text-sm ring-1 ring-inset hover:bg-black/5"
          aria-label="Previous testimonial"
          onClick={prev}
        >
          <span aria-hidden className="text-primary-500 text-lg">
            ←
          </span>
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
                  ? "bg-primary-500 w-6"
                  : "bg-primary-500/20 hover:bg-black/30")
              }
            />
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm ring-1 ring-primary-500/30 ring-inset hover:bg-black/5"
          aria-label="Next testimonial"
          onClick={next}
        >
          <span aria-hidden className="text-primary-500 text-lg">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
