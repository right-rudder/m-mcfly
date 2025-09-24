import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_NUMBER } from "../../consts";

const contactData = {
  eyebrow: "Contact Us",
  heading: "Let’s Plan Your Flight",
  subheading:
    "Contact our school today for expert guidance, program details, and professional advice to start your journey toward mastering the skies.",
  info: {
    title: "Give Us A Call Or Drop By Our Place",
    intro:
      "We’re here to assist you with any questions or to help you get started on your aviation journey.",
    locationLabel: "Our Location",
    addressLine1: ADDRESS_LINE_1,
    addressLine2: ADDRESS_LINE_2,
    phoneLabel: "Phone Number",
    phoneValue: PHONE_NUMBER,
  },
  form: {
    method: "post",
    action: "#",
    onsubmit:
      "event.preventDefault(); alert('This is a demo form. Hook it up to your endpoint.');",
    fields: [
      // row 1
      { id: "fname", label: "First Name", placeholder: "Marty", required: true, type: "text", row: 1 },
      { id: "lname", label: "Last Name", placeholder: "McFly", required: true, type: "text", row: 1 },
      // row 2
      { id: "email", label: "Email", placeholder: "example@yourmail.com", required: true, type: "email", row: 2, inputmode: "email" },
      { id: "phone", label: "Phone Number", placeholder: "+1 234 567 8910", required: true, type: "tel", row: 2, inputmode: "tel" },
      // row 3
      { id: "message", label: "Message", placeholder: "Write your message here...", required: true, type: "textarea", rows: 6, row: 3 },
    ],
    cta: "Send Message",
  },
};

export default contactData;
