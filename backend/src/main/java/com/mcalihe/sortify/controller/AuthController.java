package com.mcalihe.sortify.controller;

import com.mcalihe.sortify.service.SpotifyAuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public final class AuthController {
    private final SpotifyAuthService spotifyAuthService;

    public AuthController(final SpotifyAuthService spotifyAuthService) {
        this.spotifyAuthService = spotifyAuthService;
    }

    @GetMapping("login")
    public String getLoginLink() {
        return spotifyAuthService.createAuthLink();
    }
}
