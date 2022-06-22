const qrDataServices = require('../services/qrDataServices');

const qrDataController = {
    async getEdificioQrData(req, res) {
        const { id } = req.params;
        qrDataServices
            .getEdificioQrData(id)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async getAllQrData(req, res) {
        qrDataServices
            .getAllQrData()
            .then((edificios) => {
                res.status(edificios.code).json(edificios);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};

module.exports = qrDataController;
