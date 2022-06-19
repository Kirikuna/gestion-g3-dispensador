const firebase = require('../config/firebase');
const db = firebase.firestore();

const qrDataServices = {
    async getEdificioQrData(id) {
        try {
            const edificioRef = db.collection('edificios').doc(id);
            const edificioDoc = await edificioRef.get();
            if (edificioDoc.exists) {
                const edificioSalas = edificioDoc.data().Rooms;
                const salas = [];
                for (const sid of edificioSalas) {
                    const salaRef = db.collection('salas').doc(sid);
                    const salaDoc = (await salaRef.get()).data();

                    const salaQrData = {
                        id: salaRef.id,
                        salaname: salaDoc.Name,
                        edificioname: edificioDoc.data().Name,
                        edificiocolor: edificioDoc.data().Color,
                    };
                    salas.push(salaQrData);
                }

                const edificio = {
                    id: edificioDoc.id,
                    Name: edificioDoc.data().Name,
                    Color: edificioDoc.data().Color,
                    Rooms: salas,
                };
                return {
                    status: 'success',
                    code: 200,
                    message: 'Edificio qr data found',
                    data: edificio,
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Edificio found',
                    data: {},
                };
            }
        } catch (error) {
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
    async getAllQrData() {
        try {
            const salasQrData = [];
            const edificiosRef = db.collection('edificios');
            const snapshot = await edificiosRef.get();
            for (const edificioDoc of snapshot.docs) {
                const edificioSalas = edificioDoc.data().Rooms;

                for (const sid of edificioSalas) {
                    const salaRef = db.collection('salas').doc(sid);
                    const salaDoc = (await salaRef.get()).data();

                    const salaQrData = {
                        id: salaRef.id,
                        salaname: salaDoc.Name,
                        edificioname: edificioDoc.data().Name,
                        edificiocolor: edificioDoc.data().Color,
                    };
                    salasQrData.push(salaQrData);
                }
            }

            return {
                status: 'success',
                code: 200,
                message: 'Qr data found',
                data: salasQrData,
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

module.exports = qrDataServices;
