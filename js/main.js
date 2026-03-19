/**
 * Main JavaScript for Metal Workshop Landing Page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileMenu();
    initSmoothScroll();
    initGalleryCarousel();
    initLightbox();
    initContactForm();
    initHeaderScroll();
    initHeroParallax();
    initDirectionsParallax();
    initFAQ();
    initMovingLetters();
    initCalculator();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Gallery Carousel with Embla
 */
function initGalleryCarousel() {
    const viewport = document.getElementById('galleryViewport');
    const prevBtn = document.querySelector('.gallery__prev');
    const nextBtn = document.querySelector('.gallery__next');

    if (!viewport || typeof EmblaCarousel === 'undefined') return;

    const slides = viewport.querySelectorAll('.gallery__slide');

    // Options for Embla Carousel
    const options = {
        loop: true,
        align: 'center',
        slidesToScroll: 1,
        duration: 100,
        dragFree: false,
        containScroll: 'trimSnaps',
        breakpoints: {
            480: { slidesToScroll: 1, containScroll: 'trimSnaps' },
            768: { slidesToScroll: 1, containScroll: 'trimSnaps' }
        }
    };

    // Initialize Embla Carousel with Auto Scroll plugin
    const autoScrollPlugin = typeof EmblaCarouselAutoScroll !== 'undefined' 
        ? EmblaCarouselAutoScroll({ speed: 0.6, stopOnInteraction: false })
        : null;
    
    const embla = EmblaCarousel(viewport, options, autoScrollPlugin ? [autoScrollPlugin] : []);

    // Start auto-scroll if plugin is available
    if (autoScrollPlugin) {
        autoScrollPlugin.play();
    } else {
        // Fallback: manual auto-scroll using setInterval
        let scrollInterval = setInterval(function() {
            if (viewport.matches(':hover')) return;
            embla.scrollNext();
        }, 3000);
        
        window.addEventListener('beforeunload', function() {
            clearInterval(scrollInterval);
        });
    }

    // Get slide nodes from embla
    const slideNodes = embla.slideNodes();

    // Active slide highlighting
    const updateActiveSlide = () => {
        const selectedIndex = embla.selectedScrollSnap();
        
        slideNodes.forEach((slideNode, index) => {
            if (index === selectedIndex) {
                slideNode.classList.add('gallery__slide--active');
            } else {
                slideNode.classList.remove('gallery__slide--active');
            }
        });
    };

    // Parallax effect for images - smooth horizontal movement
    const applyParallax = () => {
        slideNodes.forEach((slideNode, index) => {
            const img = slideNode.querySelector('img');
            if (!img) return;

            // Get slide position relative to viewport
            const slideRect = slideNode.getBoundingClientRect();
            const viewportCenter = window.innerWidth / 2;
            const slideCenter = slideRect.left + slideRect.width / 2;

            // Smooth horizontal movement - increased amplitude
            const translateX = (viewportCenter - slideCenter) / slideRect.width * 11.25;

            img.style.transform = `scale(1.2) translateX(${translateX}%)`;
            img.style.transformOrigin = 'center center';
        });
    };

    // Apply effects on scroll and init
    embla.on('select', updateActiveSlide);
    embla.on('init', () => {
        updateActiveSlide();
        applyParallax();
    });
    embla.on('scroll', applyParallax);

    // Also apply on window resize
    window.addEventListener('resize', applyParallax);

    // Initial scale for all images
    slideNodes.forEach((slideNode) => {
        const img = slideNode.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.2)';
            img.style.transformOrigin = 'center center';
        }
    });

    // Setup navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (autoScrollPlugin) {
                autoScrollPlugin.stop();
                setTimeout(function() { autoScrollPlugin.play(); }, 500);
            }
            embla.scrollPrev();
        });

        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (autoScrollPlugin) {
                autoScrollPlugin.stop();
                setTimeout(function() { autoScrollPlugin.play(); }, 500);
            }
            embla.scrollNext();
        });

        // Also support touch events
        prevBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            embla.scrollPrev();
        });

        nextBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            embla.scrollNext();
        });
    }

    // Click on slide to open lightbox
    slides.forEach(function(slide, index) {
        slide.addEventListener('click', function() {
            openLightboxFromCarousel(index);
        });
    });

    // Store embla instance globally for lightbox access
    window.galleryEmbla = embla;
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    const hero = document.querySelector('.hero');
    const nextSectionTitle = document.querySelector('.advantages .section-title');
    if (!header || !hero) return;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const headerHeight = header.offsetHeight;

        // Получаем позицию заголовка следующей секции
        let triggerPosition = 0;
        if (nextSectionTitle) {
            const titleRect = nextSectionTitle.getBoundingClientRect();
            triggerPosition = currentScroll + titleRect.top - headerHeight;
        } else {
            // Фоллбэк: используем высоту hero секции
            triggerPosition = hero.offsetHeight - 100;
        }

        // Меняем прозрачность, когда меню достигает заголовка следующей секции
        if (currentScroll >= triggerPosition) {
            header.classList.add('header--transparent');
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.classList.remove('header--transparent');
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

/**
 * Hero Section Parallax Effect
 */
function initHeroParallax() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (!hero) return;

        const heroHeight = hero.offsetHeight;

        // Apply parallax only when hero section is in viewport
        if (scrolled < heroHeight) {
            // Move background at different speed than scroll
            heroBg.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });
}

