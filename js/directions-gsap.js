/**
 * GSAP Animations for Directions Section
 * Анимация карточек в секции "Наши направления"
 */

document.addEventListener('DOMContentLoaded', function() {
    initDirectionsAnimation();
    initSectionTitlesAnimation();
});

/**
 * Анимация карточек направлений с помощью GSAP ScrollTrigger
 */
function initDirectionsAnimation() {
    // Проверяем наличие GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не подключён');
        return;
    }

    // Регистрируем плагин ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const directions = document.querySelectorAll('.direction');

    if (!directions.length) return;

    // Создаем timeline для последовательной анимации карточек
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.directions',
            start: 'top 80%', // Начинаем анимацию, когда секция появляется на 80% viewport
            end: 'top 20%',
            toggleActions: 'play none none reverse', // Проигрываем вперёд и назад
            once: false // Анимация повторяется при скролле вверх/вниз
        }
    });

    // Анимация каждой карточки с задержкой
    directions.forEach((direction, index) => {
        // Начальные стили для карточки
        gsap.set(direction, {
            opacity: 0,
            y: 100,
            rotationY: -15,
            scale: 0.9
        });

        tl.to(direction, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            ease: 'back.out(1.7)', // Эффект "отскока" в конце
            transformOrigin: 'center center'
        }, index * 0.2); // Задержка между карточками (0.2 секунды)

        // Параллельная анимация для изображения внутри карточки
        const img = direction.querySelector('.direction__image img');
        if (img) {
            gsap.from(img, {
                duration: 1.2,
                scale: 1.3,
                rotation: 5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: direction,
                    start: 'top 85%',
                    containerAnimation: tl
                }
            });
        }

        // Анимация для текста (заголовок и описание)
        const title = direction.querySelector('.direction__title');
        const text = direction.querySelector('.direction__text');

        if (title) {
            gsap.from(title, {
                duration: 0.6,
                opacity: 0,
                y: 30,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: direction,
                    start: 'top 80%',
                    containerAnimation: tl
                },
                delay: index * 0.2 + 0.3
            });
        }

        if (text) {
            gsap.from(text, {
                duration: 0.6,
                opacity: 0,
                y: 20,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: direction,
                    start: 'top 80%',
                    containerAnimation: tl
                },
                delay: index * 0.2 + 0.5
            });
        }

        // Анимация полос (stripes) на карточке
        const stripes = direction.querySelectorAll('.direction-stripe, .direction-stripe--fast, .direction-stripe--bottom');
        stripes.forEach((stripe, stripeIndex) => {
            gsap.from(stripe, {
                duration: 0.8,
                scaleX: 0,
                transformOrigin: 'left center',
                ease: 'power2.out',
                delay: index * 0.2 + stripeIndex * 0.1,
                scrollTrigger: {
                    trigger: direction,
                    start: 'top 85%',
                    containerAnimation: tl
                }
            });
        });

        // Эффект при наведении (hover)
        direction.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            });

            const img = this.querySelector('.direction__image img');
            if (img) {
                gsap.to(img, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            }
        });

        direction.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                boxShadow: 'none'
            });

            const img = this.querySelector('.direction__image img');
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
 * Анимация заголовков всех секций сайта
 */
function initSectionTitlesAnimation() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Находим все заголовки секций
    const sectionTitles = document.querySelectorAll('.section-title');

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
                start: 'top 85%', // Начинаем, когда заголовок появляется на 85% viewport
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.1 // Небольшая задержка между секциями
        });
    });
}
