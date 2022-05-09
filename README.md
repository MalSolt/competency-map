# Competency Map

## Запуск проекта

### Весь проект в docker

- Переименовать .env.docker.example в .env: `cp .env.docker.example .env`
- Запустить проект: `docker-compose up`

### Запуск проекта когда в докере только база

#### Настройка
- Переименовать .env.client.example в client/.env: `cp .env.client.example client/.env`
- Переименовать .env.server.example в server/.env: `cp .env.server.example server/.env`
- Установить зависимости в папках client и server

#### Запуск
- Комманда для запуска сервера: `yarn dev:docker`
- Комманда для запуска клиента: `yarn dev`

### Запуск проекта без докера

#### Конфигурация
- Переименовать .env.server.example в server/.env: `cp .env.client.example server/.env`
- Переименовать .env.server.example в server/.env: `cp .env.server.example server/.env`
- Изменить .env сервера под настройки своей базы
- Установить зависимости в папках client и server

#### Запуск
- Комманда для запуска сервера: `yarn dev`
- Комманда для запуска клиента: `yarn dev`
