# 📋 Подробный план реализации секции онлайн-записи

## 🎯 Архитектурное решение

Для реализации записи с отображением занятых/свободных слотов времени нужно определить **где будут храниться данные о бронированиях**:

| Вариант | Описание | Плюсы | Минусы |
|---------|----------|-------|--------|
| **Backend + База данных** | Сервер (Node.js/PHP/Python) + БД (SQLite/PostgreSQL) | Надёжно, масштабируемо | Требует сервера |
| **Firebase** | Облачная база от Google | Быстро, бесплатно до лимита | Зависимость от Google |
| **Google Sheets** | Данные в таблице Google | Просто, бесплатно | Медленнее, лимиты API |
| **Telegram Bot API** | Хранение записей в Telegram | Бесплатно, уведомления | Ограниченный функционал |
| **Local Storage (демо)** | Только для демонстрации | Очень просто | Данные только у вас в браузере |

---

## 📁 Этап 1: Подготовка (1-2 часа)

### 1.1 Выбрать способ хранения данных
Рекомендую для начала **Firebase** или **Google Sheets** — не нужен свой сервер.

### 1.2 Создать структуру папок
```
metal/
├── booking/
│   ├── booking.html (или секция в index.html)
│   ├── booking.css
│   ├── booking.js
│   └── api/
│       └── booking-api.js (работа с Firebase/Google Sheets)
```

---

## 🏗️ Этап 2: HTML-разметка секции (2-3 часа)

### 2.1 Добавить новую секцию в `index.html`
```html
<!-- Booking Section -->
<section class="booking" id="booking">
    <div class="container">
        <h2 class="section-title">Онлайн запись</h2>
        <p class="booking__intro">Выберите дату и время для визита</p>
        
        <!-- Календарь -->
        <div class="booking__calendar" id="calendar"></div>
        
        <!-- Слоты времени -->
        <div class="booking__slots" id="timeSlots"></div>
        
        <!-- Форма записи -->
        <form class="booking__form" id="bookingForm">
            <input type="text" placeholder="Ваше имя" required>
            <input type="tel" placeholder="Телефон" required>
            <button type="submit">Записаться</button>
        </form>
    </div>
</section>
```

### 2.2 Добавить ссылку в меню
```html
<li class="nav__item"><a href="#booking" class="nav__link">Запись</a></li>
```

---

## 🎨 Этап 3: CSS стилизация (2-3 часа)

### 3.1 Создать `booking/booking.css`

**Календарь:**
- Сетка 7 колонок (дни недели)
- Выделение выбранной даты
- Визуальное отличие дней с занятыми слотами

**Слоты времени:**
- Сетка кнопок (например, 09:00, 10:00, 11:00...)
- **Занятые** — серый цвет, неактивные
- **Свободные** — зелёные, кликабельные
- **Выбранный** — выделен цветом

**Адаптивность:**
- Мобильные: календарь сворачивается, слоты в 2-3 колонки
- Планшеты: календарь полный, слоты в 4 колонки
- Десктоп: полный вид

---

## ⚙️ Этап 4: JavaScript логика (4-6 часов)

### 4.1 Базовая структура `booking/booking.js`

```javascript
// Конфигурация
const CONFIG = {
    workDays: [1, 2, 3, 4, 5], // Пн-Пт
    timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
    maxDaysAhead: 30 // На сколько дней вперёд можно записаться
};

// Состояние
let selectedDate = null;
let selectedTime = null;
let bookings = []; // Данные о занятых слотах
```

### 4.2 Функции для реализации

| Функция | Описание |
|---------|----------|
| `renderCalendar(month, year)` | Отрисовка календаря на месяц |
| `renderTimeSlots(date)` | Показ слотов для выбранной даты |
| `getBookings(date)` | Загрузка занятых слотов из БД |
| `isSlotBusy(date, time)` | Проверка, занят ли слот |
| `selectSlot(time)` | Выбор слота пользователем |
| `submitBooking(data)` | Отправка записи в БД |

### 4.3 Логика отображения слотов

```javascript
// Пример структуры данных о бронированиях
const bookings = {
    '2026-03-25': ['10:00', '14:00'], // Занятые слоты
    '2026-03-26': ['09:00', '11:00', '15:00']
};

// При рендере слотов:
timeSlots.forEach(slot => {
    const isBusy = bookings[selectedDate]?.includes(slot);
    renderSlot(slot, isBusy);
});
```

---

## 🔌 Этап 5: Интеграция с бэкендом (3-4 часа)

### 5.1 Вариант A: Firebase (Realtime Database)

```javascript
// booking/api/firebase-api.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';

const firebaseConfig = { /* ваши настройки */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Получить занятые слоты
function getBookings(date) {
    const bookingsRef = ref(db, `bookings/${date}`);
    onValue(bookingsRef, (snapshot) => {
        return snapshot.val() || {};
    });
}

// Создать запись
function createBooking({ date, time, name, phone }) {
    const newBookingRef = push(ref(db, 'bookings'));
    set(newBookingRef, { date, time, name, phone, timestamp: Date.now() });
}
```

### 5.2 Вариант B: Google Sheets API

```javascript
// booking/api/sheets-api.js
const SPREADSHEET_ID = 'ваш_id';
const API_KEY = 'ваш_ключ';

async function getBookings(date) {
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:D?key=${API_KEY}`
    );
    const data = await response.json();
    // Фильтрация записей по дате
}
```

---

## 🔔 Этап 6: Уведомления (опционально, 2-3 часа)

### 6.1 Telegram-уведомления для администратора
```javascript
async function sendTelegramNotification(booking) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const message = `📅 Новая запись!\nДата: ${booking.date}\nВремя: ${booking.time}\nИмя: ${booking.name}\nТелефон: ${booking.phone}`;
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        body: JSON.stringify({ chat_id: chatId, text: message })
    });
}
```

### 6.2 Email-подтверждение клиенту
Использовать **EmailJS** (бесплатно до 200 писем/мес):
```javascript
emailjs.send('service_id', 'template_id', {
    to_email: customerEmail,
    date: selectedDate,
    time: selectedTime
});
```

---

## 🧪 Этап 7: Тестирование (1-2 часа)

- [ ] Проверить выбор даты (включая переход между месяцами)
- [ ] Проверить отображение занятых/свободных слотов
- [ ] Проверить блокировку уже занятых слотов
- [ ] Проверить создание новой записи
- [ ] Проверить валидацию формы
- [ ] Проверить адаптивность на мобильных
- [ ] Проверить работу без интернета (обработка ошибок)

---

## 📊 Итоговая оценка времени

| Этап | Время |
|------|-------|
| Подготовка | 1-2 ч |
| HTML | 2-3 ч |
| CSS | 2-3 ч |
| JavaScript | 4-6 ч |
| Бэкенд | 3-4 ч |
| Уведомления | 2-3 ч |
| Тестирование | 1-2 ч |
| **Итого** | **15-23 часа** |

---

## 🚀 Рекомендация по реализации

Для вашего проекта (лендинг мастерской) предлагаю **упрощённый вариант**:

1. **Начать с Local Storage** — сделать рабочую демо-версию без сервера
2. **Подключить Firebase** — когда понадобится реальное хранение данных
3. **Добавить Telegram-уведомления** — чтобы вы получали заявки сразу
