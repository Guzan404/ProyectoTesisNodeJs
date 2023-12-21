

// Verifica el estado del modo oscuro en localStorage al cargar la página
const modoOscuroActivado = localStorage.getItem('modoOscuro') === 'activado';

// Aplica los estilos iniciales según el estado del modo oscuro
if (modoOscuroActivado) {
    activarModoOscuro();
}

// Función para activar el modo oscuro
function activarModoOscuro() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.getElementById('tituloPagina').style.color = 'white';
    // Guarda el estado del modo oscuro en localStorage
    localStorage.setItem('modoOscuro', 'activado');
}

// Función para desactivar el modo oscuro
function desactivarModoOscuro() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    document.getElementById('tituloPagina').style.color = 'black';
    // Guarda el estado del modo oscuro en localStorage
    localStorage.setItem('modoOscuro', 'desactivado');
}

// Función para alternar entre el modo oscuro y el modo claro
function alternarModoOscuro() {
    const modoOscuroActivado = localStorage.getItem('modoOscuro') === 'activado';

    if (modoOscuroActivado) {
        desactivarModoOscuro();
    } else {
        activarModoOscuro();
    }
}
// Realizar un scroll hacia abajo de forma lenta después de 5 segundos (5000 milisegundos)
setTimeout(function () {
    scrollSuave(document.body.scrollHeight, 120000); // Ajusta la duración según tus preferencias 3 minutos
}, 5000);

let cancelarScrollFlag = false;

// Función para realizar un scroll suave
function scrollSuave(destino, duracion) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scrollStep() {
        if (cancelarScrollFlag) {
            return;
        }

        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const elapsed = now - startTime;

        window.scroll(0, easeInOutQuad(elapsed, start, destino - start, duracion));

        if (elapsed < duracion && !cancelarScrollFlag) {
            requestAnimationFrame(scrollStep);
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollStep);
}

// Función para cancelar el scroll
function cancelarScroll() {
    cancelarScrollFlag = true;
}
