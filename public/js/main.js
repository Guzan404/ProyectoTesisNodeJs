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
