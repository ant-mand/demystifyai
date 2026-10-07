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
    const slides = track.querySelectorAll('img');
    const prevBtn = document.querySelector('.hero-arrow.prev');
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

// ---------- curriculum page ----------
// The embedded Google Slides deck and the PDF viewers handle their own paging,
// so this is just the tabs and the request dialog.

document.querySelectorAll('.package').forEach(pkg => {
    const tabs = [...pkg.querySelectorAll('[role="tab"]')];
    if (!tabs.length) return;

    function selectTab(tab) {
        tabs.forEach(t => {
            const on = t === tab;
            t.setAttribute('aria-selected', on);
            t.tabIndex = on ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => selectTab(tab));

        // left/right arrows move between tabs, Home/End jump to the ends
        tab.addEventListener('keydown', e => {
            let next = null;
            if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
            if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === 'Home') next = tabs[0];
            if (e.key === 'End') next = tabs[tabs.length - 1];
            if (!next) return;
            e.preventDefault();
            selectTab(next);
            next.focus();
        });
    });
});

// ---------- request dialog ----------

const requestDialog = document.getElementById('request-dialog');

if (requestDialog) {
    document.addEventListener('click', e => {
        if (e.target.closest('[data-request]')) requestDialog.showModal();
        if (e.target.closest('[data-close]')) requestDialog.close();
    });

    // clicking the dark area outside the box closes it
    requestDialog.addEventListener('click', e => {
        if (e.target === requestDialog) requestDialog.close();
    });
}