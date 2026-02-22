package com.example.sitebackend.service;

import com.example.sitebackend.config.TelegramProperties;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class TelegramServiceImplTest {
    @Mock
    TelegramProperties  telegramProperties;

    @Mock
    RestTemplate restTemplate;

    @InjectMocks
    TelegramServiceImpl telegramServiceImpl;

    @Test
    void sendMessage_shouldCallWithValidParameters() {
        when(telegramProperties.getToken()).thenReturn("test-token");
        when(telegramProperties.getChatId()).thenReturn("test-chat-id");

        String message = "test-message";

        telegramServiceImpl.sendMessage(message);

        ArgumentCaptor<String> urlCaptor = ArgumentCaptor.forClass(String.class);
        verify(restTemplate).getForObject(urlCaptor.capture(),
                eq(String.class),
                eq("test-token"),
                eq("test-chat-id"),
                eq(message));

        String url = urlCaptor.getValue();
        assertTrue(url.contains("/sendMessage"));
    }

    @Test
    void sendMessage_shouldThrow() {
        when(restTemplate.getForObject(any(),any(),any(Object[].class))).thenThrow(new RuntimeException("Network error"));

        assertDoesNotThrow(() -> telegramServiceImpl.sendMessage("Hello"));

    }
}