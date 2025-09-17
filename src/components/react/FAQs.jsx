import { useState } from "react";
import { PHONE_NUMBER } from "../../consts";
import faqImage from "../../assets/mcfly-education-flight-school-student.webp";

function PlusMinus({ open }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/20 text-primary-400"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" className="opacity-80">
        <path d="M1 6h10" stroke="currentColor" strokeWidth="2" />
        {open ? null : (
          <path d="M6 1v10" stroke="currentColor" strokeWidth="2" />
        )}
      </svg>
    </span>
  );
}

function FAQItem({ item, idx, open, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        className="flex w-full items-start gap-3 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:gap-4 md:py-5 px-5 md:px-6"
        aria-expanded={open}
        aria-controls={`faq-panel-${idx}`}
        onClick={onToggle}
      >
        <PlusMinus open={open} />
        <span className="text-lg font-semibold text-white md:text-xl">
          {item.question}
        </span>
      </button>

      <div
        id={`faq-panel-${idx}`}
        role="region"
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="py-5 px-8 text-base leading-relaxed text-black font-medium bg-primary-500 md:py-6">
            {item.answer?.map((p, i) => (
              <p key={i} className={i === item.answer.length - 1 ? "" : "mb-3"}>
                {p}
              </p>
            ))}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc space-y-1 pl-5">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ faqs = content || [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="bg-accent-950 w-full text-white">
      <div className="from-primary-950/50 pointer-events-none absolute inset-0 -z-10 bg-radial-[at_20%_40%] to-transparent to-60%"></div>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 px-3 py-1 text-[11px] tracking-widest uppercase">
              <span className="size-1.5 rounded-full bg-yellow-400/90"></span>
              FAQS
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Leaders in Pilot Training
            </h2>
            <p className="mt-3 max-w-2xl text-white/80 md:mt-4">
              Personalized, safety-first instruction with a single, highly
              skilled instructor. World-class standards, clear progress
              tracking, and training tailored to your goals.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10 md:my-12" />

        {/* FAQ List */}
        <div className="grid gap-8 lg:grid-cols-[1fr_28rem]">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            {faqs.map((item, i) => (
              <FAQItem
                key={item.id ?? i}
                item={item}
                idx={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Aside + Image stacked vertically */}
          <div className="flex flex-col gap-8 lg:w-[28rem]">
            <aside>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-6">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl text-primary-500">
                  Have more questions?
                </h3>
                <p className="mb-4 text-white/75">
                  Reach out for scheduling, medical certificate questions, or a
                  discovery flight.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-primary-500 hover:text-black"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 16.92v2a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h2a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.47-1.05a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="text-left">
                      <p className="-mb-0.5 text-sm opacity-80">Contact Us</p>
                      <p className="text-lg font-semibold">{PHONE_NUMBER}</p>
                    </div>
                  </span>
                  <span
                    aria-hidden
                    className="opacity-60 transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
                <div className="mt-4 text-xs opacity-60">
                  Prefer email? Write us at{" "}
                  <a
                    href="mailto:hello@mcfly.education"
                    className="underline hover:opacity-100"
                  >
                    hello@mcfly.education
                  </a>
                  .
                </div>
              </div>
            </aside>

            {/* Optional image */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={faqImage.src}
                  alt="Instructor briefing a student in the cockpit"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
