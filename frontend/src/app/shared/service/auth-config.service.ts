import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin, map } from 'rxjs';

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
    private _config?: AuthConfig;
    private _loadPromise?: Promise<AuthConfig>;

    public loadConfig() {
        console.log('loadConfig');

        if (this._loadPromise) return this._loadPromise;

        this._loadPromise = firstValueFrom(
            this.httpClient.get<AuthConfig>(AUTH_CONFIG_URL).pipe(
                map((config) => {
                    this._config = config;
                    return config;
                }),
            ),
        );

        return this._loadPromise;
    }

    async getConfigAsync(): Promise<AuthConfig> {
        if (this._config) return this._config;
        if (this._loadPromise) return this._loadPromise;
        throw new Error(
            'Config not yet loading! You forgot to call loadConfig() early.',
        );
    }
}
