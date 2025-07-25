import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Merge appConfig with provideHttpClient(withFetch()) for SSR compatibility
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch())
  ]
}).catch((err) => console.error(err));
