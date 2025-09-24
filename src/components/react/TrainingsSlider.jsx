import { useEffect, useMemo, useRef, useState } from "react";

export default function TrainingsSlider({
  title = "Your Training Path from zero to Pilot",
  eyebrow = "Our Trainings",
  description = "Explore our comprehensive pilot training programs designed to take you from beginner to certified pilot with confidence and expertise.",
  items = trainings || [], // keep your original default
  gapPx = 24, // gap between cards in px
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  // --- teleport + debounce control ---
  const isTeleporting = useRef(false);
  const scrollEndTimer = useRef(null);

  // --- cloning config ---
  // Showing 2 cards per view; cloning 4 gives two full pages on each end
  const CLONES = 4;

  const realLen = items?.length || 0;

  // Build extended array with head/tail clones
  const extendedItems = useMemo(() => {
    if (!realLen) return [];
    const head = items.slice(0, Math.min(CLONES, realLen));
    const tail = items.slice(-Math.min(CLONES, realLen));
    return [...tail, ...items, ...head];
  }, [items, realLen]);

  // Card width computed so TWO cards + ONE gap fill container
  const [cardW, setCardW] = useState(380);
  // Index in the extended array; start at CLONES to show first "real" page
  const [index, setIndex] = useState(CLONES);

  const step = useMemo(() => cardW + gapPx, [cardW, gapPx]);

  // Compute card width responsively
  useEffect(() => {
    const compute = () => {
      const el = wrapRef.current;
      if (!el) return;
      const w = el.clientWidth;

      // account for track horizontal padding
      const track = trackRef.current;
      const cs = track ? getComputedStyle(track) : null;
      const padLeft = cs ? parseFloat(cs.paddingLeft) || 0 : 0;
      const padRight = cs ? parseFloat(cs.paddingRight) || 0 : 0;
      const hPad = padLeft + padRight;

      const newCardW = Math.max(280, Math.floor((w - hPad - gapPx) / 2));
      setCardW(newCardW);

      // snap (no animation) to current index after resize to keep alignment
      requestAnimationFrame(() => {
        if (trackRef.current) {
          isTeleporting.current = true;
          trackRef.current.scrollLeft = step * index;
          requestAnimationFrame(() => {
            isTeleporting.current = false;
          });
        }
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapPx, step]);

  // Ensure initial position at the first real page (instant)
  useEffect(() => {
    if (!trackRef.current || !realLen) return;
    isTeleporting.current = true;
    trackRef.current.scrollLeft = step * CLONES;
    setIndex(CLONES);
    requestAnimationFrame(() => {
      isTeleporting.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, realLen]);

  // Helpers
  const scrollToIndex = (i, smooth = true) => {
    setIndex(i);
    trackRef.current?.scrollTo({
      left: step * i,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const teleportTo = (i) => {
    if (!trackRef.current) return;
    isTeleporting.current = true;
    // instant jump
    trackRef.current.scrollLeft = step * i;
    setIndex(i);
    // allow a frame to commit layout
    requestAnimationFrame(() => {
      isTeleporting.current = false;
    });
  };

  const next = () => scrollToIndex(index + 2, true); // one page forward (2 cards)
  const prev = () => scrollToIndex(index - 2, true);

  // Scroll end handling: if we’re in the clones, teleport (instantly) to the equivalent real index
  const handleScroll = () => {
    if (!trackRef.current || isTeleporting.current) return;
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);

    // Short debounce to detect "scroll end"
    scrollEndTimer.current = setTimeout(() => {
      if (!trackRef.current || isTeleporting.current) return;

      const i = Math.round(trackRef.current.scrollLeft / step);

      // moved into head clones → wrap to equivalent real index
      if (i >= CLONES + realLen) {
        teleportTo(i - realLen);
        return;
      }
      // moved into tail clones → wrap to equivalent real index
      if (i < CLONES) {
        teleportTo(i + realLen);
        return;
      }

      // sync index if needed
      if (i !== index) setIndex(i);
    }, 40);
  };

  // Page dots (based on real items/pages)
  const pages = Math.ceil((realLen || 0) / 2);

  // Derive active page from the current extended index
  const realIndex =
    realLen > 0 ? (((index - CLONES) % realLen) + realLen) % realLen : 0;
  const activePage = Math.floor(realIndex / 2);

  const goToPage = (p) => {
    // p is 0-based page in real array (leftmost card index = p * 2)
    const targetRealLeftmost = p * 2;
    const extIndex = CLONES + targetRealLeftmost;
    scrollToIndex(extIndex, true);
  };

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
            onScroll={handleScroll}
            className="scrollbar-hide flex overflow-x-hidden overflow-y-visible scroll-smooth px-4 py-4"
            style={{ gap: `${gapPx}px` }}
          >
            {extendedItems.map((it, idx) => (
              <article
                key={`${it?.id ?? "item"}-${idx}`} // unique within extended array
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

                    <a
                      href={`/trainings/${it.path}`}
                      className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-white/80 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
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

          {/* Arrows — always enabled for infinite loop */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              className="btn-transparent pointer-events-auto ml-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Previous"
            >
              <span className="text-xl">←</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="btn-primary pointer-events-auto mr-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Next"
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Page dots for REAL pages */}
        {pages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, p) => {
              const isActive = p === activePage;
              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition",
                    isActive
                      ? "bg-neutral-900"
                      : "bg-neutral-300 hover:bg-neutral-400",
                  ].join(" ")}
                  aria-label={`Go to slide ${p + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
