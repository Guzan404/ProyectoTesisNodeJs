$(document).ready(function() {
  $('#start').click(function() {
    var counter = 3;

    function decrementCounter() {
      if (counter === 0) {
        clearInterval(interval);

        // Divide el texto en palabras
        var words = $('#karaoke-text').text().split(' ');

        // Vacía el contenedor de texto
        $('#text-content').empty();

        // Recorre cada palabra y crea un span para cada una
        words.forEach(function(word, index) {
          var newWord = $('<span>').text(word + ' ').css('opacity', 0);
          $('#text-content').append(newWord);

          // Anima cada palabra individualmente con Anime.js
          anime({
            targets: newWord.get(0),
            opacity: [0, 1],
            delay: index * 500, // Ajusta este valor para cambiar la velocidad de la animación
            duration: 1000, // Ajusta este valor para cambiar cuánto tiempo se muestra cada palabra
            easing: 'linear',
          });
        });
        return;
      }

      counter--;
      $('#countdown').html(counter);
    }

    const interval = setInterval(decrementCounter, 1000);
  });
});
