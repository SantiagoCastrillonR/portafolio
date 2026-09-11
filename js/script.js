/* Menú hamburguesa (abrir/cerrar)
Terminal falsa (comandos "dev" y "clear")
Animación del monitor y del "about" al hacer scroll */

document.addEventListener('DOMContentLoaded', () => {

    /* MENÚ HAMBURGUESA */

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    function closeMenu() {
        dropdownMenu.classList.add('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const isHidden = dropdownMenu.classList.toggle('hidden');
        hamburgerBtn.setAttribute('aria-expanded', String(!isHidden));
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!hamburgerBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });


    /* TERMINAL INTERACTIVA */

    const terminalInput = document.getElementById('terminal-input');

    if (terminalInput) {

        terminalInput.addEventListener('input', (e) => {
            if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
            }
        });

        terminalInput.addEventListener('keypress', (e) => {
            if (e.key !== 'Enter') return; 

            const command = terminalInput.value.trim().toLowerCase();

            if (command === 'dev') {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    terminalInput.blur(); 
                }
            } else if (command === 'clear') {
                terminalInput.value = '';
            } else if (command !== '') {
                alert("Comando desconocido. Escribe 'dev' y presiona Enter.");
            }
        });
    }


    /* ANIMACIÓN AL HACER SCROLL */

    const monitorFrame = document.getElementById('monitor-frame');
    const aboutContainer = document.getElementById('about-container');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            const scale = Math.max(0, 1 - scrollY / 400);
            const opacity = Math.max(0, 1 - scrollY / 350);
            const translateY = -scrollY * 0.5; // el monitor se mueve hacia arriba

            if (monitorFrame) {
                monitorFrame.style.transform = `translateY(${translateY}px) scale(${scale})`;
                monitorFrame.style.opacity = opacity;
            }

            const aboutTranslateY = Math.max(-40, 30 - scrollY * 0.2);
            if (aboutContainer) {
                aboutContainer.style.transform = `translateY(${aboutTranslateY}px)`;
            }
        });
    }

});