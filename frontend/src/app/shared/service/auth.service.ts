import { inject, Injectable } from '@angular/core';
import { AUTH_CONFIG } from '../../app.config';

const generateRandomString = (length: number) => {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authConfig = inject(AUTH_CONFIG);

    public getToken(code: string) {
        return localStorage.getItem('access_token');
    }

    public async login() {
        console.log(this.authConfig);

        const codeVerifier = this.getCodeVerifier();
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);
        const authUrl = new URL(this.authConfig.loginUrl);

        const params = {
            response_type: 'code',
            client_id: this.authConfig.clientId,
            scope: this.authConfig.scopes,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: this.authConfig.redirectUrl,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    public async checkAccess() {
        if (this.isTokenValid()) {
            return true;
        }

        if (await this.tryRefreshToken()) {
            return true;
        }

        const urlParams = new URLSearchParams(window.location.search);

        let code = urlParams.get('code');
        if (code) {
            const authResponse = await this.requestAccessToken(code);
            this.setAuthStorage(authResponse);
            return true;
        }

        return false;
    }

    private isTokenValid() {
        let expiryDate = localStorage.getItem('expiry_date');

        return expiryDate != null && new Date(expiryDate) > new Date();
    }

    private async tryRefreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
            return await this.requestTokenWithRefreshToken(refreshToken);
        }

        return false;
    }

    private getCodeVerifier() {
        let codeVerifier = localStorage.getItem('code_verifier');
        if (!codeVerifier) {
            codeVerifier = generateRandomString(64);
            window.localStorage.setItem('code_verifier', codeVerifier);
        }

        return codeVerifier;
    }

    private async requestAccessToken(
        code: string,
    ): Promise<AccessTokenResponse> {
        const codeVerifier = this.getCodeVerifier();

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.authConfig.clientId,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.authConfig.redirectUrl,
                code_verifier: codeVerifier,
            }),
        };

        const body = await fetch(this.authConfig.tokenEndpoint, payload);
        const response = (await body.json()) as AccessTokenResponse;
        return response;
    }

    private async requestTokenWithRefreshToken(refreshToken: string) {
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.authConfig.clientId,
            }),
        };
        const body = await fetch(this.authConfig.tokenEndpoint, payload);
        const response = (await body.json()) as AccessTokenResponse;
        this.setAuthStorage(response);

        return true;
    }

    private setAuthStorage(authResponse: AccessTokenResponse) {
        console.log('setAuthStorage');

        localStorage.setItem('access_token', authResponse.access_token);
        const expiryDate = new Date();
        expiryDate.setSeconds(
            expiryDate.getSeconds() + authResponse.expires_in - 10,
        );
        localStorage.setItem('expiry_date', expiryDate.toString());
        localStorage.setItem('scope', authResponse.scope);
        localStorage.setItem('refresh_token', authResponse.refresh_token);
        localStorage.setItem('token_type', authResponse.token_type);
    }
}
