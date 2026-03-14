/**
 * Glitch Effect - Изменение размера слов
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
    // 1-я серия рывков (через 0.75 сек)
    setTimeout(() => {
        changeWordSizes(words, 4);
    }, 750);

    // 2-я серия рывков (через 2.5 сек)
    setTimeout(() => {
        changeWordSizes(words, 3);
    }, 2500);

    // 3-я серия рывков (через 3.75 сек)
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
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words[randomIndex];
            
            // Случайный выбор: +25% или -25%
            const increase = Math.random() > 0.5;
            const scale = increase ? 1.25 : 0.75;
            
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
