document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/');
    const depth = path.length - 2;
    const navbarPath = depth > 0 ? '../'.repeat(depth) + 'navbar.html' : 'navbar.html';

    fetch(navbarPath)
        .then(res => {
            if (!res.ok) throw new Error('Navbar load failed: ' + res.status);
            return res.text();
        })
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;

            const menu = document.querySelector('#mobile-menu');
            const menuLinks = document.querySelector('.nav-menu');
            const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');
            const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

            menu.addEventListener('click', () => {
                menu.classList.toggle('is-active');
                menuLinks.classList.toggle('active');
            });

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
