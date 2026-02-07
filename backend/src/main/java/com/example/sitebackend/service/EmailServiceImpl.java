package com.example.sitebackend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String myEmail;

    @Override
    @Async
    public void sendRequest(String senderEmail, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(myEmail);
            message.setTo(myEmail);
            message.setSubject("Заявка от: " + senderEmail);
            message.setText("Почта клиента: " + senderEmail + "\n\nСообщение:\n" + body);
            message.setReplyTo(senderEmail);

            mailSender.send(message);

            log.info("Письмо от {} успешно отправлено!", senderEmail);

        } catch (MailException e) {
            log.error("Ошибка при отправке письма от {}: {}", senderEmail, e.getMessage());
        }
    }
}