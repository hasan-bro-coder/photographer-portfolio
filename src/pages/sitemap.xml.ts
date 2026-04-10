import { getAllGallery } from "../utils/sanity"

export async function GET() {
  const baseURL = import.meta.env.BASE_URL;
  
  // Get all gallery items for sitemap
  const galleries = await getAllGallery();
  
  const staticPages = [
    '',
    '/gallery',
  ];
  
  const galleryPages = galleries?.map(g => `/gallery/${g.slug.current}`) || [];
  
  const allPages = [...staticPages, ...galleryPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map((page) => {
      const gallery = galleries?.find(g => page === `/gallery/${g.slug.current}`);
      const lastmod = gallery?._updatedAt ? new Date(gallery._updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      return `  <url>
    <loc>${baseURL}${page}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/gallery' ? '0.9' : '0.8'}</priority>
    ${
      gallery?.mainImage?.asset
        ? `<image:image>
      <image:loc>${gallery.mainImage.asset}</image:loc>
      <image:title>${gallery.title}</image:title>
    </image:image>`
        : ''
    }
  </url>`
    })
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
