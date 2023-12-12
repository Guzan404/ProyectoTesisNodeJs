const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Estudiantes= sequelize.define('estudiantes',{
    idEstudiantes:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    apellido:{
        type:Sequelize.STRING,
        allowNull:false
    },
    edad:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    curso:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports = Estudiantes;