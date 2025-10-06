// Schema.org structured data configuration for McFly Education
// This file contains reusable schema objects for SEO

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": "https://mcflyeducation.com/#organization",
  name: "McFly Education",
  description:
    "Flight training at Cable Airport in Upland, CA. Discovery flights, Private Pilot (PPL), Instrument Rating (IR), Commercial Pilot (CPL), and CFI/CFII — structured, safety-first training with steam-gauge aircraft.",
  url: "https://mcflyeducation.com/",
  image: "https://mcflyeducation.com/images/marty-mcfly-student.jpg",
  logo: "https://mcflyeducation.com/logo.png",
  telephone: "+1 (909) 262-5236",
  email: "info@mcflyeducation.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1749 W 13th St",
    addressLocality: "Upland",
    addressRegion: "CA",
    postalCode: "91786",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "34.1164",
    longitude: "-117.6484",
  },
  priceRange: "$$",
  areaServed: [
    {
      "@type": "City",
      name: "Upland",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
    {
      "@type": "City",
      name: "Claremont",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
    {
      "@type": "City",
      name: "Rancho Cucamonga",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
  ],
  hasMap: "https://maps.google.com/?q=1749+W+13th+St,+Upland,+CA+91786",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: "Discovery Flight",
        name: "Discovery / Intro Flight",
        description:
          "Hands-on intro flight with a certified instructor. Great for first-timers.",
        provider: {
          "@id": "https://mcflyeducation.com/#organization",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "EducationalOccupationalProgram",
        name: "Private Pilot License (PPL)",
        description:
          "12–24 weeks, minimum 40 hours. FAA-aligned ground & flight training.",
        provider: {
          "@id": "https://mcflyeducation.com/#organization",
        },
        timeToComplete: "P12W",
        occupationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Private Pilot License",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "EducationalOccupationalProgram",
        name: "Instrument Rating (IR)",
        description:
          "IFR training focused on procedures, approaches, and decision-making.",
        provider: {
          "@id": "https://mcflyeducation.com/#organization",
        },
        occupationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Instrument Rating",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "EducationalOccupationalProgram",
        name: "Commercial Pilot (CPL)",
        description:
          "Advanced maneuvers and professional standards for commercial privileges.",
        provider: {
          "@id": "https://mcflyeducation.com/#organization",
        },
        occupationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Commercial Pilot License",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "EducationalOccupationalProgram",
        name: "CFI / CFII",
        description:
          "Instructor training covering FOI, right-seat proficiency, and instrument instruction.",
        provider: {
          "@id": "https://mcflyeducation.com/#organization",
        },
        occupationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Certified Flight Instructor",
        },
      },
    },
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Training Aircraft",
      value: "Cessna 172M (steam gauges)",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+1 (909) 262-5236",
    areaServed: "US",
    availableLanguage: "English",
  },
};

export const INSTRUCTOR_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mcflyeducation.com/about#marty-mcfly",
  name: "Marty McFly",
  jobTitle: "Certified Flight Instructor (CFI/CFII)",
  description:
    "Marty is a people-first instructor who blends disciplined airmanship with an easygoing, hands-on style. He builds confidence fast by tailoring each lesson to the pilot in front of him.",
  worksFor: {
    "@id": "https://mcflyeducation.com/#organization",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certified Flight Instructor (CFI)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certified Flight Instructor - Instrument (CFII)",
    },
  ],
  knowsAbout: [
    "Flight Training",
    "Aviation Education",
    "Private Pilot Training",
    "Instrument Rating Training",
    "Commercial Pilot Training",
    "Flight Instructor Training",
  ],
  sameAs: [
    "https://www.instagram.com/1martymcfly/",
    "https://www.skool.com/mcfly-education-8588/about",
  ],
};

// Helper function to create breadcrumb schema
export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `https://mcflyeducation.com${item.url}` : undefined,
    })),
  };
}

// Helper function to create FAQ schema
export function createFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Helper function to create Course schema for training programs
export function createCourseSchema(training) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.name,
    description: training.description,
    provider: {
      "@id": "https://mcflyeducation.com/#organization",
    },
    teaches: training.teaches || [],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "In-person",
      location: {
        "@type": "Place",
        name: "Cable Airport",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1749 W 13th St",
          addressLocality: "Upland",
          addressRegion: "CA",
          postalCode: "91786",
          addressCountry: "US",
        },
      },
    },
    educationalCredentialAwarded: training.credential || training.name,
  };
}

// Helper function to create BlogPosting schema
export function createBlogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.pubDate,
    dateModified: post.updatedDate || post.pubDate,
    author: {
      "@type": "Person",
      name: post.author || "McFly Education",
    },
    publisher: {
      "@id": "https://mcflyeducation.com/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

// Helper function to create Website schema
export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mcflyeducation.com/#website",
    url: "https://mcflyeducation.com/",
    name: "McFly Education",
    description: "Flight training at Cable Airport in Upland, CA",
    publisher: {
      "@id": "https://mcflyeducation.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://mcflyeducation.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
