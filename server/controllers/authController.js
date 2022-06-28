const authServices = require('../services/authServices');

const authController = {
    async register(req, res) {
        const { firstname, lastname, username, password, role } = req.body;
        authServices
            .register(firstname, lastname, username, password, role)
            .then((user) => {
                res.status(user.code).json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async login(req, res) {
        const { username, password } = req.body;
        authServices
            .login(username, password)
            .then((user) => {
                res.status(user.code).json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    async getAllUsuarios(req, res) {
        authServices
            .getAllUsuarios()
            .then((usuarios) => {
                res.status(usuarios.code).json(usuarios);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};

module.exports = authController;