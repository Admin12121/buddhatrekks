import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://buddhatrekks.com";

const siteConfig = {
  name: "Buddha Trekks",
  title: "Buddha Trekks | Affordable Guided Treks and Travel Experiences in Nepal",
  description:
    "Buddha Trekks is a Nepal-based trekking and travel company helping tourists discover the best trekking destinations with affordable prices, highly qualified guides, joyful activities, and safe, memorable Himalayan adventures.",
  keywords: [
    "Buddha Trekks",
    "BuddhaTrekks",
    "trekking in Nepal",
    "Nepal travel agency",
    "guided treks Nepal",
    "affordable trekking Nepal",
    "Nepal adventure travel",
    "Everest Base Camp trek",
    "Annapurna Circuit trek",
    "Langtang Valley trek",
    "Manaslu Circuit trek",
    "licensed trekking guides Nepal",
    "Himalayan trekking tours",
  ],
  url: siteUrl,
  ogImage: "/images/everest.webp",
  social: {
    facebook: siteUrl,
    instagram: siteUrl,
    tiktok: siteUrl,
  },
};

const createAbsoluteUrl = (path: string = "/") =>
  new URL(path, siteConfig.url).toString();

const defaultOpenGraphImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
    locale: "en_NP",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const createPageMetadata = (
  title: string,
  description: string,
  path: string = "/",
  keywords?: string[],
): Metadata => {
  const url = createAbsoluteUrl(path);

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    openGraph: {
      siteName: siteConfig.name,
      url,
      type: "website",
      locale: "en_NP",
      title,
      description,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
};

export const createDestinationMetadata = (
  title: string,
  description: string,
  slug: string,
): Metadata => {
  const url = createAbsoluteUrl(`/destinations/${slug}`);
  const destinationKeywords = [
    title,
    `${title} Nepal`,
    `${title} trekking itinerary`,
    "best trekking destinations in Nepal",
    ...siteConfig.keywords,
  ];

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    title,
    description,
    keywords: destinationKeywords,
    openGraph: {
      siteName: siteConfig.name,
      url,
      type: "website",
      locale: "en_NP",
      title,
      description,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
};

export const createActivityMetadata = (
  title: string,
  description: string,
  slug: string,
): Metadata => {
  const url = createAbsoluteUrl(`/activities/${slug}`);
  const activityKeywords = [
    title,
    `${title} in Nepal`,
    "Nepal travel activities",
    "guided adventure activities Nepal",
    ...siteConfig.keywords,
  ];

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    title,
    description,
    keywords: activityKeywords,
    openGraph: {
      siteName: siteConfig.name,
      url,
      type: "website",
      locale: "en_NP",
      title,
      description,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
};

export const createServiceMetadata = createDestinationMetadata;
export const createProjectMetadata = createActivityMetadata;

export default siteConfig;
