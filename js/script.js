/**
 * ============================================================
 * ARCHIVO: script.js
 * ============================================================
 * Contiene toda la interactividad del portafolio:
 *   1. Menú hamburguesa (abrir/cerrar)
 *   2. Terminal falsa (comandos "dev" y "clear")
 *   3. Animación del monitor y del "about" al hacer scroll
 *
 * Todo el código está envuelto en "DOMContentLoaded" para
 * asegurarnos de que el HTML ya esté completamente cargado
 * antes de buscar los elementos con getElementById/querySelector.
 * Si no hiciéramos esto, el script podría ejecutarse antes de
 * que existan los botones/inputs y fallaría.
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. MENÚ HAMBURGUESA
       Controla el menú desplegable de la navegación:
       - Se abre/cierra al hacer clic en el botón hamburguesa.
       - Se cierra automáticamente al hacer clic en un enlace del menú.
       - Se cierra si el usuario hace clic en cualquier otro lugar
         de la página (fuera del botón y del menú).
    ============================================================ */

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Al hacer clic en el botón hamburguesa, se alterna (toggle)
    // la clase "hidden": si estaba oculto se muestra, y viceversa.
    hamburgerBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    // Al hacer clic en cualquier enlace DENTRO del menú (Inicio,
    // Perfil, Proyectos, Contacto), el menú se cierra automáticamente.
    // Esto evita que el menú se quede abierto tapando la sección
    // a la que el usuario acaba de saltar.
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.add('hidden');
        });
    });

    // Si el usuario hace clic en cualquier parte de la página que
    // NO sea el botón hamburguesa ni el menú, también lo cerramos.
    // ".contains(event.target)" nos dice si el clic ocurrió DENTRO
    // de ese elemento; si no ocurrió en ninguno de los dos, cerramos.
    document.addEventListener('click', (event) => {
        if (!hamburgerBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });


    /* ============================================================
       2. TERMINAL INTERACTIVA
       El input de la "terminal" del Hero acepta comandos simples:
         - "dev"   -> baja hasta la sección #about (Perfil)
         - "clear" -> limpia el texto escrito
         - cualquier otra cosa -> muestra una alerta de "comando desconocido"
       También limita el texto a un máximo de 15 caracteres.
    ============================================================ */

    const terminalInput = document.getElementById('terminal-input');

    // Solo activamos esta lógica si el input realmente existe en la página
    if (terminalInput) {

        // Evita que el usuario escriba más de 15 caracteres,
        // cortando el texto si se excede (por si acaso, aunque
        // el atributo "maxlength" del HTML ya debería evitarlo).
        terminalInput.addEventListener('input', (e) => {
            if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
            }
        });

        // Detectamos cuándo el usuario presiona una tecla dentro del input
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key !== 'Enter') return; // solo nos interesa la tecla Enter

            // Normalizamos el texto: sin espacios extra y en minúsculas,
            // para que "DEV", " Dev " o "dev" se traten igual.
            const command = terminalInput.value.trim().toLowerCase();

            if (command === 'dev') {
                // Comando "dev": hacemos scroll suave hasta la sección "Perfil"
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    terminalInput.blur(); // quita el foco del input (oculta el teclado en móvil)
                }
            } else if (command === 'clear') {
                // Comando "clear": simplemente vacía el input
                terminalInput.value = '';
            } else if (command !== '') {
                // Cualquier otro texto no vacío se considera un comando desconocido
                alert("Comando desconocido. Escribe 'dev' y presiona Enter.");
            }
            // Si el input está vacío y se presiona Enter, no hacemos nada.
        });
    }


    /* ============================================================
       3. ANIMACIÓN AL HACER SCROLL
       Da la sensación de que el monitor "se aleja y se desvanece"
       a medida que el usuario baja en la página, y que el bloque
       de "Perfil" se desliza levemente hacia arriba.

       Esto se logra recalculando los estilos (transform/opacity)
       cada vez que se dispara el evento "scroll" de la ventana.
    ============================================================ */

    const monitorFrame = document.getElementById('monitor-frame');
    const aboutContainer = document.getElementById('about-container');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; // cuántos píxeles se ha bajado desde arriba

        // --- Efecto sobre el monitor del Hero ---
        // A medida que scrollY crece, "scale" y "opacity" van bajando
        // hasta llegar a 0 (Math.max evita que se vuelvan negativos).
        const scale = Math.max(0, 1 - scrollY / 400);
        const opacity = Math.max(0, 1 - scrollY / 350);
        const translateY = -scrollY * 0.5; // el monitor se mueve hacia arriba

        if (monitorFrame) {
            monitorFrame.style.transform = `translateY(${translateY}px) scale(${scale})`;
            monitorFrame.style.opacity = opacity;
        }

        // --- Efecto sobre el bloque de "Perfil" ---
        // Se desplaza levemente hacia arriba a medida que se hace scroll,
        // pero nunca sube más allá de -40px (Math.max lo limita).
        const aboutTranslateY = Math.max(-40, 30 - scrollY * 0.2);
        if (aboutContainer) {
            aboutContainer.style.transform = `translateY(${aboutTranslateY}px)`;
        }
    });

});