import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_NUMBER } from "../../consts";

const discoveryData = {
  eyebrow: "Discovery Flight",
  heading: "Book an Intro Flight",
  subheading:
    "Take the controls with a certified instructor and see what pilot training feels like. Perfect for first-timers.",
  info: {
    title: "Plan Your First Flight",
    intro:
      "We’ll confirm aircraft availability, weather, and a time that fits your schedule.",
    locationLabel: "Departure",
    addressLine1: ADDRESS_LINE_1,
    addressLine2: ADDRESS_LINE_2,
    phoneLabel: "Questions?",
    phoneValue: PHONE_NUMBER,
  },
  form: {
    method: "post",
    action: "/api/intro-flight",
    onsubmit:
      "event.preventDefault(); alert('Demo intro flight form — connect to /api/intro-flight');",
    fields: [
      // row 1
      {
        id: "name",
        label: "Name",
        placeholder: "Your Name",
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
        id: "preferredDateTime",
        label: "Preferred Date & Time",
        required: true,
        type: "datetime-local",
        row: 2,
      },
      {
        id: "notes",
        label: "Notes",
        placeholder: "Any questions, requests, or occasion?",
        required: false,
        type: "textarea",
        rows: 4,
        row: 5,
      },
    ],
    cta: "Request Booking",
  },
};

export default discoveryData;
