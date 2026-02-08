package com.example.sitebackend;

import com.example.sitebackend.config.MailProperties;
import com.example.sitebackend.config.TelegramProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableConfigurationProperties({TelegramProperties.class, MailProperties.class})
public class SiteBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SiteBackendApplication.class, args);
    }
}
