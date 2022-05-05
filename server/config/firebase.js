const fs = require('firebase-admin');

const firebaseConfig = require('../reporte-dispensadores-firebase-adminsdk-osq0a-95b3a59ea1.json')

fs.initializeApp({
    credential: fs.credential.cert(firebaseConfig),
});

module.exports = fs;