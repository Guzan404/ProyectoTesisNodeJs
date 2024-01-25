document.addEventListener('DOMContentLoaded', function () {
  const contenidoTexto = document.getElementById('contenidoTexto');
  const iniciarLecturaBtn = document.getElementById('iniciarLecturaBtn');

  iniciarLecturaBtn.addEventListener('click', iniciarLectura);

  function iniciarLectura() {
    // Abre una nueva ventana emergente con el contenido del texto
    const ventanaEmergente = window.open('', 'ventanaEmergente', 'width=600,height=400');

    // Inserta el contenido del texto en la nueva ventana
    ventanaEmergente.document.write('<html><head><title>Texto para Lectura</title></head><body>');
    ventanaEmergente.document.write('<p id="textoVentana">' + contenidoTexto.textContent + '</p>');
    ventanaEmergente.document.write('<button onclick="marcarPalabra()">Marcar Palabra Errónea</button>');
    ventanaEmergente.document.write('</body></html>');
    ventanaEmergente.document.close();

    // Función para marcar una palabra errónea en la nueva ventana
    ventanaEmergente.marcarPalabra = function () {
      const palabraSeleccionada = ventanaEmergente.getSelection().toString().trim();
      const textoVentana = ventanaEmergente.document.getElementById('textoVentana');

      if (palabraSeleccionada && textoVentana.textContent.includes(palabraSeleccionada)) {
        // Marca la palabra errónea (puedes cambiar el estilo o agregar una clase)
        textoVentana.innerHTML = textoVentana.innerHTML.replace(new RegExp('\\b' + palabraSeleccionada + '\\b', 'g'), '<span style="color: red;">$&</span>');

        // Envía la palabra errónea al script principal
        window.opener.registrarPalabraErronea(palabraSeleccionada);
      }
    };
  }

  // Función en el script principal para registrar palabras erróneas
  window.registrarPalabraErronea = function (palabraErronea) {
    // Aquí puedes hacer lo que necesites con la palabra errónea, como almacenarla en una variable o enviarla al servidor
    console.log('Palabra errónea registrada:', palabraErronea);
  };
});
