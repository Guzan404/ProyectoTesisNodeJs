const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBsession = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://dieko:36tZQfZZZUoAFiGw@diegogrupo.lu9lnoy.mongodb.net/?retryWrites=true&w=majority';
const flash = require('connect-flash');
const multer = require('multer');
const app = express();

const https = require('https');
const tienda= new  MongoDBsession({
  uri: MONGODB_URI,
  collection:'sessions'
});


// SE DEFINE EL MOTOR DE PLATILLAS COMO "EJS"
app.set('view engine','ejs');

// SE ESTABLECE LA CARPETA DE VISTAS COMO "VIEWS"
app.set('views','views');

const User = require('./models/user');
// IMPORTACIÓN DE RUTAS ADMINISTRADOR Y VISTA GENERAL

const errorController = require('./controllers/error');
const rutasDeUsuarios = require('./routes/user');

const rutasText = require('./routes/text');
const rutasTest= require('./routes/test');
const indexRoutes = require ('./routes/index');
const dominioRoutes = require('./routes/dominio');
const rutasEstudiante = require('./routes/estudiante');
const authRoutes = require ('./routes/auth');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));


app.use(
  session({secret: 'secret',
  resave:false,
  saveUninitialized:false,
  store:tienda
})
);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});



app.use('/user',rutasDeUsuarios);
app.use('/karaoke',rutasTest);
app.use('/estudiante',rutasEstudiante);
app.use('/dominio', dominioRoutes);
app.use('/text',rutasText);
app.use('/',indexRoutes);
app.use(authRoutes);
app.use(errorController.get404);

const privateKeyPath = path.resolve(__dirname, 'server.key');
const certificatePath = path.resolve(__dirname, 'server.cert');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };
https
  .createServer(credentials, app)
  .listen(3000, () => {
    console.log('Servidor HTTPS escuchando en el puerto 3000');
  })
  .on('error', (err) => {
    console.error('Error en el servidor:', err.message);
  });

  mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
  });