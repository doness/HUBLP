
// ==========================================
// i18n & App Logic (Combined for Local Execution)
// ==========================================

let currentLang = 'en';

const LANG_CONFIG = {
    'en': { flag: 'https://ik.imagekit.io/qrnjdv9jd/Aika/flag/united-states.png?tr=w-60', name: 'English' },
    'id': { flag: 'https://ik.imagekit.io/qrnjdv9jd/Aika/flag/indonesia.png?tr=w-60', name: 'Indonesia' },
    'zh-CN': { flag: 'https://ik.imagekit.io/qrnjdv9jd/Aika/flag/china.png?tr=w-60', name: '中文' },
    'ja': { flag: 'https://ik.imagekit.io/qrnjdv9jd/Aika/flag/japan.png?updatedAt=1768408070438', name: '日本語' }
};

// Fallback HTML constants for local file access support (CORS workaround)
const FALLBACK_HEADER = `
<nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
        <div class="logo">
            <img src="https://aika.agency/wp-content/uploads/2025/12/logo-white.png"
                alt="Aika Work Management Platform Logo">
        </div>
        <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
        <div class="nav-links" id="navLinks">
            <a href="index.html#features" data-i18n="nav-features" onclick="event.preventDefault(); window.smoothScroll('#features', 1500); window.closeMobileMenu();">Features</a>
            <a href="index.html#pricing" data-i18n="nav-pricing" onclick="event.preventDefault(); window.smoothScroll('#pricing', 1500); window.closeMobileMenu();">Pricing</a>
            
            <div class="lang-dropdown">
                <button class="lang-btn" onclick="toggleLangDropdown()" aria-label="Select language">
                    <img src="https://ik.imagekit.io/qrnjdv9jd/Aika/flag/united-states.png?tr=w-60" class="flag-icon" id="currentFlag" alt="US Flag">
                    <span style="font-size: 14px; font-weight: 500;">EN</span>
                </button>
                <div class="lang-menu" id="langMenu">
                    <div class="lang-option" onclick="selectLanguage('en')">
                        <img src="https://ik.imagekit.io/qrnjdv9jd/Aika/flag/united-states.png?tr=w-60" class="flag-icon" alt="US"> English
                    </div>
                    <div class="lang-option" onclick="selectLanguage('id')">
                        <img src="https://ik.imagekit.io/qrnjdv9jd/Aika/flag/indonesia.png?tr=w-60" class="flag-icon" alt="ID"> Indonesia
                    </div>
                    <div class="lang-option" onclick="selectLanguage('ja')">
                        <img src="https://ik.imagekit.io/qrnjdv9jd/Aika/flag/japan.png?updatedAt=1768408070438" class="flag-icon" alt="JP"> 日本語
                    </div>
                    <div class="lang-option" onclick="selectLanguage('zh-CN')">
                        <img src="https://ik.imagekit.io/qrnjdv9jd/Aika/flag/china.png?tr=w-60" class="flag-icon" alt="CN"> 中文
                    </div>
                </div>
            </div>


            <a href="https://nexus.aika.agency/login" class="btn btn-secondary" data-i18n="nav-login" rel="noopener">Client Login</a>
            <a href="https://nexus.aika.agency/signup" class="btn btn-primary" data-i18n="nav-try" rel="noopener">Try Free</a>
        </div>
    </div>
</nav>
<div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="closeMobileMenu()"></div>
`;

