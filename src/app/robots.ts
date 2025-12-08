import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://ptype.vercel.app/sitemap.xml', // Assuming Vercel deployment, user can update later
    };
}
