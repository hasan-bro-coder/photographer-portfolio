// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { galleryType } from "./gallery";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryType],
};