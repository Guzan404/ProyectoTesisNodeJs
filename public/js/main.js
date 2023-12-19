// confirmacion elimar estudiante
function confirmarEliminacion(estudianteId) {
    var confirmacion = confirm("¿Estás seguro de que quieres eliminar a este estudiante?");
    if (confirmacion) {
        // Si el usuario confirma, envía el formulario
        document.getElementById('eliminarEstudianteForm_' + estudianteId).submit();
    }
}


// confirmacion_eliminar_texto.js

function confirmarEliminacionTexto(pdfId) {
    var confirmacion = confirm("¿Estás seguro de que quieres eliminar este texto?");
    if (confirmacion) {
        document.getElementById('eliminarTextoForm_' + pdfId).submit();
    }
}


$(document).ready(function() {
    console.log("Script de desplazamiento suave cargado");
    $("a.nav-item.nav-link[href='#contacto']").on('click', function(e) {
        // Evita el comportamiento predeterminado del enlace
        e.preventDefault();

        // Obtiene la posición de la sección de contacto
        var targetOffset = $("#contacto").offset().top;

        // Realiza un desplazamiento suave hacia la sección de contacto
        $('html, body').animate({
            scrollTop: targetOffset
        }, 1000); // Ajusta la duración del desplazamiento según sea necesario
    });
});
