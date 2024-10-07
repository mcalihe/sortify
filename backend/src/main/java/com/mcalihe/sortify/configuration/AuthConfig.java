package com.mcalihe.sortify.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "sortify.auth")
public class AuthConfig {
    private String clientId;
    private String loginUrl;
    private String redirectUrl;
    private String tokenEndpoint;
    private String scopes;
}
