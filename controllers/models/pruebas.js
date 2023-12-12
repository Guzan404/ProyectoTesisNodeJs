const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Estudiantes = require('./estudiantes');
const Usuarios = require('./usuarios');
const Textos = require('./textos');

const Pruebas= sequelize.define('pruebas',{
    idPruebas:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    duracionPrueba:{
        type:Sequelize.TIME,
        allowNull:false
    },
    fechaPrueba:{
        type:Sequelize.DATE,
        allowNull:false
    },
    velocidadLectura:{
        type:Sequelize.STRING,
        allowNull:false
    },
    palabrasTotalErroneas:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    palabrasErroneas:{
        type:Sequelize.STRING
    },
    registroDificultadTexto:{
        type:Sequelize.STRING
    },
    tipoLector:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
//claves foraneas
Pruebas.BelongsTo(Estudiantes,{foreignKey:'idEstudiantesFK'});
Estudiantes.hasMany(Pruebas,{foreignKey:'idEstudiantesFK'});


module.exports = Pruebas;