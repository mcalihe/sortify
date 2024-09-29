package com.mcalihe.sortify.controller;

import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("playlist")
public class PlaylistController {
    @GetMapping("{id}")
    public UUID getPlaylist(@PathVariable UUID id) {
        return UUID.randomUUID();
    }

    @GetMapping
    public UUID[] getPlaylists() {
        return new UUID[] {UUID.randomUUID(), UUID.randomUUID()};
    }
}
