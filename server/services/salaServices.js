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
                    const timestamp = firebase.firestore.Timestamp.now();
                    const ts = timestamp.toDate();
                    const date = ts.toLocaleDateString();
                    const time = ts.toLocaleTimeString();

                    const log = { Report: 'Solucionado', Date: date, Time: time };
                    const salaAdd = await salasRef.add({
                        Name: name,
                        State: 0,
                        NumberOfReports: 0,
                        Logs: log,
                    });

                    await salaAdd.collection('logs').add({
                        Report: 'Creada',
                        Timestamp: timestamp,
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
                            Logs: log,
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
    async salaExists(id, edificioName) {
        try {
            const edificioQuery = db
                .collection('edificios')
                .where('Name', '==', edificioName);
            const snapshot = await edificioQuery.get();

            if (!snapshot.empty) {
                const edificioDoc = snapshot.docs[0];
                const edifSalas = edificioDoc.data().Rooms;

                const salaRef = db.collection('salas').doc(id);
                const salaDoc = await salaRef.get();

                if (salaDoc.exists && edifSalas.includes(id)) {
                    return {
                        status: 'success',
                        code: 200,
                        message: 'Sala exists',
                        data: { exists: true, eid: edificioDoc.id, sid: id },
                    };
                } else {
                    return {
                        status: 'failed',
                        code: 404,
                        message: 'Sala does not exists',
                        data: { exists: false },
                    };
                }
            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'Edificio does not exists',
                    data: { exists: false },
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
                const logsCol = await salaRef.collection('logs').get();
                const logs = logsCol.docs
                    .map(logDoc => {
                        const ts = logDoc.data().Timestamp.toDate();
                        const date = ts.toLocaleDateString();
                        const time = ts.toLocaleTimeString();
                        return {
                            id: logDoc.id,
                            Report: logDoc.data().Report,
                            Date: date,
                            Time: time,
                            ts: ts,
                        }
                    })
                    .sort((a, b) => b.ts.getTime() - a.ts.getTime());

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
                const timestamp = firebase.firestore.Timestamp.now();
                const ts = timestamp.toDate();
                const date = ts.toLocaleDateString();
                const time = ts.toLocaleTimeString();

                const log = { Report: 'Solucionado', Date: date, Time: time };
                await salaRef.update({
                    State: 0,
                    NumberOfReports: 0,
                    Logs: log,
                });

                

                await salaRef.collection('logs').add({
                    Report: 'Solucionado',
                    Timestamp: timestamp,
                });

                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala updated successfully',
                    data: {
                        Name: salaDoc.data().name,
                        NumberOfReports: 0,
                        State: 0,
                        Log: log,
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
    async reportSala(id, report) {
        try {
            const salaRef = db.collection('salas').doc(id);
            const salaDoc = await salaRef.get();
            if (salaDoc.exists) {
                let newState = 1;
                // 9 should be a global parameter or env variable
                if (salaDoc.data().NumberOfReports >= 9) newState = 2;

                const timestamp = firebase.firestore.Timestamp.now();
                const ts = timestamp.toDate();
                const date = ts.toLocaleDateString();
                const time = ts.toLocaleTimeString();

                const log = { Report: report, Date: date, Time: time };

                await salaRef.update({
                    State: newState,
                    NumberOfReports: salaDoc.data().NumberOfReports + 1,
                    Logs: log,
                });

                await salaRef.collection('logs').add({
                    Report: report,
                    Timestamp: timestamp,
                });

                return {
                    status: 'success',
                    code: 200,
                    message: 'Sala reported successfully',
                    data: {
                        Name: salaDoc.data().name,
                        NumberOfReports: salaDoc.data().NumberOfReports + 1,
                        State: newState,
                        Log: log,
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
