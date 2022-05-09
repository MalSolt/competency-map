# АРХИТЕКТУРА ПРИЛОЖЕНИЯ

В папке src должно быть 4 папки всег: app, widgets, shared, pages и controllers

- app: В папке app хранится все, что относится к app, все роуты, провайдеры и прочее.

- widgets: В папке widgets хранятся компоненты, которые взаимодействуют с сервером

- shared: В папке shared хранятся что-то общее для всего приложение, что можно переиспользвать, но не имеют в себе никаких запросов на сервер, работают только с входящими данными через      параметры функции, например: Компоненты, хуки, функции, хелперы, которые можно переиспользовать, но главное отличие shared от widgets в том, что в shared нет никаого взаимодействия с сервером

- pages: В папке pages хранятся станицы. Все, что нужно только на этой странице(компоненты, хуки, хелперы и прочее) делаем именно в этой папке, не выность в widgets или в shared ничего, если оно не понадобится нигде, кроме этой страницы

- controllers: В папке controllers хранятся react хуки которые работают с сервером (то есть используют react-query хуки). Использование react-query хуков вне папки controllers запрещается.