const FALLBACK_FOOTER = `
<footer role="contentinfo">
    <p>&copy; 2026 Aika Nexus &middot; <span data-i18n="footer-invoice">Invoice & VAT supported</span> &middot; <span data-i18n="footer-support">24/7 Support</span></p>
    <div style="margin-top: 12px;">
        <a href="privacy.html" style="color: var(--muted); margin: 0 8px; font-size: 14px;">Privacy Policy</a>
        <span style="color: var(--muted);">&middot;</span>
        <a href="terms.html" style="color: var(--muted); margin: 0 8px; font-size: 14px;">Terms of Service</a>
    </div>
    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 16px;">
        <a href="https://linkedin.com/company/aikamirai" target="_blank" class="social-icon"><i class="fab fa-linkedin"></i></a>
        <a href="https://instagram.com/aikamirai" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com/aika.agency" target="_blank" class="social-icon"><i class="fab fa-facebook"></i></a>
    </div>
    <div style="margin-top: 16px;">
        <a href="https://www.saashub.com/aika-nexus-hub" target="_blank">
            <img src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1" alt="SaaS Hub" style="max-width: 150px;">
        </a>
    </div>
</footer>
<div id="cookieConsent" class="cookie-consent">
    <h4>&#x1F36A; Cookie Consent</h4>
    <p><span data-i18n="cookie-text">We use cookies...</span> <a href="privacy.html" data-i18n="cookie-policy">Privacy Policy</a>.</p>
    <div class="cookie-actions">
        <button class="cookie-btn decline" onclick="declineCookies()" data-i18n="cookie-decline">Decline</button>
        <button class="cookie-btn accept" onclick="acceptCookies()" data-i18n="cookie-accept">Accept</button>
    </div>
</div>
<div id="feedbackModal" class="modal">
    <div class="modal-content" style="max-width: 400px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;" id="feedbackIcon">&#x2705;</div>
        <h3 id="feedbackTitle">Success</h3>
        <p id="feedbackMessage" style="color: var(--muted); margin-bottom: 24px;">Message</p>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeFeedbackModal()">OK</button>
    </div>
</div>
`;


console.log('Main.js loading (non-module)...');

// Initialize on load




document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Components (Header/Footer) - HANDLED BY ASTRO NOW
    // await loadComponents(); 

    // 2. Initialize Translations
    initTranslations();

    // 3. Initialize Features
    initCarousel();
    initCookieConsent();

    // 4. Attach Listeners
    const calcInputs = ['calcEmp', 'calcBilling', 'calcStorage'];
    calcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calculateCost);
        if (el && id === 'calcEmp') el.addEventListener('input', calculateCost);
    });





    // Attach Pricing Buttons if they exist
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');
    if (monthlyBtn && yearlyBtn) {
        monthlyBtn.onclick = () => toggleBilling('monthly');
        yearlyBtn.onclick = () => toggleBilling('yearly');
    }

    // Language Change Listener
    window.addEventListener('languageChanged', () => {
        const resultDiv = document.getElementById('calcResult');
        if (resultDiv && resultDiv.classList.contains('show')) {
            calculateCost();
        }
        if (monthlyBtn && monthlyBtn.classList.contains('active')) toggleBilling('monthly');
        else if (yearlyBtn && yearlyBtn.classList.contains('active')) toggleBilling('yearly');
    });

    // Close Dropdown on click outside
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.lang-dropdown');
        const menu = document.getElementById('langMenu');
        if (dropdown && !dropdown.contains(e.target) && menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    });

    console.log('Main.js initialization complete.');
});

// loadComponents removed


// =======================
// TRANSLATION FUNCTIONS
// =======================

let translations = {};

function initTranslations() {
    const savedLang = localStorage.getItem('siteLang');
    const validLangs = ['en', 'id', 'zh-CN', 'ja'];

    if (savedLang && validLangs.includes(savedLang)) {
        currentLang = savedLang;
    } else {
        // Default to English
        currentLang = 'en';
    }

    loadTranslations(currentLang);
    applyTranslations();
    updateLangUI();
}

function loadTranslations(lang) {
    // Load from window variables set by locale JS files
    const localeMap = {
        'en': window.LOCALE_EN,
        'id': window.LOCALE_ID,
        'zh-CN': window.LOCALE_ZH_CN,
        'ja': window.LOCALE_JA
    };

    translations = localeMap[lang] || window.LOCALE_EN || {};
    console.log(`Loaded ${lang} translations from locale JS file`);
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}

