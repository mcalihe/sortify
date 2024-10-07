import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export function hasValidTokenGuard(): CanActivateFn {
    return async () => {
        const oauthService: AuthService = inject(AuthService);

        if (await oauthService.checkAccess()) {
            return true;
        }

        await oauthService.login();
        return false;
    };
}
