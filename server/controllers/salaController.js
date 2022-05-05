const salaServices = require('../services/salaServices');

const salaController = {
    async addSala (req, res) {
        const {eid, name} = req.body;
        salaServices
            .addSala(eid, name)
            .then((sala) => {
                res.status(edificio.code).json(sala);
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    async getSala (req, res) {
        const { id } = req.params;
        salaServices
            .getSala(id)
            .then((sala) => {
                res.status(sala.code).json(sala);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async getAllSalas (req, res) {
        salaServices
            .getAllSalas()
            .then((salas) => {
                res.status(salas.code).json(salas);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async getSalasOfEdificio (req, res) {
        const {eid} = req.params;
        salaServices
            .getSalasOfEdificio(eid)
            .then((salas) => {
                res.status(salas.code).json(salas);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async updateSala (req, res) {
        const { id } = req.params;
        const {name} = req.body;
        salaServices
            .updateSala(id, name)
            .then((sala) => {
                res.status(sala.code).json(sala);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async deleteSala (req, res) {
        const { id } = req.params;
        salaServices
            .deleteSala(id)
            .then((sala) => {
                res.status(sala.code).json(sala);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
}

module.exports = salaController;