function updateLangUI() {
    const currentLang = getCurrentLang();
    // Update Dropdown Button (Flag + Text)
    const flagImg = document.getElementById('currentFlag');
    if (flagImg) {
        // Now it's an image, so we update src
        flagImg.src = LANG_CONFIG[currentLang].flag;

        const btn = flagImg.closest('.lang-btn');
        if (btn) {
            const textSpan = btn.querySelector('span:last-child');
            if (textSpan) {
                const map = { 'en': 'EN', 'id': 'ID', 'zh-CN': 'CN', 'ja': 'JP' };
                textSpan.textContent = map[currentLang] || 'EN';
            }
        }
    }
    document.documentElement.lang = currentLang;
}



// Dropdown Logic
window.toggleLangDropdown = function () {
    const menu = document.getElementById('langMenu');
    if (menu) menu.classList.toggle('show');
}

window.selectLanguage = function (lang) {
    if (!LANG_CONFIG[lang]) return;

    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    // Apply changes
    loadTranslations(lang);
    applyTranslations(); // Updates DOM text
    updateLangUI();      // Updates Flag/Nav

    // Dispatch event for other components (calculator)
    window.dispatchEvent(new Event('languageChanged'));

    // Close dropdown
    const menu = document.getElementById('langMenu');
    if (menu) menu.classList.remove('show');
}

// Legacy toggle support (just in case)
window.toggleLanguage = function () {
    let next = 'en';
    if (currentLang === 'en') next = 'id';
    else if (currentLang === 'id') next = 'zh-CN';
    else if (currentLang === 'zh-CN') next = 'ja';
    selectLanguage(next);
}

function t(key) {
    return translations[key] || key;
}

function getCurrentLang() {
    return currentLang;
}

// =======================
// HELPER FUNCTIONS FROM BEFORE
// =======================

// PRICING TOGGLE
function toggleBilling(type) {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');
    if (!monthlyBtn || !yearlyBtn) return;

    monthlyBtn.classList.remove('active');
    yearlyBtn.classList.remove('active');

    const perMonth = t('per-month');
    const perYear = t('per-year');

    if (type === 'monthly') {
        monthlyBtn.classList.add('active');
        const ess = document.getElementById('essentialPrice');
        const biz = document.getElementById('businessPrice');
        if (ess) ess.innerHTML = `Rp 849.000 <span style="font-size: 16px; color: var(--muted);">/ ${perMonth}</span>`;
        if (biz) biz.innerHTML = `Rp 1.749.000 <span style="font-size: 16px; color: var(--muted);">/ ${perMonth}</span>`;
    } else {
        yearlyBtn.classList.add('active');
        const ess = document.getElementById('essentialPrice');
        const biz = document.getElementById('businessPrice');
        if (ess) ess.innerHTML = `Rp 8.150.000 <span style="font-size: 16px; color: var(--muted);">/ ${perYear}</span>`;
        if (biz) biz.innerHTML = `Rp 16.790.000 <span style="font-size: 16px; color: var(--muted);">/ ${perYear}</span>`;
    }
}
// Toggle Module Global Function (Must be global for inline onclick)
window.toggleModule = function (el) {
    if (el.classList.contains('locked')) return;
    el.classList.toggle('active');
    calculateCost();
}

window.toggleBilling = toggleBilling;

// FEATURE SHOWCASE
const featureScreenshots = {
    'dashboard': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/1.jpeg',
    'tasks': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/2.jpeg',
    'attendance': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/3.jpeg',
    'clients': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/4.jpeg',
    'analytics': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/5.jpeg',
    'invoice': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/6.jpeg',
    'project': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/7.jpeg'
};

