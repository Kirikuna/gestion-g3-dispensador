const firebase = require('../config/firebase');
const db = firebase.firestore();

const salaServices = {
    async addSala(eid, name) {
        try {
            const edificioRef = db.collection('edificios').doc(eid);
            const edificioDoc = await edificioRef.get();
            if (edificioDoc.exists) {
                const salasRef = db.collection('salas');
                const match = await salasRef.where('Name', '==', name).get();

                if (match.empty) {
                    const salaAdd = await salasRef.add({
                        Name: name,
                        State: 0,
                        NumberOfReports: 0,
                    });

                    await salaAdd.collection('logs').add({
                        Report: 'Creada',
                        Timestamp: firebase.firestore.Timestamp.now(),
                    });

                    await edificioRef.set(
                        {
                            Rooms: firebase.firestore.FieldValue.arrayUnion(
                                salaAdd.id
                            ),
                        },
                        { merge: true }
                    );

                    return {
                        status: true,
                        message: 'Sala added successfully',
                        code: 200,
                        data: {
                            id: salaAdd.id,
                            Name: name,
                            State: 0,
                            NumberOfReports: 0,
                        },
                    };
                } else {
                    return {
                        status: 'failed',
                        code: 404,
                        message: 'Sala already exists',
                        data: {},
                    };
                }
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
    async getSala(id) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala data found',
                    data: salaDoc.data(),
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Sala data found',
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
    async getAllSalas() {
        try {
            const salas = [];
            const salasRef = db.collection('salas');
            const snapshot = await salasRef.get();
            snapshot.forEach((doc) => {
                salas.push({ id: doc.id, ...doc.data() });
            });

            return {
                status: 'success',
                code: 200,
                message: 'Salas found',
                data: salas,
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
    async getSalasOfEdificio(eid) {
        try {
            const salas = [];
            const edificioRef = db.collection('edificios').doc(eid);
            const edificioDoc = await edificioRef.get();
            if (edificioDoc.exists) {
                const edificioSalas = edificioDoc.data().Rooms;
                for (const sid of edificioSalas) {
                    const salaRef = db.collection('salas').doc(sid);
                    const salaDoc = (await salaRef.get()).data();

                    salaDoc.id = salaRef.id;
                    salas.push(salaDoc);
                }

                return {
                    status: 'success',
                    code: 200,
                    message: 'Salas retrieved successfully',
                    data: salas,
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
    async updateSala(id, name) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                await salaRef.update({
                    Name: name,
                });
                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala updated successfully',
                    data: {
                        Name: name,
                        NumberOfReports: salaDoc.data().NumberOfReports,
                        State: salaDoc.data().State,
                    },
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Sala data found',
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
    async deleteSala(id) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                const edificiosRef = db
                    .collection('edificios')
                    .where('Rooms', 'array-contains', id);

                const matches = (await edificiosRef.get()).docs;
                for (const edificio of matches) {
                    await edificio.ref.update({
                        Rooms: firebase.firestore.FieldValue.arrayRemove(id),
                    });
                }

                await salaRef.delete();
                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala deleted successfully',
                    data: id,
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Sala data found',
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
    async getLogs(id) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                const logs = [];

                const logsCol = await salaRef.collection('logs').get();

                for (const logDoc of logsCol.docs) {
                    const ts = logDoc.data().Timestamp.toDate();
                    const date = ts.toLocaleDateString();
                    const time = ts.toLocaleTimeString();

                    const log = {
                        id: logDoc.id,
                        Report: logDoc.data().Report,
                        Date: date,
                        Time: time,
                    };
                    logs.push(log);
                }

                return {
                    status: 'success',
                    code: 200,
                    message: 'Logs found',
                    data: logs,
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Sala data found',
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
    async solveSala(id) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                await salaRef.update({
                    State: 0,
                    NumberOfReports: 0,
                });
                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala updated successfully',
                    data: {
                        Name: salaDoc.data().name,
                        NumberOfReports: 0,
                        State: 0,
                    },
                };
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Sala data found',
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
};

module.exports = salaServices;
