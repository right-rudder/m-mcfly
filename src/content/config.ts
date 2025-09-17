import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // type: "content" // optional; defaults to "content"
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Use a plain string so your slug/list pages can do <img src={heroImage}>
    // (supports /public paths or full URLs)
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});


const trainings = defineCollection({
  schema: z.object({
      path: z.string().optional(),
      title: z.string(),
      shortTitle: z.string().optional(),
      tagline: z.string().optional(),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Professional"]),
      durationWeeks: z.string().optional(),
      minFlightHours: z.string().optional(),

      summary: z.string(),

      // Accept either Astro image() or {src, alt} object
      heroImage: z.object({ src: z.string(), alt: z.string() }).optional(),

      // Support object-style stats or legacy array-of-label/value
      stats: z
        .union([
          z.object({
            programLength: z.string(),
            flightHours: z.string(),
          }),
          z.array(
            z.object({
              label: z.string(),
              value: z.string(),
            }),
          ),
        ])
        .optional(),

      // structure: [{ heading, items: [{ title, points: [..] }] }]
      structure: z
        .array(
          z.object({
            heading: z.string(),
            items: z.array(
              z.object({
                title: z.string(),
                points: z.array(z.string()).default([]),
              }),
            ),
          }),
        )
        .optional(),

      benefits: z.array(z.string()).optional(),
      assessments: z.array(z.string()).optional(),
      entryRequirements: z.array(z.string()).optional(),
      outcomes: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, trainings };
