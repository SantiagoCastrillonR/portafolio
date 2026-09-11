document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Menú desplegable
    hamburgerBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', (event) => {
        if (!hamburgerBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // Terminal interactiva: comando "dev" + Enter
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('input', (e) => {
            if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
            }
        });

        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
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
            }
        });
    }

    // Animación interactiva de scroll
    const monitorFrame = document.getElementById('monitor-frame');
    const aboutContainer = document.getElementById('about-container');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        let scale = Math.max(0, 1 - scrollY / 400);
        let opacity = Math.max(0, 1 - scrollY / 350);
        let translateY = -scrollY * 0.5;

        if (monitorFrame) {
            monitorFrame.style.transform = `translateY(${translateY}px) scale(${scale})`;
            monitorFrame.style.opacity = opacity;
        }

        let aboutTranslateY = Math.max(-40, 30 - scrollY * 0.2);
        if (aboutContainer) {
            aboutContainer.style.transform = `translateY(${aboutTranslateY}px)`;
        }
    });
});