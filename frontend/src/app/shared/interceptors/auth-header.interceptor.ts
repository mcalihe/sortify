import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export function authHeaderInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const authorizedReq = req.clone({
        headers: req.headers.set(
            'Authorization',
            `Bearer ${authService.getToken()}`,
        ),
    });
    return next(authorizedReq);
}
