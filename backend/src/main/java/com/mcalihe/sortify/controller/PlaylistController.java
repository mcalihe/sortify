package com.mcalihe.sortify.controller;

import com.mcalihe.sortify.model.SpotifyPlaylistsResponse;
import com.mcalihe.sortify.service.PlaylistService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("playlist")
@SecurityRequirement(name = "Authorization")
public class PlaylistController {
    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("{id}")
    public UUID getPlaylist(@PathVariable UUID id) {
        return UUID.randomUUID();
    }

    @GetMapping
    public SpotifyPlaylistsResponse.SimplifiedPlaylistObject[] getPlaylists(
            @Parameter(hidden = true) @RequestHeader(value = HttpHeaders.AUTHORIZATION)
                    String authHeaderValue) {

        var playlistsResponse = playlistService.getPlaylists(authHeaderValue);
        assert playlistsResponse != null;
        return playlistsResponse.items.toArray(
                new SpotifyPlaylistsResponse.SimplifiedPlaylistObject[0]);
    }
}
