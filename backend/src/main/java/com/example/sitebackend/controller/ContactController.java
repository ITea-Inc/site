package com.example.sitebackend.controller;

import com.example.sitebackend.dto.ContactDto;
import com.example.sitebackend.service.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<Map<String, String>> sendContact(@Valid @RequestBody ContactDto contactDto) {
        requestService.processNewRequest(contactDto.getEmail(), contactDto.getBody());
        return ResponseEntity.ok(Map.of("message", "success"));
    }
}
