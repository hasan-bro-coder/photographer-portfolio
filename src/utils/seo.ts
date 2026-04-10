export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonicalURL?: string;
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
}

export function generateSEOMeta(props: SEOProps) {
  const {
    title,
    description,
    keywords = [],
    ogImage = 'https://photographer-portfolio-blush-theta.vercel.app/og-image.jpg',
    ogType = 'website',
    canonicalURL,
    author,
    publishedDate,
    updatedDate,
  } = props;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    ogImage,
    ogType,
    canonicalURL,
    author,
    publishedDate,
    updatedDate,
  };
}

export function generatePortfolioSchema(
  name: string,
  description: string,
  image: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: description,
    image: image,
    url: url,
    jobTitle: 'Professional Photographer',
    sameAs: [
      'https://instagram.com',
      'https://twitter.com',
      'https://linkedin.com',
    ],
  };
}

export function generateOrganizationSchema(
  name: string,
  description: string,
  url: string,
  image: string,
  email: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    description: description,
    url: url,
    image: image,
    email: email,
    priceRange: '$$',
    areaServed: 'BD',
    serviceType: 'Photography Services',
  };
}

export function generateGallerySchema(
  title: string,
  description: string,
  images: string[],
  url: string,
  datePublished: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description: description,
    url: url,
    datePublished: datePublished,
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      url: img,
    })),
  };
}

export function generateImageSchema(
  url: string,
  name: string,
  description: string,
  uploadDate: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: url,
    name: name,
    description: description,
    uploadDate: uploadDate,
    author: {
      '@type': 'Person',
      name: 'Hasanur Rahman',
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
