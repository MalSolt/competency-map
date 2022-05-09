# Пошаговая инструкция для создания seed (заполнения dev базы данных)

> *на примере модуля competencies `src/modules/competencies`, далее под модулем имеется виду это папка*

1. Внутри модуля создаем файл seeder(название может быть произвольным) и data. В data лежат данные те что нужно записать в БД, а сам файл seeder запускает запись в БД
2. В файле модуля (`src/modules/competencies/competencies.module.ts`). В `providers` и `exports` добавляем наш созданиый seeder и все зависмости что нам нужны
3. В файле `src/modules/seeder` импортируем наш созданый seeder `src/modules/competencies/seeder`. И в методе seed вызываем его
