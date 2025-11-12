import { RenderMode, ServerRoute } from '@angular/ssr';

// If you're on Node 16 or older, uncomment the next line and install node-fetch:
// import fetch from 'node-fetch';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'members/:username',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        // Replace with your real API URL
        const res = await fetch('http://localhost:5000/api/users');

        if (!res.ok) {
          console.warn(`⚠️ Failed to fetch members (status ${res.status}).`);
          return [];
        }

        const members = await res.json();

        // Map each username for prerendering
        return members.map((m: any) => ({ username: m.username }));
      } catch (error) {
        console.error('❌ Error fetching member list for prerendering:', error);
        // Return an empty list so the build does not crash
        return [];
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
