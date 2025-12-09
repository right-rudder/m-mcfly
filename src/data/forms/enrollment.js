import { ADDRESS_LINE_1, ADDRESS_LINE_2, LOCATIONS, PHONE_NUMBER } from "../../consts";

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
    gmapsLink: LOCATIONS[0].gMaps,
    phoneLabel: "Call Us",
    phoneValue: PHONE_NUMBER,
  },
  form: {
    method: "post",
    action: "/api/enroll",
    onsubmit:
      "event.preventDefault(); alert('Demo enrollment form, connect to /api/enroll');",
    fields: [
      // row 1
      {
        id: "first-name",
        label: "First Name",
        placeholder: "Marty",
        required: true,
        type: "text",
        row: 1,
      },
      {
        id: "last-name",
        label: "Last Name",
        placeholder: "McFly",
        required: true,
        type: "text",
        row: 1,
      },
      // row 2
      {
        id: "email",
        label: "Email",
        placeholder: "example@yourmail.com",
        required: true,
        type: "email",
        row: 2,
        inputmode: "email",
      },
      {
        id: "phone",
        label: "Phone Number",
        placeholder: "+1 234 567 8910",
        required: true,
        type: "tel",
        row: 2,
        inputmode: "tel",
      },
      // row 3
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
        row: 3,
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