/**
 * Directions Section Parallax Effect
 */
function initDirectionsParallax() {
    const directionsBg = document.querySelector('.directions__bg');
    if (!directionsBg) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const directions = document.querySelector('.directions');

        if (!directions) return;

        const rect = directions.getBoundingClientRect();
        const directionsTop = rect.top + scrolled;
        const directionsHeight = directions.offsetHeight;
        const windowHeight = window.innerHeight;

        // Apply parallax when directions section is in viewport
        if (scrolled + windowHeight > directionsTop && scrolled < directionsTop + directionsHeight) {
            // Calculate scroll position relative to section
            const relativeScroll = scrolled - directionsTop;
            const parallaxSpeed = 0.35;
            
            // Move background at different speed than scroll
            directionsBg.style.transform = 'translateY(' + (relativeScroll * parallaxSpeed) + 'px)';
        }
    });
}

/**
 * Lightbox for Gallery
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    if (!lightbox || !lightboxImage) return;

    let currentIndex = 0;
    let images = [];

    // Collect images from carousel slides
    function collectImages() {
        images = [];
        const slides = document.querySelectorAll('.gallery__slide');
        slides.forEach(function(slide, index) {
            const img = slide.querySelector('img');
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt
                });
            }
        });
    }

    function openLightbox(image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    // Expose function for carousel
    window.openLightboxFromCarousel = function(index) {
        collectImages();
        currentIndex = index;
        if (images[currentIndex]) {
            openLightbox(images[currentIndex]);
        }
    };
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const phoneInput = document.getElementById('phone');
    
    if (!form) return;
    
    // Phone mask
    if (phoneInput) {
        initPhoneMask(phoneInput);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate
        if (!data.name || data.name.trim() === '') {
            showMessage('Пожалуйста, введите ваше имя', 'error');
            return;
        }

        if (!data.phone || data.phone.trim() === '') {
            showMessage('Пожалуйста, введите ваш телефон', 'error');
            return;
        }

        // Check consent checkbox
        const consentCheckbox = document.getElementById('consent');
        if (!consentCheckbox || !consentCheckbox.checked) {
            showMessage('Необходимо дать согласие на обработку персональных данных', 'error');
            return;
        }

        // Here you would normally send the data to a server
        // For now, we'll simulate a successful submission
        console.log('Form submitted:', data);

        // Simulate API call
        form.querySelector('.form__btn').disabled = true;
        form.querySelector('.form__btn').textContent = 'Отправка...';

        setTimeout(function() {
            showMessage('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();
            form.querySelector('.form__btn').disabled = false;
            form.querySelector('.form__btn').textContent = 'Отправить заявку';
        }, 1500);
    });
    
    function showMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'form__message ' + type;
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                formMessage.textContent = '';
                formMessage.className = 'form__message';
            }, 5000);
        }
    }
}

/**
 * Phone Input Mask
 */
function initPhoneMask(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length === 0) {
            e.target.value = '';
            return;
        }
        
        // Add country code if not present
        if (value[0] === '8') {
            value = '7' + value.slice(1);
        } else if (value[0] !== '7') {
            value = '7' + value;
        }
        
        // Format the phone number
        let formatted = '+7';
        
        if (value.length > 1) {
            formatted += ' (' + value.slice(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.slice(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.slice(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.slice(9, 11);
        }
        
        e.target.value = formatted;
    });
    
    input.addEventListener('keydown', function(e) {
        // Allow backspace, delete, arrow keys
        if (e.key === 'Backspace' || e.key === 'Delete' ||
            e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            return;
        }
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other items
            faqItems.forEach(function(otherItem) {
                const otherQuestion = otherItem.querySelector('.faq__question');
                if (otherQuestion && otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            question.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            item.classList.toggle('active');
        });
    });
}

/**
 * Moving Letters Effect #12 for Hero Title
 */
function initMovingLetters() {
    const textWrapper = document.querySelector('.ml12');
    if (!textWrapper || typeof anime === 'undefined') return;

    // Anime.js timeline for the effect
    anime.timeline({loop: true})
        .add({
            targets: '.ml12 .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: function(el, i) {
                return 500 + 30 * i;
            }
        })
        .add({
            targets: '.ml12 .letter',
            translateX: [0, -30],
            opacity: [1, 0],
            easing: "easeInExpo",
            duration: 1100,
            delay: function(el, i) {
                return 100 + 30 * i;
            }
        });
}

