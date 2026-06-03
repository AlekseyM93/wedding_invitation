# Настройка домена vaminvite.ru на Timeweb

Проект: **Next.js 15** + API `/api/rsvp` (нужен **SSR / Node.js**, не статический хостинг).

Репозиторий: `https://github.com/AlekseyM93/wedding_invitation`

---

## Ваш вариант: VPS vambusiness + домен

Если домен привязан к VPS **vambusiness** (IP **5.129.249.18**, Ubuntu 24.04) — пошаговая инструкция:

**[TIMEWEB-VPS-DEPLOY.md](./TIMEWEB-VPS-DEPLOY.md)**

SSL: бесплатный **Let's Encrypt** через Certbot на сервере. Покупать SSL в карточке домена не нужно.

---

## Шаг 0. Покупка домена (экран, который у вас сейчас)

| Поле | Рекомендация |
|------|----------------|
| Домен | `vaminvite.ru` |
| Администратор | ваши данные |
| Привязать к сервису | `vambusiness` (или общий проект) — ок |
| **SSL Timeweb Pro** | **Можно выключить**, если сайт размещаете в **Timeweb Cloud → App Platform** — там SSL Let's Encrypt **бесплатно** и обновляется сам. Платный SSL нужен для классического хостинга/сертификата на VPS вручную. |

После оплаты дождитесь, пока домен появится в разделе **Домены**.

---

## Шаг 1. Деплой сайта в Timeweb Cloud (App Platform)

> Панель: [timeweb.cloud](https://timeweb.cloud) (облако), не путать с классическим хостингом timeweb.ru.

1. **App Platform** → **Создать приложение** → тип **Frontend** → **Next.js**.
2. Подключите GitHub → репозиторий `AlekseyM93/wedding_invitation`, ветка `main`.
3. **Обязательно включите «Поддержка SSR»** — иначе форма RSVP (`/api/rsvp`) не заработает.
4. Конфигурация сервера: минимум **1 vCPU / 1–2 GB RAM** (для свадебного трафика хватит).
5. Команды (обычно подставляются сами):

   | Параметр | Значение |
   |----------|----------|
   | Install | `npm install` |
   | Build | `npm run build` |
   | Start | `npm run start` |
   | Node.js | 20.x или 22.x |

6. **Переменные окружения** (раздел Environment / Переменные):

   ```
   NEXT_PUBLIC_SITE_URL=https://vaminvite.ru
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/ВАШ_ID/exec
   GOOGLE_SHEETS_SECRET=ваш-секрет-из-apps-script
   ```

   Без `/` в конце у URL сайта. Значения — как в локальном `.env.local`.

7. Запустите деплой. Дождитесь статуса **Running**.
8. Откройте **технический домен** `*.twc1.net` (или как покажет панель) — проверьте сайт и RSVP.

Документация Timeweb: [Деплой Next.js](https://timeweb.cloud/docs/apps/deploying-frontend-apps/nextjs)

---

## Шаг 2. Привязка домена vaminvite.ru

### Вариант A (проще) — из App Platform

1. Откройте приложение → **Настройки** → **Домены** → **Добавить**.
2. Укажите `vaminvite.ru` и при необходимости `www.vaminvite.ru`.
3. Если домен куплен в Timeweb, панель предложит DNS — подтвердите.
4. SSL выпустится автоматически (Let's Encrypt), статус **Active / Valid**.

### Вариант B — через «Домены и SSL»

1. **Домены и SSL** → `vaminvite.ru` → вкладка **DNS**.
2. Добавьте **A-запись** (или «Привязать к сервису») → выберите ваше приложение в App Platform.
3. Для `www` часто добавляют **CNAME** на основной домен или отдельную A-запись (подсказка будет в панели).

**NS-серверы** (если домен .RU в Timeweb, обычно уже стоят):

```
ns1.timeweb.ru
ns2.timeweb.ru
ns3.timeweb.org
ns4.timeweb.org
```

Распространение DNS: от 15 минут до 24 часов.

---

## Шаг 3. Проверка после привязки

- [ ] Открывается `https://vaminvite.ru`
- [ ] `http://` перенаправляет на `https://`
- [ ] Обложка → «Открыть приглашение» → все секции
- [ ] RSVP «Да» и «Нет» — ответ в Google Таблице
- [ ] После RSVP — финальная страница «С любовью…»

---

## Альтернатива: Vercel + домен только на Timeweb

Если App Platform не подойдёт:

1. Деплой на [Vercel](https://vercel.com) из того же GitHub.
2. В Timeweb DNS для `vaminvite.ru`:

   | Тип | Имя | Значение |
   |-----|-----|----------|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

3. В Vercel → Domains → добавить `vaminvite.ru`.
4. Те же три переменные окружения + Redeploy.

Подробнее: [DEPLOY-DOMAIN-SSL.md](./DEPLOY-DOMAIN-SSL.md)

---

## Частые проблемы

| Симптом | Решение |
|---------|---------|
| Сайт не открывается по домену | Подождать DNS; проверить A-запись / привязку к App Platform |
| RSVP не отправляется | Проверить `GOOGLE_SHEETS_*` в переменных; пересобрать приложение |
| 502 / приложение падает | Включён ли SSR; хватает ли RAM; логи в App Platform |
| SSL не активен | Подождать 10–30 мин; домен должен указывать на приложение с авто-SSL |

---

## Контакты в проекте

После выхода в прод обновите при необходимости `src/data/wedding.ts` и снова сделайте push в `main` — App Platform пересоберёт сайт, если включён автодеплой.
