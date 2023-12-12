const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Usuarios = require('./usuarios');

const Textos = sequelize.define('textos',{
    idTextos:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    textoContenido:{
        type:Sequelize.STRING,
        allowNull:false
    },
    autor:{
        type:Sequelize.STRING,
        allowNull:true
    },
    nivelDificultad:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
Textos.belongsTo(Usuarios,{foreignKey:'idUsuariosFK'});
Usuarios.hasMany(Textos,{foreignKey:'idUsuariosFK'});
module.exports = Textos;
