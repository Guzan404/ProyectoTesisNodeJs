const path = require('path');

const express = require('express');

const estudiantesController = require('../controllers/estudiantes');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

//  get de añadir usuario
router.get('/add-estudiante',isAuth, estudiantesController.getAddEstudiante);

//  post de añadir usuario
router.post('/add-estudiante',isAuth, estudiantesController.postAddEstudiante);
// 

// traer todos los estudiantes
router.get('/estudiantes',isAuth, estudiantesController.getEstudiantes);

// traer estudiante por id
router.get('/estudiantes/:estudianteId',isAuth,estudiantesController.getEstudiante)

router.get('/edit-estudiante/:estudianteId',isAuth, estudiantesController.getEditEstudiante);

router.post('/edit-estudiante',isAuth, estudiantesController.postEditEstudiante);

router.post('/delete-estudiante',isAuth, estudiantesController.postDeleteEstudiante);

module.exports = router; 
