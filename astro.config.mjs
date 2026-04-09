// @ts-check
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify";
import { loadEnv } from "vite";
import vercel from "@astrojs/vercel";
const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
);

const projectId = SANITY_STUDIO_PROJECT_ID;
const dataset = SANITY_STUDIO_DATASET;


// https://astro.build/config
export default defineConfig({
  output: 'static',
  // adapter: netlify(),
  // adapter: node({ mode: "standalone" }),
  adapter: vercel(),
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
      },
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
    }),
    ,
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});