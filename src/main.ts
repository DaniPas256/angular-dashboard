import { provideHttpClient } from '@angular/common/http';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { App } from './app/app';
import { routes } from './app/app-routing-module';
import { UserResolve } from './app/features/user-data/resolvers/user-data.resolver';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    UserResolve,
  ],
})
  .catch((err) => console.error(err));
