// ---------- shared header & footer ----------
const root = document.body.dataset.root || '';

const navItems = [
    ['pages/about.html', 'About Us'],
    ['pages/model.html', 'Our Model'],
    ['pages/curriculum.html', 'Curriculum'],
    ['pages/impact.html', 'Our Impact'],
    ['pages/contact.html', 'Contact Us'],
];

const navLinks = navItems
    .map(([href, label]) => `<li><a href="${root}${href}">${label}</a></li>`)
    .join('');

const siteHeader = document.getElementById('site-header');
if (siteHeader) {
    siteHeader.innerHTML = `
        <nav class="nav-bar" aria-label="Main">
            <a href="${root}index.html" class="logo">
                <img src="${root}assets/DemystifyAI-logo.png" alt="DemystifyAI Home">
            </a>
            <ul class="nav-links">${navLinks}</ul>
        </nav>`;

    // mark the link for the page you're on
    siteHeader.querySelectorAll('.nav-links a').forEach(link => {
        if (new URL(link.href).pathname === location.pathname) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

const siteFooter = document.getElementById('site-footer');
if (siteFooter) {
    siteFooter.innerHTML = `
        <div class="footer-top">
            <div class="footer-brand">
                <a href="${root}index.html" class="footer-logo">
                    <img src="${root}assets/DemystifyAI-logo.png" alt="DemystifyAI Home">
                </a>
                <p class="footer-tagline">Bridging the AI &amp; Digital Divide.</p>
                <a href="https://www.linkedin.com/company/demystifyaichicago/" class="footer-social" aria-label="DemystifyAI on LinkedIn">in</a>
            </div>
            <nav aria-label="Footer">
                <ul class="footer-links">${navLinks}</ul>
            </nav>
        </div>
        <p class="footer-copy">&copy; 2025–2026. DemystifyAI is a Chicago-based grassroots initiative working towards nonprofit status.</p>`;
}

// slideshow of images on home page

const track = document.querySelector('.hero-track');

if (track) {
    const slides = track ? track.querySelectorAll('img') : [];const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let timer = null;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), 10000); // 10 seconds
    }

    nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });
    prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });

    if (slides.length <= 1) {
        prevBtn.hidden = true;
        nextBtn.hidden = true;
    } else if (!reduceMotion) {
        startTimer();
    }
}