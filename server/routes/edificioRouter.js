const express = require('express');
const edificioController = require('../controllers/edificioController');

const edificioRouter = express.Router();

edificioRouter.post('/add-edificio/:hola', edificioController.addEdificio);
edificioRouter.get("/:id", edificioController.getEdificio);

module.exports = edificioRouter;