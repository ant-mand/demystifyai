document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/');
    const depth = path.length - 2;
    const navbarPath = depth > 0 ? '../'.repeat(depth) + 'navbar.html' : 'navbar.html';
    const footerPath = depth > 0 ? '../'.repeat(depth) + 'footer.html' : 'footer.html';
    fetch(footerPath)
        .then(res => res.ok ? res.text() : Promise.reject('Footer load failed: ' + res.status))
        .then(html => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) placeholder.innerHTML = html;
        })
        .catch(err => console.error(err));

    fetch(navbarPath)
        .then(res => {
            if (!res.ok) throw new Error('Navbar load failed: ' + res.status);
            return res.text();
        })
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;

            const menu = document.querySelector('#mobile-menu');
            const menuLinks = document.querySelector('.nav-menu');
            const backdrop = document.querySelector('#nav-backdrop');
            const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');
            const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

            function openMenu() {
                menu.classList.add('is-active');
                menuLinks.classList.add('active');
                backdrop.classList.add('active');
                document.body.classList.add('menu-open');
            }
            function closeMenu() {
                menu.classList.remove('is-active');
                menuLinks.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.classList.remove('menu-open');
            }

            menu.addEventListener('click', () => {
                menuLinks.classList.contains('active') ? closeMenu() : openMenu();
            });

            backdrop.addEventListener('click', closeMenu);

            dropdownLinks.forEach(link => {
                const parent = link.parentElement;

                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 960) {
                        e.preventDefault();
                        dropdownItems.forEach(item => {
                            if (item !== parent) item.classList.remove('open');
                        });
                        parent.classList.toggle('open');
                    }
                });
            });

            dropdownItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 960) item.classList.add('open');
                });
                item.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 960) item.classList.remove('open');
                });
            });

            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 960) {
                    dropdownItems.forEach(item => {
                        if (!item.contains(e.target)) item.classList.remove('open');
                    });
                }
            });
        })
        .catch(err => console.error(err));
});