import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { TokenInterceptor } from './app/shared/interceptors/token.interceptor';
import { errorHandlerInterceptor } from './app/shared/interceptors/error-handler.interceptor';
import { MessageService } from 'primeng/api';
import { cookiesInterceptor } from './app/shared/interceptors/cookies.interceptor';
import { loaderInterceptor } from './app/shared/interceptors/loader.interceptor';
import { exceptionLoaderInterceptor } from './app/shared/interceptors/exception-loader.interceptor';
import { provideDefaultClient } from './api/providers';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideDefaultClient({ basePath: environment.BACK_URL }),
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptors([TokenInterceptor, cookiesInterceptor, errorHandlerInterceptor, exceptionLoaderInterceptor, loaderInterceptor])), // errorHandlerInterceptor
        MessageService,
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};
