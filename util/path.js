// PATH SE UTILIZA PARA INDICAR EL DILECTORIO PADRE DEL ARCHIVO  "./"

const path = require('path');

module.exports = path.dirname(require.main.filename);