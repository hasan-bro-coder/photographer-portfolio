import { sanityClient } from "sanity:client";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import type { SanityImageObject } from "@sanity/image-url";

export async function getAllGallery(): Promise<GalleryPost[]> {
  return await sanityClient.fetch(
    groq`*[_type == "gallery" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getGallery(slug: string): Promise<GalleryPost> {
  return await sanityClient.fetch(
    groq`*[_type == "gallery" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface GalleryPost {
  _id: string;
  _type: "gallery";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string; // Required in schema
  slug: Slug;    // Required in schema
  detail: string; // Matches 'detail' field, required in schema
  publishedAt: string;
  mainImage: {
    _type: 'image';
    asset: ImageAsset;
    alt?: string;
    hotspot?: any; // Matches hotspot: true
  };
  gallery?: Array<{
    _key: string;
    _type: 'image';
    asset: ImageAsset;
    caption?: string;
    hotspot?: any;
  }>;
}