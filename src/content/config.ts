import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});


const trainings = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(),
      tagline: z.string().optional(),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Professional"]),
      durationWeeks: z.string().optional(),
      minFlightHours: z.string().optional(),

      summary: z.string(),

      // Accept either Astro image() or {src, alt} object
      heroImage: z
        .union([image(), z.object({ src: z.string(), alt: z.string() })])
        .optional(),

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
