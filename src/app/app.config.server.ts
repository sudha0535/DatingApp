import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Removed import of provideServerRoutesConfig and serverRoutes

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
    // Removed provideServerRoutesConfig(serverRoutes) because it's not available
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