window.switchFeature = function (featureName) {
    document.querySelectorAll('.feature-card').forEach(card => card.classList.remove('active'));

    const card = document.querySelector(`.feature-card[data-feature="${featureName}"]`);
    if (card) card.classList.add('active');

    const map = {
        'projects': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/2.jpeg',
        'hr': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/3.jpeg',
        'analytics': 'https://ik.imagekit.io/qrnjdv9jd/Aika/hub/5.jpeg'
    };

    const url = featureScreenshots[featureName] || map[featureName];

    const img = document.getElementById('showcase-visual');
    if (img && url) {
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = url;
            img.style.opacity = 1;
        }, 300);
    }
}

// Lightbox
window.openLightbox = function () {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const currentImg = document.getElementById('showcase-visual');

    if (lightbox && lightboxImg && currentImg) {
        lightboxImg.src = currentImg.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeLightbox = function (e) {
    const img = document.getElementById('lightboxImage');
    if (e.target !== img) {
        document.getElementById('imageLightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth Scroll
window.smoothScroll = function (target, duration) {
    var targetEl = document.querySelector(target);
    if (!targetEl) return;
    var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
    var startPosition = window.scrollY;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Mobile Menu
window.toggleMobileMenu = function () {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileMenuOverlay');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (!navLinks) return;

    if (navLinks.classList.contains('active')) {
        window.closeMobileMenu();
    } else {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
    }
}

window.closeMobileMenu = function () {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileMenuOverlay');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (!navLinks) return;

    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
}

window.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.closeMobileMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 768) window.closeMobileMenu(); });


// CALCULATOR LOGIC
function animateNumber(el, start, end) {
    let t0 = null;
    function step(t) {
        if (!t0) t0 = t;
        let p = Math.min((t - t0) / 600, 1);
        el.textContent = Math.floor(start + p * (end - start)).toLocaleString('id-ID');
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

window.calculateCost = function () {
    const empInput = document.getElementById('calcEmp');
    if (!empInput) return;

    const emp = parseInt(empInput.value) || 0;
    const billing = document.getElementById('calcBilling').value;
    const storageOption = parseInt(document.getElementById('calcStorage').value) || 0;

    let raw = 0;
    let modulesCost = 0;

    // Calculate module costs
    document.querySelectorAll('.module.active').forEach(m => {
        const mod = m.dataset.mod;
        let cost = 0;
        if (mod === 'project' || mod === 'hr') cost = emp * 7500;
        if (mod === 'crm') cost = 300000;
        if (mod === 'payroll') cost = 500000;
        if (mod === 'assets') cost = 250000;
        if (mod === 'performance') cost = 250000;
        if (mod === 'career') cost = 250000;

        modulesCost += cost;
        raw += cost;
    });

    // Calculate storage costs
    let storageCost = 0;
    if (storageOption === 100) storageCost = 75000;
    else if (storageOption === 500) storageCost = 300000;
    else if (storageOption === 1000) storageCost = 500000;
    else if (storageOption === 5000) storageCost = 2000000;

    raw += storageCost;

    const min = 1500000;
    let applied = Math.max(raw, min);

    // Final calculation for Total and Tax
    let final = billing === 'yearly' ? applied * 12 * 0.8 : applied;

    // Base Estimate calculation
    let baseEstimateValue = billing === 'yearly' ? modulesCost * 12 * 0.8 : modulesCost;

    // Calculate Tax (11%)
    const tax = final * 0.11;
    const grandTotal = final + tax;

    try {
        const billingText = billing === 'yearly'
            ? (getCurrentLang() === 'en' ? 'yearly' : 'tahunan')
            : (getCurrentLang() === 'en' ? 'monthly' : 'bulanan');

        const res = document.getElementById('calcResult');
        const resultTitle = t('calc-result-title');
        const baseEstimate = t('calc-result-base');
        const taxLabel = t('calc-result-tax');
        const minimumApplied = t('calc-result-minimum');
        const storageLabel = t('calc-result-storage');
        const contactTitle = t('calc-contact-title');
        const contactDesc = t('calc-contact-desc');
        const contactButton = t('calc-contact-button');

        const storageText = storageOption > 0
            ? `${storageLabel}: +${storageOption >= 1000 ? (storageOption / 1000) + ' TB' : storageOption + ' GB'} (Rp ${storageCost.toLocaleString('id-ID')})<br>`
            : '';

        res.innerHTML = `
            <strong>${resultTitle} (${billingText})</strong><br>
            <span style="font-size: 32px; font-weight: 700; color: var(--primary);">Rp <span id="animNum">0</span></span><br><br>
            <small style="color: var(--muted);">
                ${baseEstimate}: Rp ${(baseEstimateValue).toLocaleString('id-ID')}<br>
                ${storageText}
                <b>${taxLabel}: Rp ${tax.toLocaleString('id-ID')}</b><br><br>
                ${minimumApplied}: Rp ${min.toLocaleString('id-ID')}
            </small>
            <hr style="border: none; border-top: 1px solid var(--border); margin: 24px 0;">
            <div style="text-align: center;">
                <strong style="font-size: 16px;">${contactTitle}</strong><br>
                <p style="color: var(--muted); font-size: 14px; margin: 12px 0;">${contactDesc}</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 8px;" onclick="sendQuoteRequest()">
                    ${contactButton}
                </button>
            </div>
        `;
        res.classList.add('show');
        animateNumber(document.getElementById('animNum'), 0, Math.round(grandTotal));
    } catch (err) {
        console.error("Calculation Error", err);
    }
}




window.toggleFAQ = function (el) {
    el.classList.toggle('active');
}

window.sendQuoteRequest = function () {
    const company = document.getElementById('calcCompany').value.trim();
    const name = document.getElementById('calcName').value.trim();
    const email = document.getElementById('calcEmail').value.trim();
    const phone = document.getElementById('calcPhone').value.trim();
    const emp = parseInt(document.getElementById('calcEmp').value) || 0;
    const billing = document.getElementById('calcBilling').value;
    const storageOption = parseInt(document.getElementById('calcStorage').value) || 0;

    if (!company || !name || !email || !phone) {
        window.showFeedback('error', t('calc-contact-error'));
        return;
    }

    let raw = 0;
    let modulesSelected = [];

    document.querySelectorAll('.module.active').forEach(m => {
        const mod = m.dataset.mod;
        const modName = m.querySelector('.module-header').textContent;
        modulesSelected.push(modName);
        if (mod === 'project' || mod === 'hr') raw += emp * 7500;
        if (mod === 'crm') raw += 300000;
        if (mod === 'payroll') raw += 500000;
        if (mod === 'assets') raw += 250000;
        if (mod === 'performance') raw += 250000;
        if (mod === 'career') raw += 250000;
    });

    let storageCost = 0;
    let storageText = t('storage-none');

    if (storageOption === 100) { storageCost = 75000; storageText = '+100 GB'; }
    else if (storageOption === 500) { storageCost = 300000; storageText = '+500 GB'; }
    else if (storageOption === 1000) { storageCost = 500000; storageText = '+1 TB'; }
    else if (storageOption === 5000) { storageCost = 2000000; storageText = '+5 TB'; }

    raw += storageCost;
    const min = 1500000;
    let applied = Math.max(raw, min);
    let final = billing === 'yearly' ? applied * 12 * 0.8 : applied;
    const tax = final * 0.11;
    const grandTotal = final + tax;

    const billingText = billing === 'yearly' ? 'Yearly' : 'Monthly';

    const waText = `*Custom Plan Quote Request - Aika Nexus Hub Platform*

*CONTACT INFORMATION*
Company: ${company}
Name: ${name}
Email: ${email}
Phone: ${phone}

*PLAN CONFIGURATION*
Employees: ${emp}
Cycle: ${billingText}
Modules: ${modulesSelected.join(', ')}
Storage: ${storageText}

*COST BREAKDOWN*
Base Estimate: Rp ${(final).toLocaleString('id-ID')}
Tax (11% PPN): Rp ${tax.toLocaleString('id-ID')}
Minimum Applied: Rp ${min.toLocaleString('id-ID')}

*Total: Rp ${Math.round(grandTotal).toLocaleString('id-ID')} / ${billing === 'yearly' ? 'year' : 'month'}*
${billing === 'yearly' ? '(20% discount applied)' : ''}

Requesting: Demo & Quotation
Submitted: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;

    const waNumber = '6287853911945';
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    window.open(waLink, '_blank');
    window.showFeedback('success', t('calc-contact-success'));
}

window.showFeedback = function (type, message) {
    const modal = document.getElementById('feedbackModal');
    if (!modal) {
        console.error('Feedback modal not found');
        return;
    }

    const icon = document.getElementById('feedbackIcon');
    const titleEl = document.getElementById('feedbackTitle');
    const msgEl = document.getElementById('feedbackMessage');

    if (type === 'success') {
        if (icon) icon.textContent = 'âœ…';
        if (titleEl) titleEl.textContent = getCurrentLang() === 'en' ? 'Review & Send' : 'Periksa & Kirim';
    } else {
        if (icon) icon.textContent = 'âš ï¸';
        if (titleEl) titleEl.textContent = getCurrentLang() === 'en' ? 'Action Required' : 'Tindakan Diperlukan';
    }

    if (msgEl) msgEl.textContent = message;
    modal.classList.add('show');
}

window.closeFeedbackModal = function () {
    const modal = document.getElementById('feedbackModal');
    if (modal) modal.classList.remove('show');
}

window.scrollToCalculator = function () {
    const el = document.querySelector('.calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.initCookieConsent = function () {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.getElementById('cookieConsent');
        if (banner) setTimeout(() => banner.classList.add('show'), 1000);
    }
}

window.acceptCookies = function () {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.getElementById('cookieConsent');
    if (banner) banner.classList.remove('show');
}

window.declineCookies = function () {
    localStorage.setItem('cookieConsent', 'false');
    const banner = document.getElementById('cookieConsent');
    if (banner) banner.classList.remove('show');
}


let carouselInterval; // Global variable to track interval

function initCarousel() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || !dotsContainer) return;

    // Clear existing interval
    if (carouselInterval) clearInterval(carouselInterval);


    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    const isMobile = window.innerWidth <= 768;
    // Calculate how many slides actually fit
    const slideWidth = slides[0].offsetWidth + 24; // 24 is gap from CSS
    const containerWidth = track.parentElement.offsetWidth;
    // Use Math.floor to be safe, but at least 1
    const slidesToShow = Math.max(1, Math.floor(containerWidth / slideWidth));

    // We want to be able to scroll to the very last item
    // If we can show 2 items, and have 10. Max index is 8. (Shows 9, 10).
    // But if we want to center the last one or ensure visibility, standard logic is total - visible.
    // However, for "responsive" feel, let's allow scrolling until the last item is the *first* visible one if needed, 
    // or perfectly aligned at the end. 
    // Best practice: maxSlide = totalSlides - slidesToShow. 
    // But if slidesToShow calculation is slightly off (e.g. 2.1), we might want to round down.

    const maxSlide = Math.max(0, totalSlides - slidesToShow);

    // Reset dots
    dotsContainer.innerHTML = '';
    const numDots = Math.max(1, totalSlides - slidesToShow + 1);

    // Initialize state if not present
    let currentSlide = parseInt(track.getAttribute('data-current') || 0);

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => {
            // Reset interval on interaction
            if (carouselInterval) {
                clearInterval(carouselInterval);
                carouselInterval = setInterval(autoSlide, 5000);
            }
            updateSlide(Math.min(i, maxSlide), track, slides);
        };
        dotsContainer.appendChild(dot);
    }

    const autoSlide = () => {
        let curr = parseInt(track.getAttribute('data-current') || 0);
        if (curr >= maxSlide) curr = 0;
        else curr++;
        updateSlide(curr, track, slides);
    };

    // Start auto-slide
    carouselInterval = setInterval(autoSlide, 5000);

    // Initial render
    updateSlide(currentSlide, track, slides);

    // Setup Drag
    setupDrag(track, slides);
}


// DRAG / SWIPE LOGIC
function setupDrag(track, slides) {
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = parseInt(track.getAttribute('data-current') || 0);

    const slideWidth = slides[0].offsetWidth + 24;
    const containerWidth = track.parentElement.offsetWidth;
    const slidesToShow = Math.max(1, Math.floor(containerWidth / slideWidth));
    const maxSlide = Math.max(0, slides.length - slidesToShow);

    // Touch events
    track.addEventListener('touchstart', touchStart(currentIndex));
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove);

    // Mouse events
    track.addEventListener('mousedown', touchStart(currentIndex));
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
    });
    track.addEventListener('mousemove', touchMove);

    // Disable context menu
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function touchStart(index) {
        return function (event) {
            // Stop auto-scroll on interaction
            if (carouselInterval) {
                clearInterval(carouselInterval);
                carouselInterval = null; // Don't auto-restart immediately to let user read
            }

            currentIndex = parseInt(track.getAttribute('data-current') || 0);
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
            track.closest('.carousel-viewport').style.cursor = 'grabbing';
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentSlideWidth = slides[0].offsetWidth + 24;
            // Calculate delta
            const diff = currentPosition - startPos;
            // Add to the "starting point" of the current slide
            // But we need to know where the current slide *starts* in pixels
            // -currentIndex * width
            const baseTranslate = -currentIndex * currentSlideWidth;
            currentTranslate = baseTranslate + diff;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        track.style.cursor = 'grab';
        track.closest('.carousel-viewport').style.cursor = 'grab';

        const slideWidth = slides[0].offsetWidth + 24;
        const movedBy = currentTranslate - (-currentIndex * slideWidth);

        // Threshold to change slide
        if (movedBy < -100 && currentIndex < maxSlide) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        updateSlide(currentIndex, track, slides);

        // Restart auto-scroll after a delay
        if (!carouselInterval) {
            carouselInterval = setInterval(() => {
                let curr = parseInt(track.getAttribute('data-current') || 0);
                if (curr >= maxSlide) curr = 0;
                else curr++;
                updateSlide(curr, track, slides);
            }, 5000);
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        if (isDragging) {
            track.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(animation);
        }
    }
}


function updateSlide(current, track, slides) {
    track.setAttribute('data-current', current);

    // Ensure we have slides
    if (!slides || slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth + 24; // 24 is gap
    const offset = -current * slideWidth;
    track.style.transform = `translateX(${offset}px)`;

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
    });
}


// Global Resize Listener (outside initCarousel to prevent multiple listeners)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initCarousel();
    }, 250);
});

// Fix Module Click Listeners


// LIGHTBOX LOGIC
function setupImageLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-close">&times;</div>
        <div class="lightbox-content">
            <img src="" alt="Full Preview" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Open logic
    window.openLightbox = function (src) {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close logic
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { img.src = ''; }, 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Esc key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupImageLightbox(); // Initialize Lightbox
});

// Reason Carousel Logic


// Reason Carousel Logic
function initReasonCarousel() {
    const list = document.querySelector('.reasons-list');
    const items = document.querySelectorAll('.reason-item');
    if (!list || items.length === 0) return;

    let currentIndex = 0;
    const itemElement = items[0];
    const itemHeight = itemElement.offsetHeight > 0 ? itemElement.offsetHeight : 100; // Fallback
    const totalItems = items.length;

    function updateCarousel() {
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');

        const containerCenter = 150; // Half of 300px container
        const itemCenter = itemHeight / 2;
        const offset = containerCenter - itemCenter - (currentIndex * itemHeight);

        list.style.transform = `translateY(${offset}px)`;
        currentIndex = (currentIndex + 1) % totalItems;
    }

    updateCarousel();
    setInterval(updateCarousel, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    initReasonCarousel();
});
