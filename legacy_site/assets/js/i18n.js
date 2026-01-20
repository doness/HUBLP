
let currentLang = 'en';
let translations = {};

// Fallback translations (English) to ensure site works even if fetch fails (e.g. CORS/local file)
const DEFAULT_TRANSLATIONS = {
    "nav-features": "Features",
    "nav-pricing": "Pricing",
    "nav-login": "Client Login",
    "nav-try": "Try Free",
    "hero-title": "Run your work in one place",
    "hero-subtitle": "Aika Nexus is a modular work management platform for teams, startups, and enterprises. Start free. Scale with CRM, payroll, or fully custom controls.",
    "hero-cta-primary": "Start Free Trial",
    "hero-cta-secondary": "View Pricing",
    "trust-1": "No credit card required",
    "trust-2": "14-day free trial",
    "trust-3": "Cancel anytime",
    "stat-1": "Companies Trust Us",
    "stat-2": "Active Users",
    "stat-3": "Uptime",
    "stat-4": "User Rating",
    "testimonial-title": "What our customers say",
    "testimonial-subtitle": "Trusted by growing businesses across Indonesia",
    "testimonial-1-text": "\"Aika has streamlined our project management completely. We went from multiple tools to just one platform. The team collaboration features are fantastic!\"",
    "testimonial-1-name": "Budi Santoso",
    "testimonial-1-role": "Operations Manager, Karya Digital",
    "testimonial-2-text": "\"The HR module saved us countless hours. Simple to use, and perfect for our field teams. Highly recommended!\"",
    "testimonial-2-name": "Siti Rahma",
    "testimonial-2-role": "HR Director, Maju Logistics",
    "testimonial-3-text": "\"Finally, a solution that understands Indonesian business needs. Invoice features work perfectly with our accounting!\"",
    "testimonial-3-name": "Andi Wijaya",
    "testimonial-3-role": "CEO, Nusantara Ventures",
    "testimonial-4-text": "\"The custom reporting saved our accounting team so much time. Integration with existing tools was seamless. Great investment!\"",
    "testimonial-4-name": "Dewi Lestari",
    "testimonial-4-role": "Finance Manager, Cemerlang Corp",
    "testimonial-5-text": "\"Customer support is outstanding. They helped us migrate from our old system smoothly. The training materials are excellent too!\"",
    "testimonial-5-name": "Rudi Hartono",
    "testimonial-5-role": "IT Director, Berkah Tech",
    "testimonial-6-text": "\"Best decision for our startup. Affordable pricing with enterprise features. The mobile app keeps our remote team connected!\"",
    "testimonial-6-name": "Linda Kusuma",
    "testimonial-6-role": "Founder, Inovasi Digital",
    "testimonial-7-text": "\"Implementation was quick and painless. The team was up and running within days. Data import from our old system was flawless!\"",
    "testimonial-7-name": "Fajar Rahman",
    "testimonial-7-role": "COO, Pesona Jaya",
    "testimonial-8-text": "\"The payroll module handles all Indonesian tax calculations perfectly. Saves us from expensive accounting software. Worth every rupiah!\"",
    "testimonial-8-name": "Maya Sari",
    "testimonial-8-role": "CFO, Sentosa Group",
    "features-title": "Everything teams need to operate",
    "features-subtitle": "Projects, HR, finance, and optional sales tools without the tool sprawl.",
    "feature-1-title": "Projects & Tasks",
    "feature-1-desc": "Plan work, track progress, and assign ownership with intuitive boards and timelines.",
    "feature-2-title": "HR & Attendance",
    "feature-2-desc": "Employees, roles, leave management, and time tracking all in one place.",
    "feature-3-title": "Finance",
    "feature-3-desc": "Invoices, payments, expenses, and contracts with full reporting.",
    "feature-4-title": "CRM (Add-on)",
    "feature-4-desc": "Leads, clients, and sales pipelines when you need them.",
    "feature-5-title": "Analytics",
    "feature-5-desc": "Real-time insights and custom reports to drive better decisions.",
    "feature-6-title": "Security",
    "feature-6-desc": "Enterprise-grade security with role-based access control.",
    "pricing-title": "Pricing",
    "pricing-subtitle": "Start free. Upgrade only when you need more.",
    "billing-monthly": "Monthly",
    "billing-yearly": "Yearly (Save 20%)",
    "per-month": "month",
    "per-year": "year",
    "plan-free-name": "Free",
    "plan-free-1": "Up to 5 employees",
    "plan-free-2": "Projects & HR basic",
    "plan-free-3": "5GB storage",
    "plan-free-4": "Community support",
    "plan-essential-name": "Essential",
    "plan-essential-1": "Up to 50 employees",
    "plan-essential-2": "50 GB storage",
    "plan-essential-3": "Email support",
    "plan-essential-4": "Advanced reporting",
    "plan-business-name": "Business",
    "plan-business-1": "Up to 100 employees",
    "plan-business-2": "200 GB storage",
    "plan-business-3": "Priority support",
    "plan-business-4": "Custom integrations",
    "plan-business-5": "API access",
    "plan-custom-name": "Enterprise",
    "plan-custom-price": "Custom",
    "plan-custom-1": "Unlimited employees",
    "plan-custom-2": "Unlimited storage",
    "plan-custom-3": "Dedicated support",
    "plan-custom-4": "Custom features",
    "plan-custom-5": "SLA guarantee",
    "badge-popular": "Most Popular",
    "plan-cta": "Get Started",
    "plan-contact": "Contact Sales",
    "faq-title": "Frequently Asked Questions",
    "faq-subtitle": "Everything you need to know about Aika",
    "faq-1-q": "How does the free trial work?",
    "faq-1-a": "You get 14 days of full access to all features. No credit card required. You can cancel anytime during the trial period.",
    "faq-2-q": "Can I change plans later?",
    "faq-2-a": "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    "faq-3-q": "What payment methods do you accept?",
    "faq-3-a": "We accept bank transfers, credit cards, and Indonesian payment methods. Enterprise plans can be invoiced.",
    "faq-4-q": "Is my data secure?",
    "faq-4-a": "Absolutely. We use enterprise-grade encryption, regular backups, and comply with international security standards.",
    "faq-5-q": "Do you offer training and support?",
    "faq-5-a": "Yes! We provide comprehensive documentation, video tutorials, and dedicated support based on your plan.",
    "cta-title": "Need a custom solution?",
    "cta-subtitle": "Let's discuss your specific requirements. Get a personalized quote and demo tailored to your business needs.",
    "cta-button": "Request Custom Quote",
    "footer-invoice": "Invoice & VAT supported",
    "footer-support": "24/7 Support",
    "calc-title": "Custom Plan Calculator",
    "calc-subtitle": "Estimate your custom plan cost.",
    "calc-minimum": "minimum applies*",
    "calc-tooltip": "Custom plans have a minimum monthly commitment of Rp 1.500.000.",
    "calc-employees": "Number of employees",
    "calc-billing": "Billing cycle",
    "calc-email": "Email address",
    "calc-company": "Company name",
    "calc-phone": "Phone number",
    "calc-storage": "Additional Storage",
    "calc-modules": "Select modules",
    "module-project": "Project & Tasks",
    "module-hr": "HR & Attendance",
    "module-crm": "CRM",
    "module-payroll": "Payroll",
    "module-assets": "Asset Tracking",
    "module-performance": "Performance Review (KPI, 1-on-1)",
    "module-career": "Career Site (Job Portal)",
    "core-badge": "Core Platform",
    "core-tooltip": "Required foundation for your workspace",
    "storage-none": "No additional storage",
    "storage-100": "+100 GB (Rp 75.000)",
    "storage-500": "+500 GB (Rp 300.000)",
    "storage-1000": "+1 TB (Rp 500.000)",
    "storage-5000": "+5 TB (Rp 2.000.000)",
    "calc-button": "Calculate & Request Quote",
    "calc-result-title": "Estimated cost",
    "calc-result-base": "Base estimate",
    "calc-result-tax": "Tax (11% PPN)",
    "calc-result-minimum": "Minimum applied",
    "calc-result-storage": "Storage",
    "calc-contact-title": "Want more details?",
    "calc-contact-desc": "Get a personalized demo and detailed quotation from our team.",
    "calc-contact-button": "Request Demo & Quotation",
    "calc-contact-success": "Your quote request is ready! Redirecting to WhatsApp to complete the request...",
    "calc-contact-error": "Please fill in all required fields (Company name, Your name, Email, Phone)",
    "billing-monthly": "Monthly",
    "billing-yearly": "Yearly (Save 20%)",
    "cookie-text": "We use cookies to ensure you get the best experience on our website.",
    "cookie-accept": "Accept",
    "cookie-decline": "Decline",
    "cookie-policy": "Privacy Policy",
    "powerhouse-title": "Your productivity powerhouse",
    "powerhouse-intro": "Stay organized and efficient with Projects, HR, and Analytics. Every task, employee, or metric finds its place, keeping you at the top of your game.",
    "powerhouse-card1-title": "Projects & Tasks",
    "powerhouse-card1-desc": "When it's on your mind, it goes in your board. Capture your to-dos from anywhere, anytime.",
    "powerhouse-card2-title": "HR & Attendance",
    "powerhouse-card2-desc": "Your employee list may be long, but it can be manageable! Keep tabs on everything from \"onboarding\" to \"performance reviews\".",
    "powerhouse-card3-title": "Analytics Dashboard",
    "powerhouse-card3-desc": "Drag, drop, get it done. Snap your top metrics into your dashboard and make time for what truly matters."
};

