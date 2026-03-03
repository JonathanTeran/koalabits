// Koalabits - High-End Modern Interactions

function initAnimations() {

    // 1. Initial Load Animations
    setTimeout(() => {
        document.querySelectorAll('.slide-up, .fade-in').forEach(el => {
            // we don't need scroll observer for elements above the fold
            // if they are in viewport immediately, activate them.
            el.classList.add('active');
        });
    }, 50);

    // 2. Scroll Reveal (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Form simulation
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Procesando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '¡Solicitud enviada exitosamente!';
                btn.style.background = '#10b981'; // Success green
                btn.style.borderColor = '#10b981';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--primary)';
                    btn.style.borderColor = 'transparent';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3500);
            }, 1000);
        });
    }
}

// Ejecutar inmediatamente
initAnimations();

// --------------------------------------------------------
// NEW PRO FEATURES: Preloader, Magnetic Hover, FAQ
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER: Dissolve smoothly after content loads
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Small delay to ensure minimum visible time for aesthetics
            setTimeout(() => {
                preloader.classList.add('fade-up');
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 800);
        }
    });

    // 2. MAGNETIC HOVER EFFECT (Service Cards Glow)
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. FAQ ACCORDION LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others first (optional accordion behavior)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                if (otherItem.querySelector('.faq-answer')) {
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                if (answerDiv) {
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                }
            }
        });
    });
});