/**
 * Calculator
 */
function initCalculator() {
    const productType = document.getElementById('productType');
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const materialSelect = document.getElementById('material');
    const optPaint = document.getElementById('optPaint');
    const optDelivery = document.getElementById('optDelivery');
    const optInstall = document.getElementById('optInstall');
    const optDesign = document.getElementById('optDesign');
    const totalPriceEl = document.getElementById('totalPrice');

    if (!totalPriceEl) return;

    // Базовые цены за м²/м.п. для разных типов изделий
    const basePrices = {
        ladder: 15000,      // за м.п. длины
        railing: 8000,      // за м.п. длины
        fence: 10000,       // за м² (длина * высота)
        awning: 12000,      // за м²
        gazebo: 25000,      // за м³ (длина * ширина * высота)
        metal: 10000        // за м³
    };

    // Коэффициенты материалов
    const materialCoefficients = {
        steel: 1,
        stainless: 1.3,
        aluminum: 1.5
    };

    // Цены на дополнительные опции
    const optionsPrices = {
        paint: 2000,        // за м²
        delivery: 5000,     // фиксированная
        install: 3000,      // за м²
        design: 10000       // фиксированная
    };

    function calculatePrice() {
        const type = productType.value;
        const length = parseFloat(lengthInput.value) || 0;
        const width = parseFloat(widthInput.value) || 0;
        const height = parseFloat(heightInput.value) || 0;
        const material = materialSelect.value;

        let basePrice = basePrices[type] || 0;
        let area = 0;

        // Активация/деактивация полей в зависимости от типа изделия
        updateFieldsState(type);

        // Расчёт площади/длины в зависимости от типа изделия
        switch (type) {
            case 'ladder':
            case 'railing':
                // Для лестниц и перил считаем по длине
                area = length;
                break;
            case 'fence':
                // Для ограждений считаем площадь (длина * ширина * высота)
                area = length * width * height;
                break;
            case 'awning':
                // Для навесов считаем площадь (длина * ширина)
                area = length * width;
                break;
            case 'gazebo':
                // Для беседок считаем объём (длина * ширина * высота)
                area = length * width * height;
                break;
            case 'metal':
                // Для металлоконструкций считаем объём (длина * ширина * высота)
                area = length * width * height;
                break;
        }

        // Базовая стоимость
        let total = basePrice * area;

        // Коэффициент материала
        const materialCoeff = materialCoefficients[material] || 1;
        total *= materialCoeff;

        // Дополнительные опции
        if (optPaint && optPaint.checked) {
            total += optionsPrices.paint * area;
        }

        if (optDelivery && optDelivery.checked) {
            total += optionsPrices.delivery;
        }

        if (optInstall && optInstall.checked) {
            total += optionsPrices.install * area;
        }

        if (optDesign && optDesign.checked) {
            total += optionsPrices.design;
        }

        // Округляем до сотен
        total = Math.round(total / 100) * 100;

        // Форматируем число с пробеллами (15 000)
        totalPriceEl.textContent = total.toLocaleString('ru-RU');
    }

    function updateFieldsState(type) {
        // Для лестниц и перил: активно только поле длины
        // Для навесов: активны длина и ширина
        // Для ограждений, беседок и металлоконструкций: активны все поля
        switch (type) {
            case 'ladder':
            case 'railing':
                lengthInput.disabled = false;
                widthInput.disabled = true;
                heightInput.disabled = true;
                widthInput.value = '';
                heightInput.value = '';
                break;
            case 'awning':
                lengthInput.disabled = false;
                widthInput.disabled = false;
                heightInput.disabled = true;
                heightInput.value = '';
                break;
            case 'fence':
            case 'gazebo':
            case 'metal':
                lengthInput.disabled = false;
                widthInput.disabled = false;
                heightInput.disabled = false;
                break;
        }
    }

    // Навешиваем обработчики на все элементы
    const inputs = [productType, lengthInput, widthInput, heightInput, materialSelect];
    const checkboxes = [optPaint, optDelivery, optInstall, optDesign];

    inputs.forEach(function(input) {
        if (input) {
            input.addEventListener('input', calculatePrice);
            input.addEventListener('change', calculatePrice);
            input.addEventListener('keyup', calculatePrice);
        }
    });

    checkboxes.forEach(function(checkbox) {
        if (checkbox) {
            checkbox.addEventListener('change', calculatePrice);
        }
    });

    // Первичный расчёт и инициализация состояния полей
    updateFieldsState(productType.value);
    calculatePrice();
}
