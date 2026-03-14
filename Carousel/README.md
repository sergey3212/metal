# Карусель с эффектами для Embla Carousel

Готовая карусель с автоматической прокруткой и параллакс-эффектом для изображений.

## Подключение

1. Подключите скрипты Embla Carousel в `<head>` или перед закрывающим `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/embla-carousel@8.5.2/embla-carousel.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/embla-carousel-auto-scroll@8.5.2/embla-carousel-auto-scroll.umd.min.js"></script>
```

2. Подключите стили:

```html
<link rel="stylesheet" href="carousel.css">
```

3. Подключите скрипт карусели:

```html
<script src="carousel.js"></script>
```

## HTML структура

```html
<div class="carousel">
    <div class="carousel__viewport" id="carouselViewport">
        <div class="carousel__container">
            <div class="carousel__slide">
                <img src="image1.jpg" alt="Изображение 1">
            </div>
            <!-- Повторите для остальных слайдов -->
        </div>
    </div>

    <button class="carousel__prev" aria-label="Предыдущее">
        <!-- SVG иконка стрелки влево -->
    </button>
    <button class="carousel__next" aria-label="Следующее">
        <!-- SVG иконка стрелки вправо -->
    </button>
</div>
```

## Эффекты

- **Автоматическая прокрутка**: карусель постоянно движется со скоростью 0.6
- **Параллакс изображений**: картинки двигаются горизонтально при прокрутке (амплитуда 11.25)
- **Масштаб изображений**: все картинки имеют scale(1.2)
- **Активный слайд**: подсвечивается текущий слайд

## Настройка

### Изменение скорости автопрокрутки

В `carousel.js` найдите строку:

```javascript
EmblaCarouselAutoScroll({ speed: 0.6, stopOnInteraction: false })
```

Измените `speed` на нужное значение (чем больше, тем быстрее).

### Изменение амплитуды параллакса

В `carousel.js` найдите строку:

```javascript
const translateX = (viewportCenter - slideCenter) / slideRect.width * 11.25;
```

Измените `11.25` на нужное значение:
- Меньше = слабее эффект
- Больше = сильнее эффект

### Изменение масштаба изображений

В `carousel.css` найдите:

```css
.carousel__slide img {
    transform: scale(1.2);
}
```

И в `carousel.js`:

```javascript
img.style.transform = `scale(1.2) translateX(${translateX}%)`;
```

## Адаптивность

Карусель автоматически адаптируется под мобильные устройства:
- На экранах ≤ 768px слайды занимают 100% ширины
- Кнопки навигации уменьшаются

## Требования

- Embla Carousel 8.x
- Embla Carousel Auto Scroll 8.x
