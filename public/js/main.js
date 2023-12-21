// main.js

$(document).ready(function() {
    // Inicializa los componentes de Bootstrap, incluido el dropdown
    $('[data-toggle="dropdown"]').dropdown();

    $('#filtroEstudiantes').change(function () {
        var selectedEstudiante = $(this).find('option:selected');
        var cursoValue = selectedEstudiante.data('curso');
        $('#curso').val(cursoValue);
      });
    // Script para inicializar Select2 en el campo de autocompletado
    $('#filtroEstudiantes').select2({
        placeholder: 'Escribe el nombre del estudiante',
        allowClear: true,
    });

    // Scroll suave hacia la sección de contacto
    $("a.nav-item.nav-link[href='#contacto']").on('click', function(e) {
        e.preventDefault();
        var targetOffset = $("#contacto").offset().top;
        $('html, body').animate({
            scrollTop: targetOffset
        }, 1000);
    });
});

// confirmacion_eliminar_texto.js

function confirmarEliminacionTexto(pdfId) {
    var confirmacion = confirm("¿Estás seguro de que quieres eliminar este texto?");
    if (confirmacion) {
        document.getElementById('eliminarTextoForm_' + pdfId).submit();
    }
}

// confirmacion eliminar estudiante
function confirmarEliminacion(estudianteId) {
    var confirmacion = confirm("¿Estás seguro de que quieres eliminar a este estudiante?");
    if (confirmacion) {
        // Si el usuario confirma, envía el formulario
        document.getElementById('eliminarEstudianteForm_' + estudianteId).submit();
    }
}
