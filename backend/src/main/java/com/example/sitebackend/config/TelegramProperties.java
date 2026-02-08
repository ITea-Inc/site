package com.example.sitebackend.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "telegram.bot")
@RequiredArgsConstructor
@Getter
@Validated
public class TelegramProperties {
    @NotBlank
    private final String token;
    @NotBlank
    private final String chatId;
}
