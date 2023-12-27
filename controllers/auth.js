const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: req.flash('error')
  });
};

exports.postLogin = (req, res, next) => {
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;

  User.findOne({ correo: correo })
    .then(user => {
      if (!user) {
        req.flash('error', 'Correo no encontrado');
        return res.redirect('/login');
      }

      bcrypt.compare(contraseña, user.contraseña)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }

          req.flash('error', 'Contraseña incorrecta');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  const confirmcontraseña = req.body.confirmcontraseña;

  // Verificar si las contraseñas coinciden
  if (contraseña !== confirmcontraseña) {
    req.flash('error', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    return res.redirect('/signup');
  }

  User.findOne({ correo: correo })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'El correo ya está en uso. Por favor, elige otro.');
        return res.redirect('/signup');
      }

      return bcrypt.hash(contraseña, 12)
        .then(hashedContraseña => {
          const user = new User({
            nombre: nombre,
            correo: correo,
            contraseña: hashedContraseña
            
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
      req.flash('error', 'Hubo un problema al registrarse. Por favor, intenta nuevamente.');
      res.redirect('/signup');
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
