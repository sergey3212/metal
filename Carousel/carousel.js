/**
 * Carousel with Embla Carousel + Auto Scroll Plugin
 * Effects:
 * - Continuous auto-scroll
 * - Parallax effect on images (horizontal movement based on position)
 * - Active slide highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const viewport = document.getElementById('carouselViewport');
    const prevBtn = document.querySelector('.carousel__prev');
    const nextBtn = document.querySelector('.carousel__next');

    if (!viewport || typeof EmblaCarousel === 'undefined') return;

    const slides = viewport.querySelectorAll('.carousel__slide');

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
                slideNode.classList.add('carousel__slide--active');
            } else {
                slideNode.classList.remove('carousel__slide--active');
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

            // Smooth horizontal movement - amplitude controls the intensity
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
}
