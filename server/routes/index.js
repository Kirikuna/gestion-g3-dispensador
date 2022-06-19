const edificio = require('./edificioRouter');
const sala = require('./salaRouter');
const qrData = require('./qrDataRouter');

module.exports = (app) => {
    app.use('/sala', sala);
    app.use('/edificio', edificio);
    app.use('/qrdata', qrData);
};
