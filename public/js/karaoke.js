// Obtén los elementos del formulario
const karaokeForm = document.getElementById('karaokeForm');
const textSelect = document.getElementById('textSelect');
const speedRange = document.getElementById('speedRange');
const startPoint = document.getElementById('startPoint');

// Función para iniciar el karaoke
function startKaraoke() {
  const selectedTextId = textSelect.value;
  const selectedSpeed = speedRange.value;
  const selectedStartPoint = startPoint.value;

  // Realiza una solicitud al servidor para obtener el contenido del texto seleccionado
  fetch(`/api/getTextContent/${selectedTextId}`)
    .then(response => response.json())
    .then(data => {
      // Limpia el contenedor del karaoke
      const karaokeContainer = document.getElementById('karaoke-container');
      karaokeContainer.innerHTML = '';

      // Divide el contenido del texto en líneas
      const lines = data.content.split('\n');

      // Filtra las líneas según el punto de inicio seleccionado
      const startIndex = lines.findIndex(line => line.includes(selectedStartPoint));
      const filteredLines = startIndex !== -1 ? lines.slice(startIndex) : lines;

      // Recorre las líneas y agrega elementos al contenedor del karaoke
      filteredLines.forEach((line, index) => {
        const karaokeLine = document.createElement('div');
        karaokeLine.classList.add('karaoke-line');
        karaokeLine.style.opacity = 0;
        karaokeLine.innerText = line;

        karaokeContainer.appendChild(karaokeLine);
      });

      // Inicia la animación con anime.js
      anime({
        targets: '.karaoke-line',
        opacity: 1,
        easing: 'linear',
        duration: selectedSpeed * 1000,
        delay: (el, i) => i * (selectedSpeed * 100),
      });
    })
    .catch(error => {
      console.error('Error al obtener el contenido del texto:', error);
    });
}
