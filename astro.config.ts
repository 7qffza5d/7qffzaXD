import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// Astro doesn't load .env into process.env while evaluating this file, so use loadEnv.
const env = { ...loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), ''), ...process.env };

// Fail the Vercel build rather than ship canonical/sitemap/RSS URLs pointing at localhost.
if (process.env.VERCEL && !env.SITE_URL) {
    throw new Error('SITE_URL is not set. Add it in Vercel → Settings → Environment Variables.');
}

export default defineConfig({
    site: env.SITE_URL ?? 'http://localhost:4321',
    adapter: vercel(),
    integrations: [sitemap()],
});