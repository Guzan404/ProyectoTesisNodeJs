document.addEventListener('DOMContentLoaded', function () {
    const contenidoTexto = document.getElementById('contenidoTexto');
    const cuentaRegresiva = document.getElementById('cuentaRegresiva');
    const contadorElement = document.getElementById('contador');
    const iniciarReconocimientoVozBtn = document.getElementById('iniciarReconocimientoVozBtn');
    const finalizarPruebaBtn = document.getElementById('finalizarPrueba');
  
    let contador = 0; // Inicializa tu contador de palabras incorrectas aquí
    let tiempoInicio; // Variable para registrar el tiempo de inicio de la prueba
  
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
          tiempoInicio = new Date(); // Registra el tiempo de inicio al mostrar el contenido del texto
        }
      }, 1000);
    }
  
    function iniciarReconocimientoVoz() {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
  
      recognition.onresult = function (event) {
        for (const result of event.results) {
          console.log(result[0].transcript);
          // Aquí puedes hacer algo con el texto reconocido, por ejemplo, mostrarlo en la página.
  
          // También, llama a tu función para contar palabras incorrectas
          contarPalabrasErroneas(result[0].transcript);
        }
      };
  
      recognition.start();
    }
  
    function contarPalabrasErroneas(transcript) {
      // Lógica para contar palabras erróneas
      // Actualiza el contador en la interfaz
      contadorElement.textContent = ++contador;
    }
  
    // Al finalizar la prueba (puedes llamar a esta función cuando el estudiante termine de leer)
    function finalizarPrueba() {
      const tiempoFin = new Date(); // Registra el tiempo de finalización al hacer clic en el botón de finalizar
      const tiempoTotalEnMinutos = (tiempoFin - tiempoInicio) / (1000 * 60); // Calcula el tiempo total en minutos
  
      const palabrasPorMinuto = Math.round(contador / tiempoTotalEnMinutos); // Calcula las palabras por minuto
  
      const totalPalabrasErroneas = contador; // Obtén el total de palabras incorrectas
  
      // Mostrar un formulario para que el usuario ingrese observaciones manualmente
      const observaciones = prompt('Ingresa tus observaciones sobre la prueba:');
  
      // Enviar resultados al servidor
      const resultados = {
        palabrasPorMinuto,
        totalPalabrasErroneas,
        textoId,
        estudianteId,
        userId: 'id_del_usuario', // Sustituye con el id del usuario actual
        fecha: new Date(),
        observaciones,
      };
  
      // Simulación de una llamada AJAX al servidor
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
  