import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_NUMBER } from "../../consts";

const enrollData = {
  eyebrow: "Enrollment",
  heading: "Apply to Start Training",
  subheading:
    "Tell us about your goals and schedule. We’ll follow up with next steps, required documents, and your personalized training path.",
  info: {
    title: "Need Help With Enrollment?",
    intro:
      "Questions about prerequisites, medicals, or financing? We’re happy to guide you through the process.",
    locationLabel: "Office",
    addressLine1: ADDRESS_LINE_1,
    addressLine2: ADDRESS_LINE_2,
    phoneLabel: "Call Us",
    phoneValue: PHONE_NUMBER,
    emailLabel: "Admissions",
    emailValue: "enroll@dominantsite.com",
  },
  form: {
    method: "post",
    action: "/api/enroll",
    onsubmit:
      "event.preventDefault(); alert('Demo enrollment form — connect to /api/enroll');",
    fields: [
      // row 1
      {
        id: "fullName",
        label: "Full Name",
        placeholder: "First & Last Name",
        required: true,
        type: "text",
        row: 1,
      },
      {
        id: "email",
        label: "Email",
        placeholder: "you@example.com",
        required: true,
        type: "email",
        row: 1,
      },
      // row 2
      {
        id: "phone",
        label: "Phone",
        placeholder: "+1 555...",
        required: true,
        type: "tel",
        inputmode: "tel",
        row: 2,
      },
      {
        id: "program",
        label: "Program of Interest",
        required: true,
        type: "select",

        options: [
          { value: "private", label: "Private Pilot (PPL)" },
          { value: "instrument", label: "Instrument Rating (IR)" },
          { value: "commercial", label: "Commercial Pilot (CPL)" },
          { value: "cfi", label: "Certified Flight Instructor (CFI/CFII)" },
        ],
        row: 2,
      },
      {
        id: "questions",
        label: "Questions or Notes",
        placeholder: "Anything we should know?",
        required: false,
        type: "textarea",
        rows: 6,
        row: 5,
      },
    ],
    cta: "Submit Application",
  },
};

export default enrollData;
