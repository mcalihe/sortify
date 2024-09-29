package com.mcalihe.sortify.service;

import java.net.URI;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SpotifyAuthService {
    private static final String clientId = "6ae14649b3354ca8914abb6854d6d2fc";
    private static final String[] scopes =
            new String[] {
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-private",
                "playlist-modify-public",
                "user-library-read",
                "user-library-modify",
            };
    private static final String redirectUri = "http://localhost:4200/login/success";

    public String createAuthLink() {
        URI uri =
                UriComponentsBuilder.fromUriString("https://accounts.spotify.com/authorize")
                        .queryParam("response_type", "code")
                        .queryParam("client_id", clientId)
                        .queryParam("scope", String.join(" ", scopes))
                        .queryParam("redirect_uri", redirectUri)
                        .queryParam("state", "code")
                        .build()
                        .toUri();

        return uri.toString();
    }
}
