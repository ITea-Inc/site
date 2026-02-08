package com.example.sitebackend.controller;

import com.example.sitebackend.dto.ContactDto;
import com.example.sitebackend.service.RequestService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

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
@Tag(name = "Заявки с сайта", description = "Методы для работы с формой обратной связи")
public class ContactController {
    private final RequestService requestService;

    @PostMapping
    @Operation(
            summary = "Отправить заявку",
            description = "Принимает email и текст, отправляет уведомление в Telegram админу и письмо клиенту."
    )
    public ResponseEntity<Map<String, String>> sendContact(@Valid @RequestBody ContactDto contactDto) {
        requestService.processNewRequest(contactDto.getEmail(), contactDto.getBody());
        return ResponseEntity.ok(Map.of("message", "success"));
    }
}
