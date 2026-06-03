# RSVP → Google Таблица

Ответы гостей с сайта сохраняются в Google Таблицу через Apps Script.

## 1. Создать таблицу

1. Откройте [Google Таблицы](https://sheets.google.com).
2. Создайте пустую таблицу.
3. Переименуйте файл, например: `RSVP — Алексей и Валентина`.
4. Первый лист назовите **`RSVP`** (точное имя).
5. В строке 1 укажите заголовки:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Дата и время | Имя | Присутствие | Гостей | Комментарий | Источник |

## 2. Установить скрипт

1. **Расширения** → **Apps Script**.
2. Вставьте код из [`google-apps-script/rsvp-webhook.gs`](../google-apps-script/rsvp-webhook.gs).
3. Замените `WEBHOOK_SECRET` на длинную случайную строку.
4. Сохраните и авторизуйте проект.

## 3. Развернуть веб-приложение

1. **Развернуть** → **Новое развертывание** → **Веб-приложение**.
2. Запуск от имени: **я**.
3. Доступ: **Все**.
4. Скопируйте URL (формат `.../exec`).

## 4. Настроить сайт

Создайте `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SHEETS_SECRET=ваш-секрет-из-скрипта
```

На Vercel добавьте те же переменные в Environment Variables.

## 5. Тестирование

### Тест скрипта (PowerShell)

```powershell
$body = @{
  secret = "ваш-секрет"
  name = "Тест Иванов"
  attendance = "yes"
  guests = "2"
  comment = "Проверка"
  source = "manual-test"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://script.google.com/macros/s/XXXX/exec" -Method Post -Body $body -ContentType "application/json"
```

Ожидание: новая строка в таблице.

### Тест API сайта

```powershell
$body = @{
  name = "Мария Тестова"
  attendance = "yes"
  guests = "1"
  comment = "Через API"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/rsvp" -Method Post -Body $body -ContentType "application/json"
```

### Тест формы

1. `npm run dev`
2. Откройте http://localhost:3000
3. Заполните форму в секции «Подтвердите присутствие»
4. Проверьте строку в таблице

## 6. Синхронизация

Отдельной синхронизации нет: каждая отправка сразу добавляет строку.

- Уведомления: **Инструменты** → **Уведомления** → любые изменения.
- Совместный доступ: **Настройки доступа** → email координатора.
- Фильтр гостей: колонка «Присутствие» = «Приду».

## 7. Типичные проблемы

| Симптом | Решение |
|---------|---------|
| Строка не появляется | Лист `RSVP`, новое развертывание, URL `/exec` |
| 401 / Unauthorized | Секрет в `.env` = `WEBHOOK_SECRET` в скрипте |
| 403 | Доступ веб-приложения: **Все** |
| На Vercel не работает | Env в Production + redeploy |
| Форма: «временно недоступна» | Заполните `GOOGLE_SHEETS_*` в `.env.local` |

## 8. Безопасность

- Не публикуйте секрет в Git.
- Не вызывайте URL скрипта из браузера — только через `/api/rsvp`.
- Таблицу не открывайте для всего интернета без необходимости.
