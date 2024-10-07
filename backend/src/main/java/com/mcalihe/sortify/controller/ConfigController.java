package com.mcalihe.sortify.controller;

import com.mcalihe.sortify.configuration.AuthConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigController {

    private final AuthConfig authConfig;

    public ConfigController(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @GetMapping("/auth-config")
    public AuthConfig getAuthConfig() {
        return authConfig;
    }
}
