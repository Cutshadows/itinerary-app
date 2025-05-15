import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { BASE_API_URL } from './core/guards/base-url.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    {
      provide: BASE_API_URL,
      useValue: environment.apiUrl || 'http://localhost:3030/api',
    },
  ],
};
