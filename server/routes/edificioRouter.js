const express = require('express');
const edificioController = require('../controllers/edificioController');

const edificioRouter = express.Router();

edificioRouter.post('/add-edificio', edificioController.addEdificio);
edificioRouter.get("/get-edificio/:id", edificioController.getEdificio);
edificioRouter.put("/update-edificio/:id", edificioController.updateEdificio);
edificioRouter.delete("/delete-edificio/:id", edificioController.deleteEdificio);

module.exports = edificioRouter;