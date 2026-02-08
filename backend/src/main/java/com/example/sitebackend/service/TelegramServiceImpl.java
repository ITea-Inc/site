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
            String url = "https://api.telegram.org/bot{token}/sendMessage?chat_id={chatId}&text={text}";

            restTemplate.getForObject(url, String.class, telegramProperties.getToken(), telegramProperties.getChatId(), message);

            log.info("Уведомление в телеграмм отправлено!");

        } catch (Exception e) {
            log.error("Ошибка отправки сообщения в телеграмм: {}", e.getMessage());
        }
    }
}
