# Лендинг для мастерской металлоизделий

Современный одностраничный сайт для производственной мастерской, специализирующейся на изделиях из металла и профильной трубы.

## 🚀 Быстрый старт

### Локальный запуск

1. Откройте файл `index.html` в любом браузере
2. Или используйте локальный сервер:

```bash
# Если установлен Python
python -m http.server 8000

# Если установлен Node.js
npx serve .

# Если установлен PHP
php -S localhost:8000
```

3. Откройте в браузере `http://localhost:8000`

## 📁 Структура проекта

```
metal/
├── index.html          # Главная страница
├── css/
│   └── style.css       # Все стили
├── js/
│   └── main.js         # JavaScript функциональность
├── images/             # Изображения
│   ├── hero-bg.jpg
│   ├── stairs-placeholder.jpg
│   ├── canopy-placeholder.jpg
│   ├── construction-placeholder.jpg
│   └── gallery-1.jpg ... gallery-12.jpg
├── plan.md             # План разработки
├── prd-metal-landing.md # Требования к продукту
└── README.md           # Этот файл
```

## 🛠️ Функциональность

- ✅ Адаптивный дизайн (mobile-first)
- ✅ Мобильное меню (гамбургер)
- ✅ Плавная прокрутка к якорям
- ✅ Галерея работ с lightbox
- ✅ Форма заявки с валидацией
- ✅ Маска ввода телефона
- ✅ 6 блоков преимуществ
- ✅ 3 направления деятельности
- ✅ Иконки Iconify (Material Design Icons)

## 🎨 Настройка

### Замена контактных данных

Откройте `index.html` и найдите:

```html
<!-- Телефон в шапке -->
<a href="tel:+79990000000" class="header__phone">+7 (999) 000-00-00</a>

<!-- Телефон в форме -->
<a href="tel:+79990000000">+7 (999) 000-00-00</a>

<!-- Email -->
<a href="mailto:info@metalmaster.ru">info@metalmaster.ru</a>

<!-- Telegram -->
<a href="https://t.me/username" class="messenger">

<!-- WhatsApp -->
<a href="https://wa.me/79990000000" class="messenger">
```

### Настройка отправки формы

По умолчанию форма имитирует отправку. Для реальной отправки выберите один из вариантов:

#### Вариант 1: Formspree (бесплатно, без бэкенда)

1. Зарегистрируйтесь на [formspree.io](https://formspree.io)
2. Создайте новую форму и получите URL
3. В `index.html` замените:
```html
<form class="contact__form" id="contactForm" 
      action="https://formspree.io/f/ВАШ_ID" 
      method="POST">
```

#### Вариант 2: EmailJS (отправка через JavaScript)

1. Зарегистрируйтесь на [emailjs.com](https://www.emailjs.com)
2. Добавьте скрипт EmailJS в `index.html`
3. Настройте отправку в `js/main.js`

#### Вариант 3: Telegram Bot

1. Создайте бота через @BotFather в Telegram
2. Получите токен и chat_id
3. В `js/main.js` замените обработчик формы на отправку в Telegram API

### Замена изображений

1. Положите ваши фото в папку `images/`
2. Переименуйте файлы или обновите пути в `index.html`:
   - `hero-bg.jpg` — фон главного экрана
   - `stairs-placeholder.jpg` — фото для "Лестницы и ограждения"
   - `canopy-placeholder.jpg` — фото для "Навесы и козырьки"
   - `construction-placeholder.jpg` — фото для "Металлоконструкции"
   - `gallery-1.jpg` ... `gallery-12.jpg` — фото работ

### Изменение цветовой схемы

Откройте `css/style.css` и измените переменные:

```css
:root {
    --color-primary: #ff6b00;      /* Основной акцентный цвет */
    --color-primary-dark: #e65c00; /* Цвет при наведении */
    --color-dark: #1a1a2e;         /* Тёмный цвет текста/фона */
}
```

### Замена иконок

Сайт использует библиотеку **Iconify** (Material Design Icons). Для замены иконок:

1. Найдите нужную иконку на [icon-sets.iconify.design](https://icon-sets.iconify.design/mdi/)
2. Скопируйте название иконки (например, `mdi:home`)
3. Замените в `index.html`:
```html
<span class="iconify" data-icon="mdi:старая-иконка"></span>
```

**Используемые иконки:**
- `mdi:gear` — шестерёнка (логотип)
- `mdi:factory` — завод (производство)
- `mdi:palette` — палитра (покраска)
- `mdi:ruler` — линейка (чертежи)
- `mdi:timer-sand` — песочные часы (сроки)
- `mdi:shield-check-outline` — щит (гарантия)
- `mdi:truck-delivery` — грузовик (доставка)
- `mdi:telegram` — Telegram
- `mdi:whatsapp` — WhatsApp

## 📦 Деплой

### GitHub Pages

```bash
# Инициализация репозитория
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

В настройках репозитория включите GitHub Pages (main branch).

### Netlify

1. Зарегистрируйтесь на [netlify.com](https://www.netlify.com)
2. Перетащите папку проекта в окно браузера
3. Сайт опубликован!

### Vercel

```bash
npm i -g vercel
vercel
```

### Классический хостинг

Загрузите все файлы через FTP в корневую папку сайта (обычно `public_html` или `www`).

## 📊 SEO и аналитика

### Добавление Яндекс.Метрики

Вставьте код счётчика перед закрывающим тегом `</head>` в `index.html`.

### Добавление Google Analytics

Вставьте код GA4 перед закрывающим тегом `</head>` в `index.html`.

## 🔧 Технические детали

- **HTML5** — семантическая разметка
- **CSS3** — Grid, Flexbox, CSS Variables
- **JavaScript** — ванильный JS без зависимостей
- **Шрифты** — Google Fonts (Montserrat)
- **Иконки** — Iconify (Material Design Icons)
- **Адаптивность** — брейкпоинты: 480px, 768px, 1024px

## 📝 Лицензия

Свободное использование для коммерческих и личных проектов.

---

**Дата создания:** 12 марта 2026 г.  
**Версия:** 1.0
