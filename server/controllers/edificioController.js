const edificioServices = require('../services/edificioServices');

const edificioController = {
    async addEdificio (req, res) {
        const {name, color} = req.body;
        edificioServices
            .addEdificio(name, color)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    async getEdificio (req, res) {
        const { id } = req.params;
        edificioServices
            .getEdificio(id)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async getAllEdificios (req, res) {
        edificioServices
            .getAllEdificios()
            .then((edificios) => {
                res.status(edificios.code).json(edificios);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async updateEdificio (req, res) {
        const { id } = req.params;
        const {name, color} = req.body;
        edificioServices
            .updateEdificio(id, name, color)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async deleteEdificio (req, res) {
        const { id } = req.params;
        edificioServices
            .deleteEdificio(id)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
}

module.exports = edificioController;