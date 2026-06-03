# Домен и SSL для свадебного приглашения

Проект — **Next.js 15** с API-маршрутом `/api/rsvp`. Для продакшена нужен хостинг с Node.js и HTTPS.

Рекомендуемый вариант: **[Vercel](https://vercel.com)** (бесплатный SSL Let's Encrypt, автоматическое обновление сертификата).

---

## 1. Репозиторий на GitHub

Код уже в репозитории:

`https://github.com/AlekseyM93/wedding_invitation`

---

## 2. Деплой на Vercel (домен + SSL)

### Шаг 1 — импорт проекта

1. Войдите на [vercel.com](https://vercel.com) через GitHub.
2. **Add New → Project** → выберите `wedding_invitation`.
3. Framework: **Next.js** (определится автоматически).
4. Root Directory: корень репозитория.

### Шаг 2 — переменные окружения

В **Settings → Environment Variables** добавьте для **Production** (и при необходимости Preview):

| Переменная | Пример | Обязательно |
|------------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://ваш-домен.ru` | Да |
| `GOOGLE_SHEETS_WEBHOOK_URL` | URL Apps Script `.../exec` | Да (для RSVP) |
| `GOOGLE_SHEETS_SECRET` | секрет из скрипта | Да (для RSVP) |

Без слэша в конце у `NEXT_PUBLIC_SITE_URL`.

После смены домена **обновите** `NEXT_PUBLIC_SITE_URL` и сделайте **Redeploy**.

### Шаг 3 — первый деплой

Нажмите **Deploy**. Сайт откроется на адресе вида `https://wedding-invitation-xxx.vercel.app` — уже с **HTTPS**.

### Шаг 4 — свой домен

1. **Settings → Domains → Add**.
2. Введите домен, например `invite.ваша-фамилия.ru` или `wedding.example.ru`.
3. Vercel покажет DNS-записи. У регистратора домена добавьте:

**Вариант A (рекомендуется)** — делегирование на Vercel:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

(Точные значения смотрите в панели Vercel — они могут отличаться.)

**Вариант B** — только поддомен:

| Тип | Имя | Значение |
|-----|-----|----------|
| CNAME | `invite` | `cname.vercel-dns.com` |

4. Подождите 5–60 минут (иногда до 24 ч). Vercel сам выпустит **SSL-сертификат** — статус **Valid** в разделе Domains.

### Шаг 5 — проверка

- Открывается `https://ваш-домен.ru`
- Редирект с `http://` на `https://` работает автоматически
- Форма RSVP отправляет ответ (проверьте строку в Google Таблице)
- В исходном коде страницы canonical/OG используют `NEXT_PUBLIC_SITE_URL`

---

## 3. Чеклист перед свадьбой

- [ ] `NEXT_PUBLIC_SITE_URL` = боевой `https://...`
- [ ] Google Sheets webhook и секрет совпадают с Apps Script
- [ ] Тест RSVP «Да» и «Нет» с телефона
- [ ] `robots.txt` / noindex — при необходимости (сайт приватный)
- [ ] Изображения и тексты в `src/data/wedding.ts` актуальны

---

## 4. Альтернатива: VPS + Nginx + Certbot

Если домен на своём сервере (Ubuntu):

```bash
npm run build
# запуск: npm run start (порт 3000) через pm2/systemd
```

Nginx как reverse proxy + **Certbot** для Let's Encrypt:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ваш-домен.ru www.ваш-домен.ru;

    ssl_certificate     /etc/letsencrypt/live/ваш-домен.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ваш-домен.ru/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

На сервере задайте те же переменные окружения, что в `.env.example`.

---

## 5. Timeweb (домен vaminvite.ru)

Пошаговая настройка под Timeweb Cloud и покупку домена: **[TIMEWEB-SETUP.md](./TIMEWEB-SETUP.md)**.

---

## 6. Полезные ссылки

- [Документация Vercel: Custom Domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [RSVP → Google Таблица](./google-sheets-rsvp.md)
- [Базовый аудит проекта](./AUDIT_BASELINE.md)
