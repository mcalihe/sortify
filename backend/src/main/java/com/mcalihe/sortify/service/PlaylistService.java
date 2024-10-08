package com.mcalihe.sortify.service;

import com.mcalihe.sortify.model.SpotifyPlaylistsResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class PlaylistService {
    private final RestClient spotifyClient;

    public PlaylistService() {
        spotifyClient = RestClient.create();
    }

    public SpotifyPlaylistsResponse getPlaylists(String authHeaderValue) {
        return this.spotifyClient
                .get()
                .uri("https://api.spotify.com/" + "v1/me/playlists")
                .header("Authorization", authHeaderValue)
                .retrieve()
                .body(SpotifyPlaylistsResponse.class);
    }
}
