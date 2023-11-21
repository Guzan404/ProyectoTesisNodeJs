const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//  user/add-User => GET
router.get('/add-user', userController.getAddUser);

// user/Users => GET
router.get('/users', userController.getUsers);

// //  user/add-User => POST
router.post('/add-User', userController.postAddUser);
// 

// router.get('/edit-User/:UserId', userController.getEditUser);

// router.post('/edit-User', userController.postEditUser);

// router.post('/delete-User', userController.postDeleteUser);
// */
module.exports = router; 
