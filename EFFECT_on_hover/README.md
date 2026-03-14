# 3D Card Hover Effect

Эффект наведения на карточку с 3D-трансформацией.

## Как использовать

1. Подключите `effect.css` к вашему проекту:
   ```html
   <link rel="stylesheet" href="EFFECT_on_hover/effect.css">
   ```

2. Добавьте контейнеру класс `.effect-container`:
   ```html
   <div class="effect-container">
     <!-- карточки -->
   </div>
   ```

3. Добавьте каждой карточке класс `.effect-card`:
   ```html
   <div class="effect-card">
     <div class="effect-card__content">
       <!-- содержимое карточки -->
     </div>
   </div>
   ```

## Пример

```html
<div class="effect-container">
  <div class="effect-card">
    <div class="effect-card__content">
      <h3>Заголовок</h3>
      <p>Текст карточки</p>
    </div>
  </div>
</div>
```

## Настройка

В `effect.css` можно изменить параметры:
- `perspective` — глубина 3D-эффекта (чем меньше, тем выразительнее)
- `rotateX` / `rotateY` — угол наклона карточки
- `translateZ` — насколько "выдвигается" содержимое
