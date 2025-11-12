import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Define SSR/prerender routes:
 * - Dynamic routes (members/:username) → RenderMode.Server
 *   Only rendered on the server, no prerender, avoids browser-only errors.
 * - Static routes → RenderMode.Prerender
 *   Can be prerendered safely at build time.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'members/:username',  // Dynamic member page
    renderMode: RenderMode.Server
  },
  {
    path: '',                   // Home page
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',              // Example static page
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',                 // Fallback / 404
    renderMode: RenderMode.Prerender
  }
];
