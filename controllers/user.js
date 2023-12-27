const User = require('../models/user');

exports.getAddUser = (req, res, next) => {

  res.render('user/add-user', {
    pageTitle: 'Añadir usuario',
    path: 'user/add-user',
    editing: false
  });

};

exports.postAddUser = (req, res, next) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  const user = new User({
    nombre: nombre,
    correo: correo,
    contraseña: contraseña
  });
  user.save()
    .then(result => {
      // console.log(result);
      console.log('usuario creado');
      res.redirect('/user/users');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getUsers = (req, res, next) => {
  // Verifica si el usuario está autenticado
  if (req.session.isLoggedIn) {
    const currentUser = req.user; // Accede al usuario actual desde la sesión
    res.render('user/users', {
      prods: [currentUser], // Pasa el usuario actual como un arreglo
      pageTitle: 'Tu perfil',
      path: '/user',
    });
  } else {
    res.redirect('/login'); // Redirige a la página de inicio de sesión si el usuario no está autenticado
  }
};
exports.getUser = (req, res, next) => {
  const prodId = req.params.UserId;
  User.findById(prodId)
    .then(User => {
      res.render('User/users', {
        prods: User,
        pageTitle:User.nombre,
        path: '/user'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getEditUser = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const currentUser = req.user; // Ajusta el nombre del parámetro a camelCase
  User.findById(currentUser)
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }
      res.render('user/edit-user', {
        pageTitle: 'Editar Usuario',
        path: '/user/edit-user',
        editing: editMode,
        user: user
      });
    })
    .catch(err => console.log(err));
};
const bcrypt = require('bcryptjs');

exports.postEditUser = (req, res, next) => {
  const userId = req.body.userId;
  const updatedNombre = req.body.nombre;
  const updatedCorreo = req.body.correo;
  const updatedContraseña = req.body.contraseña;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }

      user.nombre = updatedNombre;
      user.correo = updatedCorreo;

      // Verifica si la contraseña se ha actualizado antes de aplicar el hash
      if (updatedContraseña) {
        // Hash de la nueva contraseña
        return bcrypt.hash(updatedContraseña, 12)
          .then(hashedContraseña => {
            user.contraseña = hashedContraseña;
            return user.save();
          });
      }

      return user.save();
    })
    .then(result => {
      console.log('Usuario actualizado!');
      res.redirect('/user/users');
    })
    .catch(err => console.log(err));
};
