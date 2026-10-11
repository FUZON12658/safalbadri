import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: SITE_URL + p.href,
    changeFrequency: 'monthly',
    priority: p.key === 'home' ? 1 : 0.7,
  }));
}
