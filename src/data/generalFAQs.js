// src/data/faqs.js
// Schema: { id, question, answer: string[], bullets?: string[] }

const generalFAQs = [
  {
    id: "entry-requirements",
    question:
      "What are the entry requirements for enrolling in the flight school?",
    answer: [
      "To enroll, you should be at least 17 years old (or turning 17 by your PPL checkride), hold a high-school diploma or equivalent, be proficient in English, and obtain an FAA medical certificate (Class 3 or higher). A valid government photo ID is required for TSA/FTSP verification in the U.S.",
      "International students are welcome. Depending on citizenship, additional TSA and visa steps may apply; we’ll guide you through the process.",
      "Tip: Schedule your medical early so training and solo milestones are not delayed.",
    ],
  },
  {
    id: "prior-experience",
    question: "Do I need prior flight experience before joining?",
    answer: [
      "No experience is required. Most students start from zero. We begin with a safety briefing, cockpit familiarization, and a discovery flight to map a training plan that matches your goals and schedule.",
    ],
    bullets: [
      "Hands-on lessons with a single dedicated instructor (Marty).",
      "Structured study path for the FAA written and practical tests.",
      "Extra support for nervous or first-time flyers.",
    ],
  },
  {
    id: "timeline",
    question: "How long does it take to become a licensed pilot?",
    answer: [
      "Timelines depend on frequency of lessons, weather, and study habits. Typical ranges with consistent training:",
    ],
    bullets: [
      "Private Pilot (PPL): ~3–6 months training 3–4x/week; 6–12 months part-time.",
      "Instrument Rating: ~2–4 months with steady flying and sim time.",
      "Commercial Pilot: varies based on time-building after PPL/IR; we’ll plan efficient hour building.",
      "CFI/CFII: typically 1–2 months of focused study and flight prep after prerequisites.",
    ],
  },
  {
    id: "aircraft",
    question: "What types of aircraft or training devices will I use?",
    answer: [
      "You’ll train in modern, well-maintained single-engine trainers (e.g., Cessna-class aircraft commonly used in U.S. flight schools) and an FAA-approved flight simulator for procedures and instrument practice.",
    ],
    bullets: [
      "Emphasis on real-world operations and cockpit discipline.",
      "Scenario-based training to build decision-making skills.",
      "Headset and training materials checklist provided before Day 1.",
    ],
  },
  {
    id: "payments",
    question: "Is financial assistance or a payment plan available?",
    answer: [
      "We keep it flexible with pay-as-you-go scheduling and modular programs (PPL, Instrument, Commercial, CFI/CFII). We can also point you to third-party financing/scholarship resources commonly used by student pilots.",
      "Since every situation is unique, we’ll build a plan that aligns with your budget and timeline—without cutting corners on safety.",
    ],
  },
  {
    id: "scheduling",
    question: "How is training scheduled around work or school?",
    answer: [
      "We offer personalized scheduling with options for evenings and weekends. Consistency matters more than duration—two to four lessons per week is the sweet spot for momentum.",
      "We’ll lock recurring slots when possible and adjust for weather, maintenance, or exams.",
    ],
  },
  {
    id: "safety",
    question: "What is your approach to safety and standardization?",
    answer: [
      "Safety is our first principle. Expect disciplined checklists, pre/post-flight briefs, scenario training, and go/no-go decision frameworks. As a single-instructor operation, your training is highly consistent and aligned with FAA standards.",
      "The mission is simple: everyone involved gets home safely.",
    ],
  },
];

export default generalFAQs;
