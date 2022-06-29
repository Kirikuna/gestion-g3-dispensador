const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', authController.register);
authRouter.post('/signin', authController.login);
authRouter.get('/get-all-usuarios', authController.getAllUsuarios,);
authRouter.put('/update-usuario/:id', authController.updateUsuario,);

module.exports = authRouter;