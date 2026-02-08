package com.example.sitebackend.service;

import com.example.sitebackend.config.TelegramProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class TelegramServiceImpl implements TelegramService {

    private final TelegramProperties telegramProperties;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    @Async
    public void sendMessage(String message) {
        try {
            String encodedText = URLEncoder.encode(message, StandardCharsets.UTF_8);

            String url = String.format(
                    "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s",
                    telegramProperties.getToken(), telegramProperties.getChatId(), encodedText
            );

            restTemplate.getForObject(url, String.class);

            log.info("Уведомление в телеграмм добавлено!");

        } catch (Exception e) {
            log.error("Ошибка отправки сообщения в телеграмм: {}", e.getMessage());
        }
    }
}
