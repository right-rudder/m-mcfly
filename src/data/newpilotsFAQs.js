// Schema: { id, question, answer: string[], bullets?: string[] }

const newcomerFAQs = [
  {
    id: "who-is-mcfly",
    question: "Who is McFly Education and who will be my instructor?",
    answer: [
      "McFly Education is a solo-CFI flight training experience focused on new generations of pilots, safety, and community.",
      "You’ll train one-on-one with the same friendly, people-focused instructor from day one to checkride for consistent standards and feedback.",
    ],
    bullets: [
      "Personalized lessons and briefing/debriefing every flight",
      "Clear roadmap from discovery flight to first solo",
      "Community-oriented culture to help you keep momentum",
    ],
  },
  {
    id: "first-step",
    question: "What’s the best first step if I’m brand new?",
    answer: [
      "Book a Discovery (Intro) Flight. You’ll tour the aircraft, learn basics in a short briefing, and fly with the instructor, often taking the controls under supervision.",
      "After landing, we map your training plan so you know exactly what comes next.",
    ],
    bullets: [
      "Hands-on left-seat experience",
      "Safety briefing before and debrief after",
      "Personalized training roadmap",
    ],
  },
  {
    id: "requirements",
    question: "Do I need any prior experience or special qualifications?",
    answer: [
      "No prior flight experience is required. Most students start from zero.",
      "You should be comfortable learning in English and able to obtain an FAA Class 3 medical (for Private Pilot). Schedule your medical early to avoid delays.",
    ],
    bullets: [
      "Government photo ID for TSA/identity checks",
      "Glasses/contacts are fine if corrected to FAA standards",
      "We’ll guide you through every step and document",
    ],
  },
  {
    id: "age",
    question: "Is there a minimum age to begin?",
    answer: [
      "You can start lessons and log time at any age with a legal guardian’s consent if you’re a minor.",
      "To solo an airplane you must meet FAA minimums; to take the Private Pilot checkride you must be at least 17.",
    ],
  },
  {
    id: "time-and-schedule",
    question: "How often should I fly to make steady progress?",
    answer: [
      "Consistency beats cramming. Two to four lessons per week keeps skills fresh and reduces re-learning.",
      "We offer flexible scheduling around school or work, including evenings/weekends as available.",
    ],
    bullets: [
      "Recurring time slots help maintain momentum",
      "Weather/maintenance contingency built into planning",
      "Study plan provided so ground learning matches flight lessons",
    ],
  },
  {
    id: "fear-or-motion",
    question: "What if I’m nervous about flying or get motion sickness?",
    answer: [
      "That’s very common for newcomers. We build up gradually, shorter lessons, calm-air windows, and steady skill stacking.",
      "Simple strategies (hydration, light meals, fresh air, choosing smoother times of day) help most students adapt quickly.",
    ],
  },
  {
    id: "safety",
    question: "How does McFly Education approach safety?",
    answer: [
      "Safety is our core value. Expect disciplined checklists, risk-management tools (PAVE/5P), weather/airspace planning, and clear go/no-go criteria.",
      "Every lesson includes a preflight briefing and a post-flight debrief to reinforce good judgment and standardization.",
    ],
    bullets: [
      "Standard callouts and flows",
      "Personal minimums developed with your CFI",
      "Scenario-based training for real-world decision-making",
    ],
  },
  {
    id: "aircraft-and-sim",
    question: "What aircraft and tools will I train in?",
    answer: [
      "You’ll typically fly in dependable single-engine trainers (Cessna-class) and have simulations for procedures and instrument practice.",
      "We emphasize cockpit organization, real-world radio work, and practical navigation from the start.",
    ],
    bullets: [
      "Headset checklist and training materials guidance",
      "Integrated ground + flight lessons for faster learning",
    ],
  },
  {
    id: "study-and-exams",
    question: "How do ground study and exams work?",
    answer: [
      "Your CFI will give you a structured ground plan, videos, reading, and quizzes, to prep for the FAA written and oral.",
      "We’ll schedule milestones and stage checks so you always know what to study next.",
    ],
    bullets: [
      "Written prep woven into weekly plan",
      "Mock orals to build confidence",
      "ACS standards emphasized from early phases",
    ],
  },
  {
    id: "costs-and-planning",
    question: "How do payments and budgeting work for training?",
    answer: [
      "Training is pay-as-you-go with transparent planning. We’ll help you estimate milestones and connect you with common scholarship/financing resources used by student pilots.",
      "Your plan flexes with weather, maintenance, and your pace, without compromising safety.",
    ],
  },
  {
    id: "what-to-bring",
    question: "What should I bring to my first lessons?",
    answer: [
      "Valid photo ID, comfortable clothing, sunglasses, and a water bottle.",
      "If you have a headset, bring it, otherwise we’ll advise options. We’ll also share a simple checklist of recommended materials and apps.",
    ],
    bullets: [
      "Notebook/iPad for notes and checklists",
      "Charged phone (for EFB/weather if applicable)",
      "Arrive a few minutes early for the briefing",
    ],
  },
  {
    id: "next-steps",
    question: "What are my next steps if I want to start now?",
    answer: [
      "Book a Discovery Flight to experience training first-hand.",
      "Afterward, we’ll set a consistent lesson cadence, start your medical, and kick off your study plan.",
    ],
    bullets: [
      "Lock recurring time slots",
      "Get medical scheduled early",
      "Start written exam prep alongside flight lessons",
    ],
  },
];

export default newcomerFAQs;
