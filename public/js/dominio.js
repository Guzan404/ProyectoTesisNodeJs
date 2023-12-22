document.addEventListener('DOMContentLoaded', function () {
  const contenidoTexto = document.getElementById('contenidoTexto');
  const cuentaRegresiva = document.getElementById('cuentaRegresiva');
  const contadorElement = document.getElementById('contador');
  const iniciarReconocimientoVozBtn = document.getElementById('iniciarReconocimientoVozBtn');
  const finalizarPruebaBtn = document.getElementById('finalizarPrueba');

  let contador = 0; // Inicializa tu contador de palabras incorrectas aquí
  let tiempoInicio; // Variable para registrar el tiempo de inicio de la prueba
  let textoOriginal; // Variable para almacenar el texto original
  let palabrasReconocidas = []; // Arreglo para almacenar las palabras reconocidas

  iniciarReconocimientoVozBtn.addEventListener('click', iniciarCuentaRegresiva);
  finalizarPruebaBtn.addEventListener('click', finalizarPrueba);

  function contarPalabrasErroneas(transcript) {
    // Lógica para contar palabras erróneas
    // Actualiza el contador en la interfaz
    contadorElement.textContent = ++contador;
  }

  function iniciarCuentaRegresiva() {
    cuentaRegresiva.style.display = 'block';

    let contadorRegresivo = 3;
    const intervaloRegresivo = setInterval(function () {
      contadorElement.textContent = contadorRegresivo;
      contadorRegresivo--;

      if (contadorRegresivo < 0) {
        clearInterval(intervaloRegresivo);
        cuentaRegresiva.style.display = 'none';
        contenidoTexto.style.display = 'block';
        iniciarReconocimientoVoz();
        tiempoInicio = new Date(); // Registra el tiempo de inicio al mostrar el contenido del texto
      }
    }, 1000);
  }

  function iniciarReconocimientoVoz() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;

    recognition.onstart = function () {
      console.log('Reconocimiento de voz iniciado');
    };

    recognition.onresult = function (event) {
      for (const result of event.results) {
        const transcript = result[0].transcript;
        console.log('Texto reconocido:', transcript);

        // También, llama a tu función para contar palabras incorrectas
        contarPalabrasErroneas(transcript);

        // Almacena las palabras reconocidas
        palabrasReconocidas.push(...transcript.split(' '));
      }
    };

    recognition.onerror = function (event) {
      console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
      console.log('Reconocimiento de voz finalizado');
      // Almacena el texto original al finalizar el reconocimiento de voz
      textoOriginal = contenidoTexto.textContent;
    };

    recognition.start();
  }

  function finalizarPrueba() {
    const tiempoFin = new Date(); // Registra el tiempo de finalización al hacer clic en el botón de finalizar
    const tiempoTotalEnMinutos = (tiempoFin - tiempoInicio) / (1000 * 60); // Calcula el tiempo total en minutos

    const palabrasPorMinuto = Math.round(contador / tiempoTotalEnMinutos); // Calcula las palabras por minuto

    const totalPalabrasErroneas = contador; // Obtén el total de palabras incorrectas

    // Comparar el texto original con las palabras reconocidas
    const palabrasOmitidas = palabrasReconocidas.filter(palabra => !textoOriginal.includes(palabra));

    // Mostrar un formulario para que el usuario ingrese observaciones manualmente
    const observaciones = prompt('Ingresa tus observaciones sobre la prueba:');

    // Obtener el valor de textoId y estudianteId desde tu interfaz (asegúrate de tener estos elementos en tu HTML)
    const textoId = document.getElementById('textoId').value; // Reemplaza 'textoId' con el id real de tu elemento
    const estudianteId = document.getElementById('estudianteId').value; // Reemplaza 'estudianteId' con el id real de tu elemento

    // Enviar resultados al servidor
    const resultados = {
      palabrasPorMinuto,
      totalPalabrasErroneas,
      palabrasOmitidas,
      textoId,
      estudianteId,
      userId: 'id_del_usuario', // Sustituye con el id del usuario actual
      fecha: new Date(),
      observaciones,
    };

    // Realizar la solicitud HTTP al servidor para guardar los resultados
    fetch('/dominio/guardarResultados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultados),
    })
      .then(response => response.json())
      .then(data => {
        // Lógica adicional después de guardar los resultados, si es necesario
        console.log('Resultados guardados con éxito:', data);
        // Puedes realizar acciones adicionales, redireccionar, etc.
      })
      .catch(error => {
        console.error('Error al guardar los resultados:', error);
      });
  }

});
