import {
    APP_INITIALIZER,
    ApplicationConfig,
    InjectionToken,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
    AuthConfig,
    AuthConfigService,
} from './shared/service/auth-config.service';
import { authHeaderInterceptor } from './shared/interceptors/auth-header.interceptor';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AuthConfig');

function appLoadFactory(authConfigService: AuthConfigService) {
    return () => firstValueFrom(authConfigService.loadConfig());
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authHeaderInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: appLoadFactory,
            deps: [AuthConfigService],
            multi: true,
        },
        {
            provide: AUTH_CONFIG,
            useFactory: (authConfigService: AuthConfigService) =>
                authConfigService.config,
            deps: [AuthConfigService],
        },
    ],
};
