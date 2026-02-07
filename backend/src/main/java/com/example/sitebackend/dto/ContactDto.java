package com.example.sitebackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactDto {
    @Email(message = "Некорректный формат почты")
    @NotBlank(message = "Поле email не может быть пустым")
    private String email;
    @NotBlank(message = "Нельзя отправить пустое письмо")
    private String body;
}
