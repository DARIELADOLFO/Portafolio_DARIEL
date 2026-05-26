/* 
   PORTAFOLIO PREMIUM - ING. DARIEL PEÑA
    */

document.addEventListener('DOMContentLoaded', function () {

    // 
    // 1. INICIALIZACIÓN DE IDIOMA POR DEFECTO
    // 
    const savedLang = localStorage.getItem('portfolio_lang') || 'es';
    document.documentElement.className = savedLang;

    // 
    // 2. EFECTO DE SCROLL EN NAVBAR
    // 
    const mainNav = document.getElementById('mainNav');
    function checkNavbarScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', checkNavbarScroll);
    checkNavbarScroll(); // Comprobar estado inicial

    // 
    // 3. BOTÓN SCROLL TO TOP (VOLVER ARRIBA)
    // 
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    function checkScrollTopButton() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', checkScrollTopButton);
    checkScrollTopButton(); // Comprobar estado inicial

    // 
    // 4. ANIMACIÓN FADE-IN EN SCROLL (INTERSECTION OBSERVER)
    // 
    const fadeEls = document.querySelectorAll('.fade-in-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    fadeEls.forEach(el => fadeObserver.observe(el));

    // 
    // 5. INICIALIZACIÓN DE CARRUSELES (SWIPER.JS)
    // 

    // SWIPER 1 - Carrusel de Proyectos en Python (Streamlit / ML)
    document.querySelectorAll('.mySwiper').forEach(function (el) {
        new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev')
            },
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
            }
        });
    });

    // SWIPER 2 - Carrusel de Videos de YouTube
    const swiper2El = document.querySelector('.mySwiper2');
    if (swiper2El) {
        new Swiper(swiper2El, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: swiper2El.querySelector('.swiper-pagination'),
                clickable: true
            },
            navigation: {
                nextEl: swiper2El.querySelector('.swiper-button-next'),
                prevEl: swiper2El.querySelector('.swiper-button-prev')
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

    // 
    // 6. CONTADORES NUMÉRICOS ANIMADOS (STATS)
    // 
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsSection = document.querySelector('#stats-section');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                    counterObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(statsSection);
    }

    function animateCounters() {
        const duration = 2500; // duración en ms
        counters.forEach(function (counter) {
            const target = +counter.getAttribute('data-target');
            const stepTime = Math.max(Math.floor(duration / target), 30);
            let current = 0;

            const timer = setInterval(function () {
                current++;
                if (current >= target) {
                    clearInterval(timer);
                    counter.innerText = formatEndText(target);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    }

    function formatEndText(num) {
        if (num === 4) return "+3";
        if (num === 10) return "10+";
        if (num === 60) return "60%";
        return num;
    }

    // 
    // 7. AUTO-BUSQUEDA DE THUMBNAILS DE YOUTUBE
    // 
    document.querySelectorAll('.youtube-card').forEach(function (card) {
        const link = card.querySelector('a');
        if (!link) return;
        const url = link.getAttribute('href');
        if (!url) return;

        let videoId = "";
        if (url.includes('watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        }

        if (videoId) {
            const thumb = card.querySelector('.youtube-thumbnail');
            if (thumb && (!thumb.src || thumb.src === "" || thumb.src.includes('placeholder'))) {
                // Usar maxresdefault para alta calidad
                thumb.src = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
                // Fallback por si maxresdefault no existe
                thumb.onerror = function () {
                    thumb.src = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
                };
            }
        }
    });

    // 
    // 8. SEGUIMIENTO DE SECCIONES ACTIVAS EN MENU
    // 
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.style.color = '';
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--accent-cyan)';
                link.classList.add('active');
            }
        });
    });
});

// 
// 9. FUNCIÓN DE CAMBIO DE IDIOMA (GLOBAL)
// 
function toggleLanguage() {
    const html = document.documentElement;
    if (html.classList.contains('es')) {
        html.classList.remove('es');
        html.classList.add('en');
        localStorage.setItem('portfolio_lang', 'en');
    } else {
        html.classList.remove('en');
        html.classList.add('es');
        localStorage.setItem('portfolio_lang', 'es');
    }
}

// 
// 10. DETALLES DEL ACORDEÓN (PREVIEWS COLLAPSE)
// 
function toggleDetails(element) {
    const details = element.nextElementSibling;
    if (!details) return;
    const isOpen = details.style.display === 'block';

    // Cerrar todas las descripciones abiertas en el mismo acordeón para mantener orden
    const parent = element.closest('.card-body');
    if (parent) {
        parent.querySelectorAll('.course-details').forEach(function (d) {
            d.style.display = 'none';
        });
    }

    details.style.display = isOpen ? 'none' : 'block';
}

// 
// 11. MODAL DE CERTIFICADOS + CONFETTI FUEGOS
// 
function openCertModal(src) {
    document.getElementById('certImageFull').src = src;
    $('#certModal').modal('show');

    // Explosión de confeti súper estética
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#00f2fe', '#4da3ff', '#ffffff']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#00f2fe', '#4da3ff', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
