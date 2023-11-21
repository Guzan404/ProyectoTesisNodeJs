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
  User.find()
    .then(users => {
      res.render('user/users', {
        prods: users,
        pageTitle: 'Todos los usuarios',
        path: '/users'
      });
    })
    .catch(err => {
      console.log(err);
    });
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
