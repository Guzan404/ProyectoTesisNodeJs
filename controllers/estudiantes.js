const Estudiante = require('../models/estudiante');


exports.getAddEstudiante = (req, res, next) => {
  res.render('estudiante/add-estudiante', {
    pageTitle: 'Añadir Estudiante',
    path: 'estudiante/add-estudiante',
    editing: false
  });

};

exports.postAddEstudiante= (req, res, next) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const edad = req.body.edad;
  const curso = req.body.curso;
  const estudiante = new Estudiante({
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    curso: curso,
    userId: req.user
  });
  estudiante.save()
    .then(result => {
      // console.log(result);
      console.log('estudiante creado');
      res.redirect('/estudiante/estudiantes');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getEstudiantes = (req, res, next) => {
  const userId = req.user._id; // Obtener el ID del usuario actual

  Estudiante.find({ userId: userId })
    .then(estudiantes => {
      res.render('estudiante/estudiantes', {
        prods: estudiantes,
        pageTitle: 'Estudiantes',
        path: '/estudiante/estudiantes'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getEstudiante = (req, res, next) => {
  const prodId = req.params.estudianteId;
  Estudiante.findById(prodId)
    .then(estudiante => {
      res.render('estudiante/estudiantes', {
        prods: estudiante,
        pageTitle:estudiante.nombre,
        path: '/estudiante'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditEstudiante = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.estudianteId;
  Estudiante.findById(prodId)
    .then(estudiante => {
      if (!estudiante) {
        return res.redirect('/');
      }
      res.render('estudiante/edit-estudiante', {
        pageTitle: 'Editar Estudiante',
        path: '/estudiante/edit-estudiante',
        editing: editMode,
        estudiante: estudiante
      });
    })
    .catch(err => console.log(err));
};

exports.postEditEstudiante = (req, res, next) => {
  const prodId = req.body.estudianteId;
  const updatedNombre = req.body.nombre;
  const updatedApellido = req.body.apellido;
  const updatedEdad = req.body.edad;
  const updatedCurso = req.body.curso;
  Estudiante.findById(prodId)
    .then(estudiante => {
      estudiante.nombre = updatedNombre;
      estudiante.apellido = updatedApellido;
      estudiante.edad = updatedEdad;
      estudiante.curso = updatedCurso;
      return estudiante.save();
    })
    .then(result => {
      console.log('UPDATED estudiante!');
      res.redirect('/estudiante/estudiantes');
    })
    .catch(err => console.log(err));
};

exports.postDeleteEstudiante = (req, res, next) => {
  const prodId = req.body.estudianteId;
  Estudiante.findByIdAndDelete(prodId)
    .then(() => {
      console.log('ESTUDIANTE DESTRUIDO');
      res.redirect('/estudiante/estudiantes');
    })
    .catch(err => console.log(err));
};
