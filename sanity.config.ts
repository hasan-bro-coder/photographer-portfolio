// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
// import {visionTool} from '@sanity/vision'
console.log("BROOOOOOOOOOOOOOOOOO", import.meta.env.SANITY_STUDIO_PROJECT_ID);

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  basePath: '/studio',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-projectID',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'your-projectID',
  plugins: [structureTool()],
  
//   plugins: [structureTool(), visionTool()],
  schema,
});
