import { useEffect, useMemo, useRef, useState } from "react";

export default function TrainingsSlider({
  title = "Your Training Path from zero to Pilot",
  eyebrow = "Our Trainings",
  description = "Explore our comprehensive pilot training programs designed to take you from beginner to certified pilot with confidence and expertise.",
  items = DEFAULT_ITEMS,
  gapPx = 24, // gap between cards in px
})
{
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [cardW, setCardW] = useState(380); // computed so 2 fit perfectly
  const [index, setIndex] = useState(0); // leftmost visible card index (multiple of 2)

  const maxIndex = useMemo(() => {
    // last full 2-card “page”
    const pages = Math.ceil(items.length / 2);
    return (pages - 1) * 2;
  }, [items.length]);

  // Compute card width so TWO cards + ONE gap fill the container
  useEffect(() => {
    const compute = () => {
      const el = wrapRef.current;
      if (!el) return;
      const w = el.clientWidth;

      // account for track horizontal padding so borders are not clipped
      const track = trackRef.current;
      const cs = track ? getComputedStyle(track) : null;
      const padLeft = cs ? parseFloat(cs.paddingLeft) || 0 : 0;
      const padRight = cs ? parseFloat(cs.paddingRight) || 0 : 0;
      const hPad = padLeft + padRight;

      const newCardW = Math.max(280, Math.floor((w - hPad - gapPx) / 2)); // 2 cards + 1 gap inside padding
      setCardW(newCardW);
      // snap to current page (avoid partials on resize)
      setTimeout(() => {
        goTo(index);
      }, 0);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapPx]);

  const step = useMemo(() => cardW + gapPx, [cardW, gapPx]);

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, maxIndex));
    setIndex(clamped);
    trackRef.current?.scrollTo({ left: step * clamped, behavior: "smooth" });
  };

  const next = () => goTo(index + 2);
  const prev = () => goTo(index - 2);

  // Disable states
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <section className="bg-black py-12 text-white lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-6">
        {/* Header */}
        <div className="my-12 flex flex-col items-center text-center">
          <p className="eyebrow inline-flex items-center gap-2 px-3 py-1 text-[11px] tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-yellow-400/90"></span>
            {eyebrow}
            <span className="size-1.5 rounded-full bg-yellow-400/90"></span>
          </p>
          <h2 className="mt-3 text-[clamp(28px,6vw,56px)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/80">{description}</p>
        </div>

        {/* Carousel */}
        <div className="relative" ref={wrapRef}>
          {/* Track */}
          <div
            ref={trackRef}
            className="flex scroll-smooth overflow-x-hidden overflow-y-visible scrollbar-hide py-4 px-4"
            style={{ gap: `${gapPx}px` }}
          >
            {items.map((it, idx) => (
              <article
                key={it.id ?? idx}
                className="relative shrink-0 rounded-3xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_48px_rgba(0,0,0,0.12)]"
                style={{
                  width: `${cardW}px`,
                  height: "clamp(520px,64vh,600px)",
                  backgroundImage: `url(${it.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/70" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-stretch justify-end px-4 pt-3 pb-5">
                  <div className="flex flex-col justify-end gap-4 px-4 pt-3 pb-5 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[clamp(28px,4.2vw,44px)] leading-none font-extrabold">
                          {it.title ?? it.h1}
                        </div>
                        <h3 className="mt-1 text-sm font-semibold text-white/90">
                          {it.level ?? it.kicker}
                        </h3>
                      </div>
                    </div>

                    <p className="max-w-[60ch] text-sm leading-relaxed text-white/90">
                      {it.summary ?? it.description}
                    </p>

                    <a href={`/trainings/${it.slug ?? it.id}`} className="inline-flex items-center gap-2 self-start rounded-full border border-white/80 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 w-fit">
                      <span aria-hidden className="text-base leading-none">
                        ↗
                      </span>
                      <span>Explore {it.segment}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Arrows */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              className="btn-transparent pointer-events-auto ml-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-70"
              aria-label="Previous"
            >
              <span className="text-xl">←</span>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="btn-primary pointer-events-auto mr-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-40"
              aria-label="Next"
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Optional page dots */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(items.length / 2) }).map((_, p) => {
            const i = p * 2;
            const active = index === i;
            return (
              <button
                key={p}
                onClick={() => goTo(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  active
                    ? "bg-neutral-900"
                    : "bg-neutral-300 hover:bg-neutral-400",
                ].join(" ")}
                aria-label={`Go to slide ${p + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Placeholder data (swap imgs with your assets) */
const DEFAULT_ITEMS = [
  {
    id: "vault",
    kicker: "RAD",
    h1: "Radiotherapy",
    segment: "Vault",
    description:
      "Proprietary shielding for linear accelerators, ensuring optimal safety and flexibility.",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "center",
    kicker: "RAD",
    h1: "Radiotherapy",
    segment: "Center",
    description:
      "Complete therapy center including Vault(s) and clinic space customized to your program.",
    img: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "temp",
    kicker: "RAD",
    h1: "Radiotherapy",
    segment: "Temp",
    description:
      "Self-contained facility for lease, crafted to integrate with your current department.",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "specialty",
    kicker: "RAD",
    h1: "Radiotherapy",
    segment: "Specialty",
    description:
      "Flexible design for diverse applications, ensuring adaptability and efficiency.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
];
