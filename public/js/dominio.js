document.addEventListener('DOMContentLoaded', function () {
  const contenidoTexto = document.getElementById('contenidoTexto');
  const cuentaRegresiva = document.getElementById('cuentaRegresiva');
  const contadorElement = document.getElementById('contador');
  const iniciarReconocimientoVozBtn = document.getElementById('iniciarReconocimientoVozBtn');
  const finalizarPruebaBtn = document.getElementById('finalizarPrueba');

  let tiempoInicio = 0; // Variable para registrar el tiempo de inicio de la prueba
  let textoOriginal=contenidoTexto.textContent; // Variable para almacenar el texto original
  let palabrasReconocidas = []; // Arreglo para almacenar las palabras reconocidas
  iniciarReconocimientoVozBtn.addEventListener('click', iniciarCuentaRegresiva);
  finalizarPruebaBtn.addEventListener('click', finalizarPrueba);
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
        tiempoInicio = new Date().getTime(); // Registra el tiempo de inicio al mostrar el contenido del texto
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


        // Almacena las palabras reconocidas
        palabrasReconocidas.push(...transcript.split(' '));
      }
    };

    recognition.onerror = function (event) {
      console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
      console.log('Reconocimiento de voz finalizado');
    };

    recognition.start();
  }

  function finalizarPrueba() {
    const tiempoFin = new Date().getTime();
    // Calcula el tiempo total en minutos
    const tiempoTotalEnMinutos = (tiempoFin - tiempoInicio) / (1000 * 60);
    // Calcula el número de palabras por minuto
    const palabrasEnTexto = textoOriginal.split(/\s+/).filter(word => word.length > 0);
    const palabrasMinuto = Math.round(palabrasEnTexto.length / tiempoTotalEnMinutos);
    // Filtra las palabras reconocidas que no están presentes en el texto original
    const palabrasErroneas = palabrasReconocidas.filter(palabra => !palabrasEnTexto.includes(palabra.toLowerCase()));
    // Mostrar un formulario para que el usuario ingrese observaciones manualmente
    const observaciones = prompt('Ingresa tus observaciones sobre la prueba:');
    const fechaTest = new Date();
  
    // Enviar resultados al servidor
    const resultados = {
      palabrasMinuto,
      totalPalabrasErroneas: palabrasErroneas.length,
      fecha: fechaTest,
      observaciones,
      contenidoReconocimiento:palabrasReconocidas,
    };
    console.log(resultados)
    // Simulación de una llamada AJAX al servidor para guardar los resultados
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
