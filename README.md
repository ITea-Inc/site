# Frontend part

### To start frontend of our site you need to open terminal and:
1) `cd site`
2) `cd frontend`
3) `npm install` if you haven`t npm modules on your PC (You need to install Node.js before. Install guide: https://timeweb.cloud/tutorials/nodejs/kak-ustanovit-node-js-na-windows)
4) `npm start
5) When you finish: `Ctrl+C` to stop

# Backend part
# 📬 Site Backend — Contact Form Service

> Бэкенд для сайта веб-студии на **Spring Boot**.  
> Обрабатывает заявки с формы обратной связи: уведомляет команду в **Telegram** и отправляет подтверждение клиенту на **Email**.

---

## 💡 О проекте

Когда потенциальный клиент заполняет форму на сайте — его заявка не должна потеряться. Этот сервис гарантирует, что каждый запрос:

1. Мгновенно валидируется на сервере
2. Отправляет уведомление команде в **Telegram-бот**
3. Отправляет письмо обратно **клиенту** через Gmail SMTP
4. Защищён от спама через **Rate Limiting** (3 запроса в минуту с одного IP)
5. Покрыт **unit-тестами** (JUnit 5 + Mockito)

Оба уведомления (Telegram + Email) выполняются **асинхронно** — клиент получает ответ мгновенно, не ожидая завершения сетевых вызовов.

---

## ⚙️ Технологии

| Технология | Назначение |
|---|---|
| **Java 21** | Основной язык |
| **Spring Boot 3.5** | Фреймворк |
| **Spring Mail** | Отправка email через SMTP |
| **Spring Validation** | Валидация входящих данных (`@Valid`) |
| **Spring Async** | Асинхронное выполнение уведомлений |
| **RestTemplate** | HTTP-вызовы к Telegram Bot API |
| **SpringDoc OpenAPI (Swagger)** | Автодокументация API |
| **spring-dotenv** | Загрузка переменных окружения из `.env` |
| **Lombok** | Устранение boilerplate-кода |
| **JUnit 5 + Mockito** | Unit-тестирование |
| **Maven** | Сборка проекта |


---

## 🚀 Запуск проекта

### 1. Требования

- **Java 21+**
- **Maven 3.8+**


### 2. Запуск

```bash
# Frontend
cd frontend
npm install
npm start

# Backend (в отдельном терминале)
cd backend
./mvnw spring-boot:run
```

Сервер запустится на **http://localhost:8080**  
Swagger UI: **http://localhost:8080/swagger-ui.html**

### 3. Запуск тестов

```bash
cd backend
./mvnw test
```

---

## 📡 API Reference

### `POST /api/contact`

Принимает заявку с сайта. Запускает отправку уведомлений в Telegram и на Email **асинхронно**.

**Заголовки:**
```
Content-Type: application/json
```

**Тело запроса:**
```json
{
  "email": "client@example.com",
  "body": "Хочу заказать сайт для своего бизнеса"
}
```

**Успешный ответ `200 OK`:**
```json
{
  "message": "success"
}
```

**Ошибка валидации `400 Bad Request`:**
```json
{
  "email": "Некорректный формат почты",
  "body": "Нельзя отправить пустое письмо"
}
```

**Rate Limit превышен `429 Too Many Requests`:**
```json
{
  "error": "Слишком много запросов. Попробуйте через минуту."
}
```

**Пример через curl:**
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "client@example.com", "body": "Хочу заказать сайт"}'
```

---

## 🏗️ Архитектурные решения

### Асинхронность через `@Async`

Отправка в Telegram и отправка Email — это сетевые вызовы, которые могут занять 1–3 секунды. Если делать их синхронно, клиент будет ждать. Вместо этого оба вызова помечены `@Async` и выполняются в фоновом пуле потоков:

```
POST /api/contact
    → RequestServiceImpl.processNewRequest()
        → telegramService.sendMessage()   ← выполняется в фоне (Async-1)
        → emailService.sendRequest()      ← выполняется в фоне (Async-2)
    ← 200 OK  (мгновенно, не ждёт завершения сетевых вызовов)
```

Пул потоков настроен в `AsyncConfig`: 2 постоянных потока, максимум 5, очередь на 20 задач — оптимально для низкой нагрузки.

### Rate Limiting без сторонних библиотек

Защита от спама реализована вручную через `javax.servlet.Filter`. Для каждого IP хранится очередь временных меток запросов. При каждом новом запросе из очереди удаляются метки старше 60 секунд, и если оставшихся меньше 3 — запрос пропускается. Работает корректно за reverse-proxy (читает `X-Forwarded-For`).

```
IP: 192.168.1.1
  Запрос 1 (00:00) → [00:00]             → ✅ Пропущен
  Запрос 2 (00:20) → [00:00, 00:20]      → ✅ Пропущен
  Запрос 3 (00:40) → [00:00, 00:20, 00:40] → ✅ Пропущен
  Запрос 4 (00:50) → [00:00, 00:20, 00:40] → ❌ 429
  Запрос 5 (01:05) → [00:20, 00:40]      → ✅ Пропущен (00:00 устарел)
```

### Типизированные настройки (`@ConfigurationProperties`)

Переменные окружения не разбросаны по коду через `@Value`. Вместо этого они собраны в типизированные классы с валидацией `@NotBlank` — при старте приложения Spring сразу сообщит, если какая-то переменная не задана, а не в момент первого запроса:

```java
@ConfigurationProperties(prefix = "telegram.bot")
public class TelegramProperties {
    @NotBlank
    private final String token;   // Обязательно, иначе приложение не стартует
    @NotBlank
    private final String chatId;
}
```


```java
// В тесте — мок, не реальный SMTP
@Mock EmailService emailService;

// В проде — реальная отправка через Gmail
@Service class EmailServiceImpl implements EmailService { ... }
```

---

## 🧪 Тесты

Проект покрыт unit-тестами с использованием **JUnit 5** и **Mockito**. Реальные внешние зависимости (SMTP, Telegram API) не поднимаются — они подменяются моками.

| Тест-класс | Что проверяет |
|---|---|
| `RateLimitFilterTest` | Пропускает первые 3 запроса, блокирует 4-й; не блокирует GET и другие URI |
| `EmailServiceImplTest` | Формирует корректный `SimpleMailMessage`; не бросает исключение при сбое SMTP |
| `TelegramServiceImplTest` | Вызывает правильный URL Telegram API; не бросает исключение при сетевой ошибке |
| `RequestServiceImplTest` | Вызывает оба сервиса; сообщение в Telegram содержит email и текст заявки |


---

*Бэкенд написан на Spring Boot 3.5 + Java 21. Без лишних зависимостей — только то, что нужно.*
