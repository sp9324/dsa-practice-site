const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController.js');
const User = require('../models/user.js');

// Define routes using controller functions
// router.post(
//     '/createUser', 
//     userController.createUser
// );

// router.get(
//     '/getUserById/:userId', 
//     userController.getUserById
// );

router.post(
	'/updatePoints/:id',
    userController.updatePoints
);

module.exports = router;
