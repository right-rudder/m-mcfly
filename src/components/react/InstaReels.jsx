import { useEffect, useRef, useState } from "react";

export default function InstaReels({
  reels = data || [],
  title = "See Training Moments",
}) {
  const scrollerRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanScroll({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (delta) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-480)}
              className={`rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/10 transition ${
                canScroll.left ? "opacity-100" : "opacity-40"
              }`}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(480)}
              className={`rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/10 transition ${
                canScroll.right ? "opacity-100" : "opacity-40"
              }`}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none" }}
        >
          {/* hide scrollbar (webkit) */}
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
          `}</style>

          {reels.map((url, idx) => {
            // Ensure trailing slash for IG embed
            const clean = url.endsWith("/") ? url : `${url}/`;
            const embed = `${clean}embed/`;
            return (
              <div
                key={idx}
                className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 sm:w-[360px] lg:w-[420px]"
              >
                <div className="aspect-[9/16] w-full">
                  <iframe
                    title={`Instagram reel ${idx + 1}`}
                    src={embed}
                    className="h-full w-full"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            onClick={() => scrollBy(-320)}
            className="rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-black/10"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-black/10"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
