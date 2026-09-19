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
                <img src="${root}assets/logos/logo.png" alt="DemystifyAI Home">
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
                    <img src="${root}assets/logos/logo.png" alt="DemystifyAI Home">
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

const partnerList = document.querySelector('.partner-list');

// show "and more" for partners list on home page

if (partnerList) {
    const partners = [...partnerList.querySelectorAll('li:not(.partner-more)')];
    const more = partnerList.querySelector('.partner-more');

    function fitPartners() {
        // reset: show everything, hide "and more"
        partners.forEach(li => li.classList.remove('is-overflow'));
        more.hidden = true;

        const firstRow = partners[0].offsetTop;
        const lastPartner = partners[partners.length - 1];
        if (lastPartner.offsetTop === firstRow) return;   // all fit on one line

        // otherwise, show "and more" and hide names from the end until it fits
        more.hidden = false;
        for (let i = partners.length - 1; i > 0 && more.offsetTop > firstRow; i--) {
            partners[i].classList.add('is-overflow');
        }
    }

    fitPartners();
    window.addEventListener('resize', fitPartners);
    document.fonts.ready.then(fitPartners);
}