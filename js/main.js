// ================================================
// VANILLA JAVASCRIPT - PORTFOLIO
// ================================================

// HAMBURGER MENU FUNKCE
// Spravuje přepínání mobilního menu
class HamburgerMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.hamburger) {
            this.init();
        }
    }

    init() {
        // Klik na hamburger
        this.hamburger.addEventListener('click', () => this.toggle());

        // Klik na link zavře menu
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Zavření menu při kliku mimo
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.hamburger.setAttribute('aria-expanded',
            this.hamburger.classList.contains('active'));
    }

    close() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }
}

// SMOOTH SCROLL FUNKCE
// Zajišťuje hladký scroll na kotvy (CSS scroll-behavior doplnění)
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Ignoruj prázdné hashy
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Focus target pro accessibility
                    target.focus();
                }
            });
        });
    }
}

// FILTROVÁNÍ PROJEKTŮ
// Interaktivní filtrování podle tagů - AI optimizovaná funkce
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');

        if (this.filterButtons.length > 0) {
            this.init();
        }
    }

    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    handleFilter(clickedBtn) {
        // Odeberi 'active' z všech buttonů
        this.filterButtons.forEach(btn => btn.classList.remove('active'));

        // Přidej 'active' na kliknutý button
        clickedBtn.classList.add('active');

        // Získej filter value
        const filterValue = clickedBtn.getAttribute('data-filter');

        // Filtruj karty
        this.projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardTags = card.getAttribute('data-tags');
                if (cardTags && cardTags.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });

        // Accessibility: Oznámení pro screen readery
        const announcement = `Projekty filtrované: ${filterValue === 'all' ? 'Všechny' : filterValue}`;
        this.announceToScreenReaders(announcement);
    }

    // Oznámení pro screen readery
    announceToScreenReaders(text) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.textContent = text;
        document.body.appendChild(liveRegion);

        setTimeout(() => liveRegion.remove(), 1000);
    }
}

// LAZY LOADING OBRÁZKŮ
// Nativní lazy loading s fallback pro starší prohlížeče
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        // Pokud prohlížeč podporuje Intersection Observer
        if ('IntersectionObserver' in window) {
            this.useIntersectionObserver();
        } else {
            // Fallback - načti všechny najednou
            this.loadAllImages();
        }
    }

    useIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Načti obrázek
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }

                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Začni načítat 50px před viditelností
        });

        this.images.forEach(img => imageObserver.observe(img));
    }

    loadAllImages() {
        this.images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// FORMULÁŘ - VALIDACE A SUBMISSION
// Jednoduché client-side validace s přístupností
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validace na change
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validuj všechna pole
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        }
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}Error`);
        let isValid = true;
        let errorMessage = '';

        // Validace: povinné pole
        if (!value) {
            isValid = false;
            errorMessage = 'Toto pole je povinné';
        }
        // Validace: email
        else if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Zadejte platný email';
            }
        }

        // Zobraz/skryj chybu
        if (errorElement) {
            if (isValid) {
                errorElement.textContent = '';
                field.setAttribute('aria-invalid', 'false');
            } else {
                errorElement.textContent = errorMessage;
                field.setAttribute('aria-invalid', 'true');
            }
        }

        return isValid;
    }

    submitForm() {
        // Simulace odeslání - v produkci by to šlo na backend
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        console.log('Formulář odeslán:', data);

        // Uživatelská zpětná vazba
        alert(`Děkuji ${data.name}! Vaší zprávu jsem obdržel. Brzy se vám ozvu.`);

        // Reset formuláře
        this.form.reset();
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.setAttribute('aria-invalid', 'false');
        });
    }
}

// PROGRESS BAR ANIMACE
// Animuje progress bary v About sekci
class ProgressBarAnimation {
    constructor() {
        this.progressBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Triggeruj animaci když je viditelný
                        this.animateBar(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            this.progressBars.forEach(bar => observer.observe(bar));
        } else {
            // Fallback - animuj hned
            this.progressBars.forEach(bar => this.animateBar(bar));
        }
    }

    animateBar(bar) {
        // Animace je v CSS, tady jen triggeríme
        bar.style.animation = 'none';
        setTimeout(() => {
            bar.style.animation = '';
        }, 10);
    }
}

// ACTIVE NAV LINK - HIGHLIGHT při scrollování
// Zvýraznuje navigační link podle aktuální sekce
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (this.sections.length > 0) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
    }

    updateActiveLink() {
        let current = '';

        // Najdi kterou sekci uživatel vidí
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Aktualizuj active class
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// THEME TOGGLE - Budoucí rozšíření
// Připraven na přidání dark/light mode (zatím je jen dark)
class ThemeToggle {
    constructor() {
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        // Respektuj systémový preference
        if (this.prefersDark.matches) {
            this.applyTheme('dark');
        }

        // Sleduj změny systémového preference
        this.prefersDark.addEventListener('change', (e) => {
            this.applyTheme(e.matches ? 'dark' : 'light');
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

// PERFORMANCE MONITORING - Analytics (opt-in)
// Měří Web Vitals pro optimalizaci
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Měří Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log('LCP:', entry.renderTime || entry.loadTime);
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Starší prohlížeče nemají LCP
            }
        }

        // Měří Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window) {
            try {
                let clsScore = 0;
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                            console.log('CLS Score:', clsScore);
                        }
                    }
                });
                observer.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // Starší prohlížeče
            }
        }
    }
}

// ================================================
// INICIALIZACE VŠECH MODULŮ
// ================================================

// Document ready wrapper - čekej na načtení DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Portfolio se načítá...');

    // Inicializuj všechny komponenty
    new HamburgerMenu();
    new SmoothScroll();
    new ProjectFilter();
    new LazyImageLoader();
    new ContactForm();
    new ProgressBarAnimation();
    new ActiveNavLink();
    new ThemeToggle();
    new PerformanceMonitor();

    console.log('✅ Portfolio je připraveno!');
});

// ================================================
// ACCESSIBILITY HELPERS
// ================================================

// Skip to content link (skrytý, ale dostupný pro screen readery)
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.textContent = 'Přejít na hlavní obsah';
skipLink.className = 'skip-to-content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: var(--bg-primary);
    padding: 8px;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Error Boundary pro globální chyby
window.addEventListener('error', (e) => {
    console.error('❌ Chyba:', e.error);
});

// Unhandled Promise Rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled Promise:', e.reason);
});
