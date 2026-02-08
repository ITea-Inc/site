package com.example.sitebackend.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "spring.mail")
@RequiredArgsConstructor
@Getter
@Validated
public class MailProperties {
    @NotBlank
    private final String username;
}
