package com.example.sitebackend.service;

import com.example.sitebackend.config.MailProperties;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceImplTest {
    @Mock
    JavaMailSender javaMailSender;

    @Mock
    MailProperties mailProperties;

    @InjectMocks
    EmailServiceImpl emailServiceImpl;

    @Test
    void sendEmail_shouldSendGmail_withValidParameters() {
        String username = "username";
        when(mailProperties.getUsername()).thenReturn(username);

        String senderEmail = "senderEmail@wxample.com";
        String body = "body";

        emailServiceImpl.sendRequest(senderEmail, body);

        ArgumentCaptor<SimpleMailMessage> mailCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(javaMailSender).send(mailCaptor.capture());

        SimpleMailMessage mailMessage = mailCaptor.getValue();
        assertEquals(username, mailMessage.getFrom());
        assertThat(mailMessage.getTo()).containsExactly(username);
        assertEquals("Заявка от: " + senderEmail, mailMessage.getSubject());
        assertEquals("Почта клиента: " + senderEmail + "\n\nСообщение:\n" + body, mailMessage.getText());
        assertEquals(senderEmail, mailMessage.getReplyTo());

    }

    @Test
    void sendEmail_shouldNotThrowException_whenMailSenderFails() {
        doThrow(new MailSendException("Network error"))
                .when(javaMailSender).send(any(SimpleMailMessage.class));

        when(mailProperties.getUsername()).thenReturn("username");

        assertDoesNotThrow(() -> emailServiceImpl.sendRequest("test@example.com", "body"));
    }

}