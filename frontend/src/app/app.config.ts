import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthConfigService } from './shared/service/auth-config.service';
import { authHeaderInterceptor } from './shared/interceptors/auth-header.interceptor';

function appLoadFactory(authConfigService: AuthConfigService) {
    console.log('GET CONFIG');
    return () => authConfigService.loadConfig();
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
    ],
};
