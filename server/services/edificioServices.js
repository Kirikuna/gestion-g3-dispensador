const firebase= require('../config/firebase');
const db = firebase.firestore();

const edificioServices = {
    async addEdificio(name, color){
        try {
            console.log(name, color)
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
    }
}

module.exports = edificioServices;