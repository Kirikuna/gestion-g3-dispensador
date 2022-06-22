const express = require('express');
const qrDataController = require('../controllers/qrDataController');

const qrDataRouter = express.Router();

qrDataRouter.get(
    '/get-edificio-qrdata/:id',
    qrDataController.getEdificioQrData
);
qrDataRouter.get('/all', qrDataController.getAllQrData);

module.exports = qrDataRouter;
