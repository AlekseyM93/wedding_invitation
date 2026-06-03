# Свадебное приглашение

Luxury digital-приглашение на Next.js 15: полноценный сайт с анимациями, адаптивной вёрсткой и формой RSVP.

## Стек

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- React Hook Form
- Zod
- Google Таблицы (Apps Script) для RSVP

## Установка

```bash
npm install
cp .env.example .env.local
```

Заполните `.env.local` (см. [docs/google-sheets-rsvp.md](docs/google-sheets-rsvp.md)).

## Запуск

```bash
npm run dev
```

Сайт: http://localhost:3000

## Сборка

```bash
npm run check
```

Отдельно: `npm run build`, `npm run lint`, `npm run type-check`.

## Контент

- Тексты и данные: [`src/data/wedding.ts`](src/data/wedding.ts)
- UI-строки: [`src/data/ui.ts`](src/data/ui.ts)
- Изображения: `public/images/` — **16** контентных `.jpg` + **21** фоновый файл (7 секций × PNG/WebP/AVIF), всего **37** файлов

## RSVP → Google Таблица

Подробная инструкция: [docs/google-sheets-rsvp.md](docs/google-sheets-rsvp.md)

Скрипт для таблицы: [google-apps-script/rsvp-webhook.gs](google-apps-script/rsvp-webhook.gs)

## Деплой

1. Загрузите проект на Vercel (или другой хостинг с Node.js).
2. Добавьте переменные из `.env.example`.
3. Укажите `NEXT_PUBLIC_SITE_URL` с боевым доменом.
4. Перед публикацией обновите данные в `wedding.ts` (имена, дата, площадка, контакты).
