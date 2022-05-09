# Feature Sliced

## Структура проекта

└── src/\
&emsp;├── app/                    &emsp;&emsp;&emsp;&emsp;# Инициализирующая логика приложения\
&emsp;&emsp;├── index.tsx         &emsp;&emsp;# Энтрипоинт для подключения приложения\
&emsp;&emsp;└── index.css\
&emsp;├── pages/                  # Страницы\
&emsp;&emsp;├── {some-page}/      # (н-р страница ProfilePage)\
&emsp;&emsp;&emsp;├── lib/        &emsp;&emsp;&emsp;# Инфраструктурная-логика (хелперы)\
&emsp;&emsp;&emsp;├── model/      &emsp;&emsp;# Бизнес-логика\
&emsp;&emsp;&emsp;└── ui/         &emsp;&emsp;&emsp;# UI-логика\
&emsp;├── features/               &emsp;&emsp;&emsp;# Фичи\
&emsp;&emsp;├── {some-feature}/   # (н-р фича AuthByPhone)\
&emsp;&emsp;&emsp;├── lib/        &emsp;&emsp;&emsp;# Инфраструктурная-логика (хелперы)\
&emsp;&emsp;&emsp;├── model/      &emsp;&emsp;# Бизнес-логика\
&emsp;&emsp;&emsp;└── ui/         &emsp;&emsp;&emsp;# UI-логика\
&emsp;├── entities/               &emsp;&emsp;&emsp;# Бизнес сущности\
&emsp;&emsp;├── {some-feature}/   # (н-р сущность User)\
&emsp;&emsp;&emsp;├── lib/        &emsp;&emsp;&emsp;# Инфраструктурная-логика (хелперы)\
&emsp;&emsp;&emsp;├── model/      &emsp;&emsp;# Бизнес-логика\
&emsp;&emsp;&emsp;└── ui/         &emsp;&emsp;&emsp;# UI-логика\
&emsp;├── shared/                 &emsp;&emsp;&emsp;# Переиспользуемые модули (без отношения к бизнесу или к какой либо логике)\
&emsp;&emsp;├── api/        &emsp;&emsp;&emsp;#  Логика запросов к API\
&emsp;&emsp;├── config/      &emsp;&emsp;# Конфигурация приложения\
&emsp;&emsp;├── lib/         &emsp;&emsp;&emsp;# Инфраструктурная-логика приложения\
&emsp;&emsp;└── ui/         &emsp;&emsp;&emsp;# UIKit приложения\
&emsp;└── index.tsx               &emsp;&emsp;# Подключение и рендеринг приложения

## Реализация бизнес-логики

#### Pages

Здесь мы распологаем весь наш роутинг (все входные точки на страницу распологаются здесь)\
Например:

└── pages/\
&emsp;├── users/                  # Страница пользователей\
&emsp;&emsp;├── users.page.tsx   
&emsp;├── tasks/                  # Страница задач\
&emsp;&emsp;├── tasks.page.tsx

#### Features

Части функциональности, несущие ценность пользователю (грубо говоря все фичи, которые аффектят что-либо)\
К примеру, представленные ниже компоненту являются фичами:

&lt;ToggleTask /&gt; - (компонент) Пометить задачу выполненной / невыполненной\
&lt;TasksFilters/&gt; - (компонент) Задать фильтрацию для списка задач

#### Entites

Бизнес-сущности, на которых будет строится более высокоуровневая логика\
Например:

&lt;TaskCard /&gt; - (компонент) Карточка задачи, с отображением информации\
&lt;User /&gt; - (компонент) Юзер, с отображением его информации.

#### Shared​

Переиспользуемые общие модули, без привязки к предметной области\
Например:

&lt;Card /&gt; - (компонент) UIKit компонент\
&lt;Button /&gt; - (компонент) UIKit компонент\
&lt;Confirmation /&gt; - (компонент) модальное окно

## Небольшой пример

Благодаря слоистой структуре мы можем предсказуемо распреледять сложность приложения согласно зонам ответственности, т.е. слоям.

При этом более высокоуровневая логика строится на основание нижележащих слоев:

// (shared)&emsp;&emsp;&emsp;&emsp;&emsp;=> (entities)  + (features)&emsp;&emsp;&emsp;  => (pages)\
&lt;Card> + &lt;Checkbox&gt; => &lt;TaskCard/&gt; + &lt;ToggleTask/&gt;  => &lt;TaskPage/&gt;

## Больше информации 

https://feature-sliced.design/

