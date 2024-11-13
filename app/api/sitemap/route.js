// pages/api/sitemap.xml.js
import { format } from 'date-fns';

export default async function handler(req, res) {
    const BASE_URL = 'https://www.quinielaligamx.com';

    // Sample static paths - replace with your actual paths
    const staticPaths = [
        { loc: '/', changefreq: 'daily', priority: '1.0' }
    ];

    const urlElements = [...staticPaths].map((path) => {
        const lastmod = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"); // Current timestamp

        return `
            <url>
                <loc>${BASE_URL}${path.loc}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>${path.changefreq}</changefreq>
                <priority>${path.priority}</priority>
            </url>
        `;
    });

    // Generate XML string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlElements.join('')}
        </urlset>`;

    // Set headers for XML response
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).end(sitemap);
}
