const authServices = require('../services/authServices');

const authController = {
    async register(req, res) {
        const { Firstname, Lastname, Username, Password, Role } = req.body;
        authServices
            .register(Firstname, Lastname, Username, Password, Role)
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
    async updateUsuario(req, res) {
        const { id } = req.params;
        const { Firstname, Lastname, Username, Password, Role } = req.body;
        authServices
            .updateUsuario(id, Firstname, Lastname, Username, Password, Role)
            .then((usuario) => {
                res.status(usuario.code).json(usuario);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    async deleteUsuario(req, res) {
        const { id } = req.params;
        authServices.deleteUsuario(id)
            .then((usuario) => {
                res.status(usuario.code).json(usuario);
            })
            .catch((err) =>{
                res.status(500).json(err);
            });

    },
};

module.exports = authController;