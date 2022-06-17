const firebase = require('../config/firebase');
const db = firebase.firestore();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = (user) => {
    return {
        name: user.name,
        _id: user._id,
        email: user.email,
        role: user.role,
    };
};

const authServices = {
    async register(firstname, lastname, username, password, role) {
        try {
            const userRef = db.collection('users');
            const userDoc = await userRef.doc(username).get();
            if (userDoc.exists)
                return { status: 'failed', code: 409, message: 'Email is used', data: {} };
            const salt = bcrypt.genSaltSync(10);
            const passwordHashed = bcrypt.hashSync(password, salt);

            const userAdd = await userRef.add({
                Firstname: firstname,
                Lastname: lastname,
                Username: username,
                Password: passwordHashed,
                Role: role,

            });

            return {
                status: true,
                message: 'User added successfully',
                code: 200,
                data: {
                    id: userAdd.id,
                    Firstname: firstname,
                    Lastname: lastname,
                    Username: username,
                    Role: role,
                },
            };

        } catch (error) {
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
    async login(username, password) {
        try {
            const userRef = db.collection('users');
            let userDoc = await userRef.where('Username', '==', username).get();
            userDoc = userDoc.docs[0];
            if (!userDoc.exists || !bcrypt.compareSync(password, userDoc.data().Password))
                return {
                    status: 'failed',
                    code: '409',
                    message: 'Problem with password or user',
                    data: {},
                };

            return {
                status: 'success',
                code: 200,
                message: 'User logged',
                data: {
                    user: {
                        id: userDoc.id,
                        Firstname: userDoc.data().Firstname,
                        Lastname: userDoc.data().Lastname,
                        Username: userDoc.data().Username,
                        Role: userDoc.data().Role,

                        //TODO: PONER SECRET COMO VARIABLE DE ENTORNO

                    },
                    token: jwt.sign({
                        _id: userDoc.id,
                        name: userDoc.data().Firstname,
                        email: userDoc.data().Lastname,
                        role: userDoc.data().Username,
                    }, 'abc123'),
                },
            };
        } catch (error) {
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
};

module.exports = authServices;