package com.example.sitebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.username}")
    private String myEmail;

    @Override
    public void sendRequest(String senderEmail, String body) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(myEmail);
        message.setTo(myEmail);
        message.setSubject("Пользователь " + senderEmail + " хочет заказать сайт");
        message.setReplyTo(senderEmail);
        message.setText("Почта клиента: " + senderEmail + "\n\n" + body);
    }
}
