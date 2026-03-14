/**
 * Glitch Effect - Изменение размера слов
 * =======================================
 * 
 * Во время анимации glitch-shake случайные слова увеличиваются
 * или уменьшаются на 25%.
 * 
 * Использование:
 * 1. Подключите glitch.css
 * 2. Разбейте текст на слова в HTML:
 * 
 * <div class="glitch-wrapper">
 *     <span class="glitch" data-text="ВАШ ТЕКСТ">
 *         <span class="glitch-word">СЛОВО1</span>
 *         <span class="glitch-word">СЛОВО2</span>
 *     </span>
 * </div>
 * 
 * 3. Подключите этот JS после загрузки DOM
 * 4. Вызовите initGlitchWords()
 * 
 * Тайминги (цикл 5 секунд):
 * - 0.75 сек: 1-я серия рывков (4 изменения слов)
 * - 2.5 сек: 2-я серия рывков (3 изменения слов)
 * - 3.75 сек: 3-я серия рывков (2 изменения слов)
 */

function initGlitchWords() {
    const glitchElements = document.querySelectorAll('.glitch');

    glitchElements.forEach(glitch => {
        const words = glitch.querySelectorAll('.glitch-word');
        
        if (words.length === 0) return;
        
        // Запускаем цикл анимации
        runGlitchCycle(words);
    });
}

function runGlitchCycle(words) {
    // 1-я серия рывков (через 0.75 сек) - 4 рывка
    setTimeout(() => {
        changeWordSizes(words, 4);
    }, 750);

    // 2-я серия рывков (через 2.5 сек) - 3 рывка
    setTimeout(() => {
        changeWordSizes(words, 3);
    }, 2500);

    // 3-я серия рывков (через 3.75 сек) - 2 рывка
    setTimeout(() => {
        changeWordSizes(words, 2);
    }, 3750);

    // Повторяем цикл через 5 секунд
    setTimeout(() => {
        runGlitchCycle(words);
    }, 5000);
}

function changeWordSizes(words, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // Выбираем случайное слово
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words[randomIndex];
            
            // Случайный выбор: +25% или -25%
            const increase = Math.random() > 0.5;
            const scale = increase ? 1.25 : 0.75;
            
            // Применяем изменение размера
            word.style.transform = `scale(${scale})`;
            
            // Возвращаем размер обратно через 150мс
            setTimeout(() => {
                word.style.transform = 'scale(1)';
            }, 150);
        }, i * 150);
    }
}

// Инициализация сразу
initGlitchWords();

// И ещё раз после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initGlitchWords, 100);
});

// И после полной загрузки страницы
window.addEventListener('load', function() {
    setTimeout(initGlitchWords, 100);
});
