package com.example.sitebackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestServiceImpl implements RequestService {
    private final TelegramService telegramService;
    private final EmailService emailService;


    @Override
    public void processNewRequest(String senderEmail, String text) {
        String adminMessage = "🔥 *НОВАЯ ЗАЯВКА*\n\n" +
                "📧 Почта: " + senderEmail + "\n" +
                "💬 Текст: " + text;

        telegramService.sendMessage(adminMessage);
        emailService.sendRequest(senderEmail, text);

        log.info("Заявка от {} обработана", senderEmail);
    }
}
