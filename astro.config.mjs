// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mcflyeducation.com/",
  integrations: [
    mdx(),
    sitemap({
      // Exclude confirmation and error pages from sitemap
      filter: (page) => {
        return (
          !page.includes("confirmation") &&
          !page.includes("/404") &&
          !page.includes("/500")
        );
      },
      // Customize priorities and change frequencies per page type
      serialize(item) {
        // Homepage - Highest priority, checked daily
        if (item.url === "https://mcflyeducation.com/") {
          item.changefreq = "daily";
          item.priority = 1.0;
        }
        // Discovery Flight - High conversion page
        else if (item.url.includes("/discovery-flight/")) {
          item.changefreq = "weekly";
          item.priority = 0.95;
        }
        // Trainings pages - Core service pages
        else if (item.url.includes("/trainings/")) {
          item.changefreq = "weekly";
          item.priority = 0.9;
        }
        // First Time Pilots - Important entry point
        else if (item.url.includes("/first-time-pilots")) {
          item.changefreq = "weekly";
          item.priority = 0.9;
        }
        // Contact & Enrollment - Conversion pages
        else if (
          item.url.includes("/contact") ||
          item.url.includes("/enrollment")
        ) {
          item.changefreq = "weekly";
          item.priority = 0.85;
        }
        // About pages - Brand pages
        else if (item.url.includes("/about")) {
          item.changefreq = "monthly";
          item.priority = 0.8;
        }
        // Blog posts - Content pages
        else if (item.url.includes("/blog/") && !item.url.endsWith("/blog/")) {
          item.changefreq = "monthly";
          item.priority = 0.6;
        }
        // Blog index
        else if (item.url.includes("/blog/")) {
          item.changefreq = "weekly";
          item.priority = 0.7;
        }
        // Privacy & legal pages
        else if (item.url.includes("/privacy")) {
          item.changefreq = "yearly";
          item.priority = 0.3;
        }
        // Default for other pages
        else {
          item.changefreq = "weekly";
          item.priority = 0.7;
        }

        // Set last modification date
        item.lastmod = new Date().toISOString();

        return item;
      },
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
