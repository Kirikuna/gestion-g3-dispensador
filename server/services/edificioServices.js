const firebase= require('../config/firebase');
const db = firebase.firestore();

const edificioServices = {
    async addEdificio(name, color){
        try {
            const edificiosRef = db.collection('edificios');
            const edificioAdd = await edificiosRef.add({
                Name: name,
                Color: color,
                Rooms: [],
            })

            return {
                status: true,
                message: 'Edificio added successfully',
                code: 200,
                data: {
                    id: edificioAdd.id,
                    Name: name,
                    Color: color,
                    Rooms: [],
                },
            };
        } catch (error){
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
    async getEdificio(id){
        try {
            const edificioRef = db.collection('edificios').doc(id);
            const edificioDoc = await edificioRef.get()
            if (edificioDoc.exists) {
                return {
                    status: 'success',
                    code: 200,
                    message: 'Edificio data found',
                    data: edificioDoc.data(),
                };

            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Edificio data found',
                    data: {},
                };
            }
        } catch (error){
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
    async updateEdificio(id, name, color){
        try {
            const edificioRef = db.collection('edificios').doc(id);
            const edificioDoc = await edificioRef.get()
            if (edificioDoc.exists) {
                await edificioRef.update( {
                    Name: name,
                    Color: color,
                });
                return {
                    status: 'success',
                    code: 200,
                    message: 'Edificio updated successfully',
                    data: {
                        Name: name,
                        Color: color,
                        Rooms: edificioDoc.data().Rooms
                    },
                };

            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Edificio data found',
                    data: {},
                };
            }
        } catch (error){
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
    async deleteEdificio(id){
        try {
            const edificioRef = db.collection('edificios').doc(id);
            const edificioDoc = await edificioRef.get()
            if (edificioDoc.exists) {
                await edificioRef.delete();
                return {
                    status: 'success',
                    code: 200,
                    message: 'Edificio deleted successfully',
                    data: id,
                };

            } else {
                return {
                    status: 'failed',
                    code: 404,
                    message: 'No Edificio data found',
                    data: {},
                };
            }
        } catch (error){
            return {
                status: 'failed',
                code: 500,
                message: error.trace,
                data: {},
            };
        }
    },
}

module.exports = edificioServices;