# EFFECT_CARD - Эффект карточки с металлическим переливанием

Эффект карточки с анимированными световыми полосами, создающими иллюзию металлического блеска.

## 📁 Файлы

- `effect-card.css` - Стили карточки и анимации полос
- `effect-card-gsap.js` - GSAP анимации появления и интерактивности
- `index.html` - Пример использования
- `README.md` - Документация

## 🚀 Быстрый старт

### 1. Подключите CSS

```html
<link rel="stylesheet" href="EFFECT_CARD/effect-card.css">
```

### 2. Добавьте HTML разметку

```html
<div class="effect-card">
    <!-- Полосы для анимации -->
    <div class="effect-card-stripe"></div>
    <div class="effect-card-stripe--fast"></div>
    <div class="effect-card-stripe--bottom"></div>

    <!-- Контент -->
    <div class="effect-card__content">
        <div class="effect-card__image">
            <img src="image.jpg" alt="Описание">
        </div>
        <h3 class="effect-card__title">Заголовок</h3>
        <p class="effect-card__text">Описание карточки</p>
    </div>
</div>
```

### 3. (Опционально) Подключите GSAP анимации

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="EFFECT_CARD/effect-card-gsap.js"></script>
```

## 📖 Использование

### Базовое использование (только CSS)

```html
<div class="effect-card">
    <div class="effect-card-stripe"></div>
    <div class="effect-card-stripe--fast"></div>
    <div class="effect-card-stripe--bottom"></div>
    <div class="effect-card__content">
        <h3 class="effect-card__title">Моя карточка</h3>
        <p class="effect-card__text">Описание</p>
    </div>
</div>
```

### С сеткой карточек

```html
<div class="cards-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
    <div class="effect-card">
        <div class="effect-card-stripe"></div>
        <div class="effect-card-stripe--fast"></div>
        <div class="effect-card-stripe--bottom"></div>
        <div class="effect-card__content">
            <h3 class="effect-card__title">Карточка 1</h3>
        </div>
    </div>

    <div class="effect-card">
        <div class="effect-card-stripe"></div>
        <div class="effect-card-stripe--fast"></div>
        <div class="effect-card-stripe--bottom"></div>
        <div class="effect-card__content">
            <h3 class="effect-card__title">Карточка 2</h3>
        </div>
    </div>

    <div class="effect-card">
        <div class="effect-card-stripe"></div>
        <div class="effect-card-stripe--fast"></div>
        <div class="effect-card-stripe--bottom"></div>
        <div class="effect-card__content">
            <h3 class="effect-card__title">Карточка 3</h3>
        </div>
    </div>
</div>
```

### С GSAP анимацией

```javascript
// Инициализация анимации карточек
initEffectCardAnimation();

// Или с настройками
initEffectCardAnimation('.my-cards', {
    triggerSection: '.my-section',
    start: 'top 80%',
    stagger: 0.2
});

// Инициализация анимации заголовков
initSectionTitlesAnimation();
```

## ⚙️ Настройки GSAP

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `selector` | `.effect-card` | Селектор карточек |
| `triggerSection` | `.effect-card__container` | Секция-триггер для ScrollTrigger |
| `start` | `top 80%` | Начало анимации |
| `duration` | `0.8` | Длительность анимации |
| `stagger` | `0.2` | Задержка между карточками |
| `ease` | `back.out(1.7)` | Функция плавности |

## 🎨 CSS переменные

```css
.effect-card {
    --primary: #ff6b00;      /* Акцентный цвет */
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 60%);
    --line: hsl(0, 0%, 90%);
}
```

## 📝 Структура HTML

```
effect-card/
├── effect-card/              ← Корневой класс карточки
│   ├── effect-card-stripe/         ← Средняя полоса
│   ├── effect-card-stripe--fast/   ← Быстрая полоса
│   ├── effect-card-stripe--bottom/ ← Нижняя полоса
│   └── effect-card__content/       ← Контейнер контента
│       ├── effect-card__image/     ← Изображение
│       ├── effect-card__title/     ← Заголовок
│       └── effect-card__text/      ← Текст
```

## ✨ Эффекты

1. **Металлическое переливание** - 5 анимированных полос создают эффект блеска:
   - `::before` - большая полоса сверху вниз (4 сек)
   - `::after` - маленькая полоса снизу вверх (1.3 сек)
   - `effect-card-stripe` - средняя полоса сверху вниз (0.67 сек)
   - `effect-card-stripe--fast` - быстрая полоса снизу вверх (2.7 сек)
   - `effect-card-stripe--bottom` - большая полоса снизу вверх (5.3 сек)

2. **Hover эффект** - карточка поднимается и увеличивается

3. **GSAP анимация** - плавное появление при скролле

4. **Изображение** - ч/б → цветное при наведении

## 📱 Адаптивность

Карточка автоматически адаптируется под мобильные устройства:
- Уменьшаются отступы
- Уменьшается высота изображения
- Корректируются размеры текста

## 🎯 Примеры использования

- Карточки товаров
- Карточки услуг
- Карточки портфолио
- Карточки команды
- Карточки направлений деятельности

## 🔗 Зависимости

- **CSS**: Нет (чистый CSS)
- **GSAP**: Опционально (для анимаций появления)
  - gsap.min.js
  - ScrollTrigger.min.js

## 📄 Лицензия

Свободное использование в любых проектах.
