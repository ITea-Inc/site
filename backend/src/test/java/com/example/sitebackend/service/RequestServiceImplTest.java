package com.example.sitebackend.service;

import com.example.sitebackend.service.EmailService;
import com.example.sitebackend.service.RequestServiceImpl;
import com.example.sitebackend.service.TelegramService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RequestServiceImplTest {

    @Mock
    TelegramService  telegramService;

    @Mock
    EmailService emailService;

    @InjectMocks
    RequestServiceImpl requestService;

    @Test
    void processNewRequest_validInput_callsBothServices() {
        String email = "person@example.com";
        String text = "Хочу у вас заказать сайт";

        requestService.processNewRequest(email, text);

        verify(emailService).sendRequest(email, text);

        ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);
        verify(telegramService).sendMessage(captor.capture());
        assertThat(captor.getValue()).contains(email);
        assertThat(captor.getValue()).contains(text);
    }



}
