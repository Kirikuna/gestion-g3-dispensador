const express = require('express');
const salaController = require('../controllers/salaController');

const salaRouter = express.Router();

salaRouter.post('/add-sala', salaController.addSala);
salaRouter.get('/get-sala/:id', salaController.getSala);
salaRouter.get('/sala-exists/:edificio/:id', salaController.salaExists);
salaRouter.get('/get-all-salas', salaController.getAllSalas);
salaRouter.get('/get-edificio-salas/:eid', salaController.getSalasOfEdificio);
salaRouter.put('/update-sala/:id', salaController.updateSala);
salaRouter.delete('/delete-sala/:id', salaController.deleteSala);
salaRouter.get('/get-logs/:id', salaController.getLogs);
salaRouter.put('/solve-sala/:id', salaController.solveSala);
salaRouter.put('/report-sala/:id', salaController.reportSala);

module.exports = salaRouter;
