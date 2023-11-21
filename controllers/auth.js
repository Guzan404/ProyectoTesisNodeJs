const bycrypt = require('bcryptjs');
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
    pageTitle: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const correo= req.body.correo;
  const contraseña = req.body.contraseña;
  User.findOne({correo:correo})
    .then(user => {
      if(!user){
        req.flash('error','CONTRASEÑA O CORREO INVALIDO');
        return res.redirect('/login');
      }
      bycrypt.compare(contraseña,user.contraseña).then(doMatch =>{
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        }
        res.redirect('/login')
      }).catch(err=>{
        console.log(err);
        res.redirect('/login');
      })

    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const nombre = req.body.nombre;
  const correo=req.body.correo;
  const contraseña= req.body.contraseña;
  const confirmcontraseña = req.body.confirmcontraseña;
  User.findOne({correo:correo})
  .then(userDoc=>{
    if(userDoc){
      return res.redirect('/signup');
    }
    return bycrypt.hash(contraseña,12)
    .then(hashedContraseña =>{
      const user = new User({
        nombre:nombre,
        correo:correo,
        contraseña:hashedContraseña
      });
      return user.save();
    })
    .then(result =>{
      res.redirect('/login')
    })
  })

  .catch(err=>{
    console.log(err);
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
