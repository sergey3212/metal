/**
 * EFFECT_CARD - GSAP анимация для карточек с металлическим переливанием
 *
 * Подключение:
 * 1. Подключите GSAP и ScrollTrigger перед этим файлом
 * 2. Вызовите initEffectCardAnimation() после загрузки DOM
 *
 * Пример:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 * <script src="effect-card-gsap.js"></script>
 */

document.addEventListener('DOMContentLoaded', function() {
    initEffectCardAnimation();
});

/**
 * Анимация карточек с помощью GSAP ScrollTrigger
 * @param {string} selector - Селектор карточек (по умолчанию '.effect-card')
 * @param {object} options - Настройки анимации
 */
function initEffectCardAnimation(selector, options) {
    // Проверяем наличие GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не подключён');
        return;
    }

    // Настройки по умолчанию
    const settings = Object.assign({
        selector: selector || '.effect-card',
        triggerSection: '.effect-card__container',
        start: 'top 80%',
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, options);

    // Регистрируем плагин ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll(settings.selector);

    if (!cards.length) return;

    // Создаем timeline для последовательной анимации карточек
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: settings.triggerSection,
            start: settings.start,
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            once: false
        }
    });

    // Анимация каждой карточки с задержкой
    cards.forEach((card, index) => {
        // Начальные стили для карточки
        gsap.set(card, {
            opacity: 0,
            y: 100,
            rotationY: -15,
            scale: 0.9
        });

        tl.to(card, {
            duration: settings.duration,
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            ease: settings.ease,
            transformOrigin: 'center center'
        }, index * settings.stagger);

        // Анимация для изображения внутри карточки
        const img = card.querySelector('.effect-card__image img');
        if (img) {
            gsap.from(img, {
                duration: 1.2,
                scale: 1.3,
                rotation: 5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    containerAnimation: tl
                }
            });
        }

        // Анимация для текста (заголовок и описание)
        const title = card.querySelector('.effect-card__title');
        const text = card.querySelector('.effect-card__text');

        if (title) {
            gsap.from(title, {
                duration: 0.6,
                opacity: 0,
                y: 30,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    containerAnimation: tl
                },
                delay: index * settings.stagger + 0.3
            });
        }

        if (text) {
            gsap.from(text, {
                duration: 0.6,
                opacity: 0,
                y: 20,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    containerAnimation: tl
                },
                delay: index * settings.stagger + 0.5
            });
        }

        // Анимация полос (stripes) на карточке
        const stripes = card.querySelectorAll('.effect-card__stripe, .effect-card__stripe--fast, .effect-card__stripe--bottom');
        stripes.forEach((stripe, stripeIndex) => {
            gsap.from(stripe, {
                duration: 0.8,
                scaleX: 0,
                transformOrigin: 'left center',
                ease: 'power2.out',
                delay: index * settings.stagger + stripeIndex * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    containerAnimation: tl
                }
            });
        });

        // Эффект при наведении (hover)
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            });

            const img = this.querySelector('.effect-card__image img');
            if (img) {
                gsap.to(img, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                boxShadow: 'none'
            });

            const img = this.querySelector('.effect-card__image img');
            if (img) {
                gsap.to(img, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Анимация заголовков секций
 * @param {string} selector - Селектор заголовков (по умолчанию '.section-title')
 */
function initSectionTitlesAnimation(selector) {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sectionTitles = document.querySelectorAll(selector || '.section-title');

    sectionTitles.forEach((title, index) => {
        // Начальные стили
        gsap.set(title, {
            opacity: 0,
            y: -50,
            scale: 0.9
        });

        gsap.to(title, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
        });
    });
}
