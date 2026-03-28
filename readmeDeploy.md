# Руководство по развертыванию (React + Spring Boot)

В этом документе описан пошаговый процесс развертывания проекта на VPS-сервере (Ubuntu).

## 1. Сборка
Выполняется сборка обеих частей приложения на локальном компьютере:

**Бэкенд (Spring Boot):**
```bash
cd backend
mvn clean package
```
*(В результате появится файл `backend/target/site-backend-0.0.1-SNAPSHOT.jar`)*

**Фронтенд (React):**
```bash
cd frontend
npm install
npm run build
```
*(В результате появится папка `frontend/build/` со статическими файлами)*

## 2. Настройка VPS (Ubuntu)
Подключение к серверу по SSH и установка необходимого программного обеспечения:
```bash
ssh root@IP_СЕРВЕРА
sudo apt update
# Установка Nginx (веб-сервер) и Java 21 (целевая версия JDK)
sudo apt install nginx openjdk-21-jre-headless -y
```

## 3. Перенос файлов на сервер
Копирование собранных файлов с локального компьютера на сервер выполняется с помощью `scp`:
```bash
# Копирование бэкенда
scp backend/target/site-backend-0.0.1-SNAPSHOT.jar root@IP_СЕРВЕРА:/opt/site-backend.jar

# Копирование статики фронтенда
scp -r frontend/build root@IP_СЕРВЕРА:/var/www/site-frontend
```

## 4. Настройка безопасного хранения секретов (.env)
Использование библиотеки `spring-dotenv` позволяет вынести секретные конфигурации из кода.

1. Создание конфигурационного файла:
   ```bash
   sudo nano /opt/.env
   ```
2. Конфигурация параметров `Telegram` и `Mail` (необходимо указать актуальные ключи доступа):
   ```env
   TELEGRAM_BOT_TOKEN=ТОКЕН_БОТА
   TELEGRAM_CHAT_ID=CHAT_ID_ПОЛУЧАТЕЛЯ
   MAIL_USERNAME=ПОЧТА_ОТПРАВИТЕЛЯ_GMAIL
   MAIL_PASSWORD=ПАРОЛЬ_ПРИЛОЖЕНИЯ
   ```
3. Сохранение файла.

## 5. Автозапуск бэкенда (systemd)
Создание системы инициализации гарантирует фоновую работу бэкенда и автоматический перезапуск приложения.

1. Создание файла службы:
   ```bash
   sudo nano /etc/systemd/system/site-backend.service
   ```
2. Размещение конфигурации запуска:
   ```ini
   [Unit]
   Description=Spring Boot Site Backend
   After=syslog.target network.target

   [Service]
   User=root
   # Указание рабочей директории для корректного чтения файла /opt/.env
   WorkingDirectory=/opt
   ExecStart=/usr/bin/java -jar /opt/site-backend.jar
   SuccessExitStatus=143
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```
3. Перезагрузка списка сервисов и запуск бэкенда
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable site-backend
   sudo systemctl start site-backend
   ```
4. Проверка корректности работы сервиса (ожидаемый статус: `active (running)`):
   ```bash
   sudo systemctl status site-backen
   ```

## 6. Настройка Nginx (Фронтенд + Прокси)
Настройка Nginx для раздачи статических файлов React и проксирования API-вызовов на бэкенд.

1. Открытие файла конфигурации:
   ```bash
   sudo nano /etc/nginx/sites-available/site
   ```
2. Внесение конфигурации:
   ```nginx
   server {
       listen 80;
       server_name IP_СЕРВЕРА_ИЛИ_ДОМЕН;

       # Раздача статики React
       location / {
           root /var/www/site-frontend;
           index index.html index.htm;
           try_files $uri $uri/ /index.html;
       }

       # Проксирование API-вызовов на локальный порт 8080
       location /api/ {
           proxy_pass http://localhost:8080/api/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
3. Активация сайта и перезапуск веб-сервера:
   ```bash
   sudo rm /etc/nginx/sites-enabled/default
   sudo ln -s /etc/nginx/sites-available/site /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

**Деплой завершен.** Приложение доступно по IP-адресу или домену сервера.
