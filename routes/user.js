const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// user/add-User => GET
router.get('/add-user', isAuth, userController.getAddUser);

// user/Users => GET
router.get('/users', isAuth, userController.getUsers);

// user/add-User => POST
router.post('/add-User', isAuth, userController.postAddUser);

// user/edit-User/:UserId => GET
router.get('/edit-User/:UserId', isAuth, userController.getEditUser);


// user/edit-User/:UserId => POST
router.post('/edit-User/', isAuth, userController.postEditUser);

// user/delete-User => POST
// router.post('/delete-User', isAuth, userController.postDeleteUser);

module.exports = router;
