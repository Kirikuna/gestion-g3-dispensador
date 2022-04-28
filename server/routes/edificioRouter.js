const express = require('express');
const edificioController = require('../controllers/edificioController');

const edificioRouter = express.Router();

edificioRouter.post('/add-edificio/:hola', edificioController.addEdificio);

module.exports = edificioRouter;