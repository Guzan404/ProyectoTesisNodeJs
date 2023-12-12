const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Estudiantes = require('./estudiantes');

const Usuarios= sequelize.define('usuarios',{
    idUsuarios:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    correo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    contraseña:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rolUsuario:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

Estudiantes.belongsTo(Usuarios,{foreignKey:'idUsuariosFK'});
Usuarios.hasMany(Estudiantes,{foreignKey:'idEstudiantesFK'})

module.exports = Usuarios;