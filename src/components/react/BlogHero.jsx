import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogHero({ posts = [] }) {
  const slides = useMemo(() => posts, [posts]);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={1.1}
        spaceBetween={16}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 16 },
          768: { slidesPerView: 2.2, spaceBetween: 18 },
          1024: { slidesPerView: 3.2, spaceBetween: 20 },
        }}
        aria-label="Featured blog posts"
      >
        {slides.map((post) => (
          <SwiperSlide key={post.slug}>
            <a
              className="group block overflow-hidden rounded-2xl border border-zinc-200 transition hover:border-zinc-300"
              href={post.url}
            >
              <div className="aspect-[16/9] w-full bg-zinc-100">
                {post.heroImage ? (
                  // Use Astro <Image> if you want; leaving plain img for portability
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
                      className="inline-flex items-center rounded-full border border-zinc-300 px-2 py-0.5 text-xs text-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg leading-snug font-semibold group-hover:underline">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                    {post.description}
                  </p>
                ) : null}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