export async function initTranslations() {
    // Check localStorage
    const savedLang = localStorage.getItem('siteLang');
    if (savedLang && ['en', 'id', 'zh-CN', 'ja'].includes(savedLang)) {
        currentLang = savedLang;
    } else {
        // Simple auto-detect
        const browserLang = navigator.language;
        if (browserLang.includes('id')) currentLang = 'id';
        else if (browserLang.includes('zh')) currentLang = 'zh-CN';
        else if (browserLang.includes('ja')) currentLang = 'ja';
    }

    await loadLanguage(currentLang);
}

async function loadLanguage(lang) {
    const jsonPath = `assets/locales/${lang}.json`;
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Failed to load translations');
        translations = await response.json();
    } catch (error) {
        console.warn('Error loading language (likely local file fallback needed):', error);
        // Fallback to embedded default translations if loading fails (e.g. CORS)
        if (lang === 'en') {
            translations = DEFAULT_TRANSLATIONS;
        } else {
            // For other languages, try to fallback to EN if ID/CN fetch fails
            console.warn('Falling back to English defaults due to fetch error');
            translations = DEFAULT_TRANSLATIONS;
            currentLang = 'en'; // Reset to EN
        }
    }

    // Always apply translations if we have them
    if (translations && Object.keys(translations).length > 0) {
        currentLang = lang;
        localStorage.setItem('siteLang', lang);
        applyTranslations();
        updateLangDisplay();
    }
}

export function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        } else {
            console.warn(`Missing translation for key: ${key}`);
        }
    });
}

function updateLangDisplay() {
    const display = document.getElementById('langDisplay');
    if (display) {
        const langMap = { 'zh-CN': 'CN', 'ja': 'JP' };
        display.textContent = langMap[currentLang] || currentLang.toUpperCase();
    }
    document.documentElement.lang = currentLang;
}

export async function toggleLanguage() {
    let nextLang = 'en';
    if (currentLang === 'en') nextLang = 'id';
    else if (currentLang === 'id') nextLang = 'zh-CN';
    else if (currentLang === 'zh-CN') nextLang = 'ja';
    else nextLang = 'en';

    await loadLanguage(nextLang);

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: nextLang } }));
}

export function t(key) {
    return translations[key] || key;
}

export function getCurrentLang() {
    return currentLang;
}
