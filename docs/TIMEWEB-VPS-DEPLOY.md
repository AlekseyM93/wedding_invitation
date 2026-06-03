# Деплой на VPS vambusiness (vaminvite.ru)

Ваша схема:

| Что | Значение |
|-----|----------|
| Домен | `vaminvite.ru` (оплачен до 03.06.2027) |
| VPS | **vambusiness**, Ubuntu 24.04 |
| IP | **5.129.249.18** |
| DNS | NS Timeweb, домен привязан к сервису vambusiness |

Платный **SSL Timeweb Pro не обязателен** — на VPS ставим **бесплатный Let's Encrypt** (Certbot).

---

## 1. DNS (вкладка «DNS» у домена)

Проверьте записи:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `5.129.249.18` |
| A | `www` | `5.129.249.18` |

Если `www` нет — добавьте A-запись `www` → тот же IP.

---

## 2. Подключение к серверу

В панели VPS → вкладка **Доступ** — root-пароль или SSH-ключ.

С вашего компьютера (PowerShell):

```bash
ssh root@5.129.249.18
```

---

## 3. Подготовка сервера (один раз)

```bash
apt update && apt upgrade -y
apt install -y git nginx certbot python3-certbot-nginx

# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

node -v   # v22.x
npm -v

npm install -g pm2
```

Откройте firewall (если включён UFW):

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## 4. Код проекта

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/AlekseyM93/wedding_invitation.git
cd wedding_invitation
npm ci
```

Файл окружения:

```bash
nano .env.local
```

Вставьте (подставьте свои значения из локального `.env.local`):

```env
NEXT_PUBLIC_SITE_URL=https://vaminvite.ru
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SHEETS_SECRET=ваш-секрет
```

Сборка и запуск:

```bash
npm run build
pm2 start npm --name "wedding" -- start
pm2 save
pm2 startup
```

Проверка на сервере: `curl -I http://127.0.0.1:3000` — должен быть ответ `200`.

---

## 5. Nginx

```bash
nano /etc/nginx/sites-available/vaminvite.ru
```

```nginx
server {
    listen 80;
    server_name vaminvite.ru www.vaminvite.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/vaminvite.ru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## 6. SSL (HTTPS) — бесплатно

```bash
certbot --nginx -d vaminvite.ru -d www.vaminvite.ru
```

Укажите email, согласитесь с условиями. Certbot сам настроит HTTPS и редирект с HTTP.

Проверка: откройте **https://vaminvite.ru**

Автопродление сертификата:

```bash
certbot renew --dry-run
```

Кнопку **«Купить сертификат»** в панели домена для этого сценария **не нажимайте**.

---

## 7. Обновление сайта после правок

```bash
cd /var/www/wedding_invitation
git pull
npm ci
npm run build
pm2 restart wedding
```

---

## 8. Чеклист

- [ ] `https://vaminvite.ru` открывается
- [ ] `http://` перенаправляет на `https://`
- [ ] RSVP отправляется в Google Таблицу
- [ ] `pm2 status` — процесс `wedding` online

---

## Если что-то не работает

| Проблема | Что проверить |
|---------|----------------|
| Сайт не открывается | `pm2 logs wedding`, `systemctl status nginx` |
| 502 Bad Gateway | Запущен ли `npm start` на порту 3000 |
| RSVP ошибка | `.env.local` на сервере, пересборка `npm run build` |
| SSL не выдаётся | DNS `@` и `www` → `5.129.249.18`, порты 80/443 открыты |
