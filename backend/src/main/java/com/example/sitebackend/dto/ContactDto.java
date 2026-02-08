package com.example.sitebackend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactDto {

    @Email(message = "Некорректный формат почты")
    @NotBlank(message = "Поле email не может быть пустым")
    @Schema(description = "Email клиента", example = "ivan@gmail.com")
    private String email;


    @NotBlank(message = "Нельзя отправить пустое письмо")
    @Schema(description = "Текст сообщения", example = "Хочу купить сайт")
    private String body;
}
