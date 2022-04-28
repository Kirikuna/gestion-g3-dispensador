const firebase= require('../config/firebase');
const db = firebase.firestore();

const testServices = {
    async addTest() {
        const docRef = db.collection('users');

        await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
        });
    },
};