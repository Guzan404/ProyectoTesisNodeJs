const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

//  user/add-User => GET
router.get('/add-user',isAuth, userController.getAddUser);

// user/Users => GET
router.get('/users',isAuth, userController.getUsers);

// //  user/add-User => POST
router.post('/add-User',isAuth, userController.postAddUser);
// 

// router.get('/edit-User/:UserId', userController.getEditUser);

// router.post('/edit-User', userController.postEditUser);

// router.post('/delete-User', userController.postDeleteUser);
// */
module.exports = router; 
