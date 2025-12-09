import { ADDRESS_LINE_1, ADDRESS_LINE_2, LOCATIONS, PHONE_NUMBER } from "../../consts";

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
    gmapsLink: LOCATIONS[0].gMaps,
    phoneLabel: "Questions?",
    phoneValue: PHONE_NUMBER,
  },
  form: {
    method: "post",
    action: "/api/intro-flight",
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
      // row 3+
      // {
      //   id: "preferredDateTime",
      //   label: "Preferred Date & Time",
      //   required: true,
      //   type: "datetime-local",
      //   step: 1800,
      //   row: 3,
      // },
      { id: "preferredDate", label: "Preferred Date", required: true, type: "date", row: 3 },
      {
        id: "preferredTimePeriod",
        label: "Preferred Time",
        required: true,
        type: "select",
        row: 3,
        options: [
          { label: "Select a time period", value: "", disabled: true, selected: true, hidden: true },
          { label: "Morning (8:00–12:00)",   value: "morning" },
          { label: "Afternoon (12:00–16:00)", value: "afternoon" },
          { label: "Evening (16:00–20:00)",   value: "evening" },
        ],
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
