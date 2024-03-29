## Содержание

- [Введение](#введение)
- [Предварительные требования](#предварительные-требования)
- [Начало работы](#начало-работы)
- [Структура проекта](#структура-проекта)
- [Использование](#использование)
- [Docker Compose](#docker-compose)

## Предварительные требования

Перед началом работы убедитесь, что выполнены следующие требования:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Java](https://www.oracle.com/java/)
- [Python](https://www.python.org/)

## Начало работы

**Если вы хотите запустить сразу все готовым то переходите к Docker Compose**

Для запуска проекта выполните следующие шаги:

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/dmitrykulakovfrontend/rlthack.git
   cd rlthack
   ```

1. Установите зависимости для фронтенда и запустите сервер, он будет доступен на http://localhost:3000/ (Сделано при помощи Next.js)

   ```bash
     cd frontend
     npm install
     npm run dev
   ```

1. Запустите сервер бэкенда, он будет доступен на http://localhost:8080/ (Сделано при помощи Java и Springboot)
   **Если вы хотите просто проверить работоспособность то советую перейти к Docker Compose ниже.**

   для работы это метода вам нужно будет создать файл в backend\src\main\resources\application.properties
   и вставить туда:
   ```
     spring.datasource.url=${DB_URL}
     spring.datasource.username=${DB_USERNAME}
     spring.datasource.password=${DB_PASSWORD}
    ```
   Затем вы можете запустить сервер:

   ```bash
     cd backend
     ./mvnw spring-boot:run
   ```

1. Установите зависимости для сервера с машинным обучением (Python Flask)

   ```bash
     cd ML

   ```

# Структура проекта

Вот обзор структуры директории проекта:

```scss
/
├── docker-compose.yaml
├── frontend/
│   ├── (Файлы фронтенда Next.js)
│   └── ...
├── backend/
│   ├── (Файлы бэкенда Spring Boot)
│   └── ...
├── ML/
│   ├── (Файлы сервера машинного обучения Python)
│   └── ...
└── ...

```

# Docker Compose

Вы можете использовать Docker Compose для запуска всего стека проекта. Убедитесь, что у вас установлен **Docker Compose** И/Или **Docker**.

```shell
# Из корневой директории проекта
docker-compose up --build

```

Это запустит контейнеры для фронтенда, бэкенда и будет использовать наше машинное обучение из облака, база данных также в таком случае будет браться из облака
