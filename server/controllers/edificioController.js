const edificioServices = require('../services/edificioServices');

const edificioController = {
    async addEdificio (req, res) {
        console.log(req.params);
        const {name, color} = req.body;
        edificioServices
            .addEdificio(name, color)
            .then((edificio) => {
                res.status(edificio.code).json(edificio);
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = edificioController;