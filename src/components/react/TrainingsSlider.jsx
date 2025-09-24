import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


export default function TrainingsSlider({
  title = "Your Training Path from zero to Pilot",
  eyebrow = "Our Trainings",
  description = "Explore our comprehensive pilot training programs designed to take you from beginner to certified pilot with confidence and expertise.",
  items = [],
  gapPx = 24,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const isTeleporting = useRef(false);

  const realLen = items?.length || 0;

  // 1 card on mobile, 2 on desktop
  const [visibleCount, setVisibleCount] = useState(2);
  const [cardW, setCardW] = useState(380);

  // Clone count based on visibleCount
  const CLONES = Math.max(2, visibleCount * 2);

  // Extended items with head/tail clones
  const extendedItems = useMemo(() => {
    if (!realLen) return [];
    const head = items.slice(0, Math.min(CLONES, realLen));
    const tail = items.slice(-Math.min(CLONES, realLen));
    return [...tail, ...items, ...head];
  }, [items, realLen, CLONES]);

  const step = useMemo(() => cardW + gapPx, [cardW, gapPx]);

  // Current extended index (leftmost card)
  const [index, setIndex] = useState(CLONES);

  // Responsive widths and visibleCount
  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const w = wrap.clientWidth;
      const cs = getComputedStyle(track);
      const padLeft = parseFloat(cs.paddingLeft) || 0;
      const padRight = parseFloat(cs.paddingRight) || 0;
      const hPad = padLeft + padRight;

      const newVisible = w < 768 ? 1 : 2; // mobile:1, desktop:2
      setVisibleCount(newVisible);

      const gapsTotal = (newVisible - 1) * gapPx;
      const newCardW = Math.max(260, Math.floor((w - hPad - gapsTotal) / newVisible));
      setCardW(newCardW);

      requestAnimationFrame(() => {
        if (!trackRef.current) return;
        isTeleporting.current = true;
        trackRef.current.scrollLeft = step * index;
        requestAnimationFrame(() => (isTeleporting.current = false));
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapPx, step]);

  // Initial placement
  useEffect(() => {
    if (!trackRef.current || !realLen) return;
    isTeleporting.current = true;
    trackRef.current.scrollLeft = step * CLONES;
    setIndex(CLONES);
    requestAnimationFrame(() => (isTeleporting.current = false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, realLen, CLONES]);

  // Helpers
  const scrollToIndex = (i, smooth = true) => {
    setIndex(i);
    trackRef.current?.scrollTo({
      left: step * i,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const teleportTo = (px) => {
    if (!trackRef.current) return;
    isTeleporting.current = true;
    trackRef.current.scrollLeft = px;
    requestAnimationFrame(() => (isTeleporting.current = false));
  };

  // One card per click
  const next = () => scrollToIndex(index + 1, true);
  const prev = () => scrollToIndex(index - 1, true);

  // Seamless wrap during scroll (for our programmatic scroll + any drag)
  const handleScroll = () => {
    if (!trackRef.current || isTeleporting.current || realLen === 0) return;

    const track = trackRef.current;
    const sl = track.scrollLeft;

    const min = step * CLONES;
    const max = step * (CLONES + realLen); // exclusive

    if (sl >= max) {
      teleportTo(sl - realLen * step);
      return;
    }
    if (sl < min) {
      teleportTo(sl + realLen * step);
      return;
    }
  };

  // Derive current "page" for dots (leftmost positions)
  const pages = Math.max(1, realLen - visibleCount + 1);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      handleScroll();

      const sl = track.scrollLeft;
      const min = step * CLONES;
      const realPx = sl - min;
      const realIndex = realLen ? Math.max(0, Math.round(realPx / step)) % realLen : 0;
      const page = Math.min(pages - 1, realIndex);
      setActivePage(page);

      const approxIndex = Math.round(sl / step);
      if (approxIndex !== index) setIndex(approxIndex);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, realLen, pages, index, CLONES]);

  const goToPage = (p) => {
    const extIndex = CLONES + p;
    scrollToIndex(extIndex, true);
  };

  // ---- MOBILE SWIPE: trigger prev/next (no native side-scroll needed) ----
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let startY = 0;
    let moved = false;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!moved && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        // horizontal intent → prevent vertical scroll from hijacking the swipe
        e.preventDefault();
        moved = true;
      }
    };

    const onTouchEnd = (e) => {
      if (!moved) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const THRESH = 40; // swipe distance threshold
      if (dx <= -THRESH) {
        next(); // swipe left → next
      } else if (dx >= THRESH) {
        prev(); // swipe right → prev
      }
    };

    // Passive must be false to allow preventDefault in onTouchMove
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: false });
    track.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [step, index]);

  if (!realLen) return null;

  return (
    <section className="bg-black py-12 text-white lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-6">
        {/* Header */}
        <div className="my-12 flex flex-col items-center text-center">
          <p className="eyebrow inline-flex items-center gap-2 px-3 py-1 text-[11px] tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-yellow-400/90" />
            {eyebrow}
            <span className="size-1.5 rounded-full bg-yellow-400/90" />
          </p>
          <h2 className="mt-3 text-[clamp(28px,6vw,56px)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/80">{description}</p>
        </div>

        {/* Carousel */}
        <div className="relative" ref={wrapRef}>
          <div
            ref={trackRef}
            // Hide horizontal scrollbar and disable native side-scroll.
            // We control movement via arrows + swipe logic above.
            className="no-scrollbar flex overflow-x-hidden overflow-y-visible px-4 py-4"
            style={{
              gap: `${gapPx}px`,
              willChange: "scroll-position",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y", // allow vertical page scroll
            }}
          >
            {extendedItems.map((it, idx) => (
              <article
                key={`${it?.id ?? "item"}-${idx}`}
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
                      <span aria-hidden className="text-base leading-none">↗</span>
                      <span>Explore {it.segment}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Arrows (ensure always above cards) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              className="btn-transparent pointer-events-auto ml-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Previous"
            >
              <span className="text-xl"><FaArrowLeft /></span>
            </button>
            <button
              type="button"
              onClick={next}
              className="btn-transparent pointer-events-auto ml-[-8px] inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Next"
            >
              <span className="text-xl"><FaArrowRight /></span>
            </button>
          </div>
        </div>

        {/* Page dots */}
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
                    isActive ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400",
                  ].join(" ")}
                  aria-label={`Go to position ${p + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
