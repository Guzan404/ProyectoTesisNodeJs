const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage: storage });
  
function showUploadForm(req, res) {
  res.render('upload');
}

function handleFileUpload(req, res) {
  const filePath = req.file.path;
  const originalName = req.file.originalname;

  // Realizar operaciones con el archivo subido
  // ...

  fs.unlinkSync(filePath);

  res.redirect('/upload');
}

module.exports = {
  showUploadForm,
  handleFileUpload,
};

