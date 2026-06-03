# Финальный аудит (2026-06-02)

## 1. Что было сломано / рисковано

- Hero: логотип по центру, бургер скрыт на обложке, нет декоративной линии с сердцем, крупные имена, символ `&` вместо «и».
- URL `/invitation` (исправлено ранее) — один адрес `localhost:3000`.
- SEO: тип `WeddingEvent`, относительный `image` в JSON-LD, `localhost` без `NEXT_PUBLIC_SITE_URL` на проде.
- A11y: dress-code lightbox без dialog/Escape; RSVP radios без клавиатуры; слабые `alt`.
- Документация: неверный счётчик JPG в README.

## 2. Что исправлено

- **Hero/Header:** логотип слева, бургер справа на обложке (и в контенте на mobile), меню с «Открыть приглашение», декоративное сердце с линиями, типографика имён, «и» вместо `&`.
- **RSVP:** клавиатура (стрелки/Space/Enter), `aria-checked`, refs; форма одностраничная без шагов (без изменений логики).
- **A11y:** dress-code dialog, `role="img"` для цветов, `aria-hidden` на иконках, focus-visible, skip-link из `ui.ts`.
- **SEO:** Schema.org `Event`, абсолютный URL изображения, `url` события; noindex сохранён (приватное приглашение).
- **Контент:** `heroImageAlt`, `thankYouImageAlt`, `imageAlt` для программы.
- **Адаптив:** компактнее RSVP-карточки на mobile; nav сжат на 1024px; RSVP padding по брейкпоинтам.

## 3. Изменённые файлы (основные)

`Header.tsx`, `HeroSection.tsx`, `HeroDecorativeDivider.tsx`, `ScrollHint.tsx`, `SkipLink.tsx`, `RsvpForm.tsx`, `DressCodeSection.tsx`, `ThankYouSection.tsx`, `ProgramSection.tsx`, `FaqSection.tsx`, `page.tsx`, `wedding.ts`, `ui.ts`, `types/wedding.ts`, `globals.css`, `rsvp-section.css`, `README.md`, `.env.example`, `docs/AUDIT_BASELINE.md`.

## 4. Изображения

- **37/37** файлов на месте; битых путей нет.
- `rsvp-decor.jpg` в ТЗ отсутствует — декор RSVP: `DecorativeHeart` (как в референсе-иконке).

## 5. Адаптивность

- Hero: уменьшен `clamp` имён, отступы CTA.
- Header: меню на обложке и desktop nav с уменьшенным tracking на 1024–1280px.
- RSVP: одна колонка &lt;768px, две колонки на tablet+.

## 6. Сборка

`npm run check` — целевой статус: **OK** (type-check + lint + build).

## 7. Что осталось улучшить

- Задать боевой `NEXT_PUBLIC_SITE_URL` на хостинге.
- Один успешный тест RSVP на проде (Google Sheets + Apps Script).
- Заменить демо-контакты в `wedding.ts` (телефон, Telegram, площадка).
- Опционально: `npm run optimize:backgrounds` перед деплоем.

## 8. Готовность к публикации

**Да**, после настройки env и smoke-теста RSVP на деплое. Код и сборка готовы; контент и webhook — на стороне заказчика.
