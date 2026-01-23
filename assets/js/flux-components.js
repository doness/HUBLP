/**
 * FLUXPRO-INSPIRED JAVASCRIPT COMPONENTS
 * Enhanced interactions and animations
 */

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================
function initSmoothScrollEnhancement() {
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;

        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target && !this.hasAttribute('onclick')) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ENHANCED CARD ANIMATIONS
// ============================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// ENHANCED MODAL
// ============================================
function initEnhancedModal() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        // Close on backdrop click
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Prevent body scroll when modal is open
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('show')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        observer.observe(modal, { attributes: true });
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                pointer-events: none;
            `;
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate-slide-down`;
        toast.style.cssText = `
            background: var(--panel);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 16px 20px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: var(--shadow-lg);
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--text);
        `;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const colors = {
            success: 'var(--success)',
            error: 'var(--danger)',
            warning: 'var(--warning)',
            info: 'var(--info)'
        };

        toast.innerHTML = `
            <span style="color: ${colors[type]}; font-size: 20px; font-weight: bold;">${icons[type]}</span>
            <span style="flex: 1;">${message}</span>
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// ============================================
// ENHANCED FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            // Add validation on blur
            input.addEventListener('blur', function () {
                validateInput(this);
            });

            // Remove error on input
            input.addEventListener('input', function () {
                if (this.classList.contains('input-error')) {
                    this.classList.remove('input-error');
                    const error = this.parentElement.querySelector('.error-message');
                    if (error) error.remove();
                }
            });
        });

        form.addEventListener('submit', function (e) {
            let isValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                Toast.show('Please fill in all required fields', 'error');
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    input.classList.remove('input-error');

    // Check if required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation (basic)
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    if (!isValid) {
        input.classList.add('input-error');
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.cssText = `
            color: var(--danger);
            font-size: 14px;
            margin-top: 4px;
        `;
        error.textContent = errorMessage;
        input.parentElement.appendChild(error);
    }

    return isValid;
}

// Add input error style
const inputErrorStyle = document.createElement('style');
inputErrorStyle.textContent = `
    .input-error {
        border-color: var(--danger) !important;
        box-shadow: 0 0 0 3px var(--danger-light) !important;
    }
`;
document.head.appendChild(inputErrorStyle);

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Add reveal styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    [data-reveal] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-reveal].revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// ============================================
// LOADING STATE
// ============================================
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.style.opacity = '0.7';
        button.innerHTML = `
            <span class="spinner" style="display: inline-block; margin-right: 8px;"></span>
            Loading...
        `;
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.innerHTML = button.dataset.originalText;
    }
}

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
function initFluxComponents() {
    console.log('🎨 Initializing FluxPro-inspired components...');

    initSmoothScrollEnhancement();
    initCardAnimations();
    initButtonRipple();
    initEnhancedModal();
    initFormValidation();
    initParallax();
    initScrollReveal();

    console.log('✅ FluxPro components initialized successfully!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFluxComponents);
} else {
    initFluxComponents();
}

// Export for global use
window.FluxComponents = {
    Toast,
    setLoadingState,
    validateInput
};
