import 'zone.js/node';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serverRoutes } from './serverRoutes'; // type reference only

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

// Initialize Angular SSR engine (empty constructor)
const angularApp = new AngularNodeAppEngine();

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false
  })
);

/**
 * Handle all other requests with Angular SSR
 * Dynamic routes like members/:username are SSR-only
 * Static routes are prerendered during build
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then(response => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch(next);
});

// Start server if this module is the main entry point
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Export request handler for Angular CLI dev-server / prerender
export const reqHandler = createNodeRequestHandler(app);
