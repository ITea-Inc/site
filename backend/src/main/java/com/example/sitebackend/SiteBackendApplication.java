package com.example.sitebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SiteBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiteBackendApplication.class, args);
    }

}
