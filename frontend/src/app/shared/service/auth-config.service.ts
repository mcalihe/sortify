import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

const AUTH_CONFIG_URL = '/api/auth-config';

export interface AuthConfig {
    clientId: string;
    loginUrl: string;
    redirectUrl: string;
    tokenEndpoint: string;
    scopes: string;
}

@Injectable({ providedIn: 'root' })
export class AuthConfigService {
    private httpClient = inject(HttpClient);
    private _config?: AuthConfig = undefined;

    get config() {
        return this._config!;
    }

    public loadConfig() {
        return forkJoin([
            this.httpClient.get<AuthConfig>(AUTH_CONFIG_URL).pipe(
                map((config) => {
                    this._config = config;
                }),
            ),
        ]);
    }
}
