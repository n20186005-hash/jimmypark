import type { APIRoute } from 'astro';
import { seo } from '../data/attraction';

/**
 * Sitemap（建置時自動產生）
 *
 * 改為動態端點的目的：
 * 1. URL 一定與實際產生出來的頁面一致，不會出現 sitemap 指向 404；
 * 2. 與 astro.config 的 `trailingSlash: 'never'` 對齊，避免 sitemap 裡的網址
 *    與 Canonical 不一致，造成 Google 判定為重複頁面；
 * 3. 每次建置自動帶上 lastmod，方便 GSC 判斷內容更新。
 */
const pages: { path: string; changefreq: string; priority: string; images?: string[] }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0', images: [`${seo.url}${seo.image}`] },
  { path: '/route', changefreq: 'monthly', priority: '0.9' },
  { path: '/photo-guide', changefreq: 'monthly', priority: '0.9' },
  { path: '/food', changefreq: 'monthly', priority: '0.8' },
  { path: '/postcard', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = pages
    .map((page) => {
      const loc = `${seo.url}${page.path}`;
      const images = (page.images ?? [])
        .map((image) => `    <image:image>\n      <image:loc>${image}</image:loc>\n    </image:image>`)
        .join('\n');
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        images,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
