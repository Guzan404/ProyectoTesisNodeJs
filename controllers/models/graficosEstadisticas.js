const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Estudiantes = require('./estudiantes');

const GraficosEstadisticas= sequelize.define('GraficosEstadisticas',{
    data:{
        type:Sequelize.DataTypes.JSON,
    },
});
GraficosEstadisticas.belongsTo(Estudiantes,{foreignKey:'idEstudiantes'});
Estudiantes.HasMany(GraficosEstadisticas,{foreignKey:'idGraficosEstadisticas'});

module.exports = GraficosEstadisticas;