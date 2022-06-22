const edificio = require('./edificioRouter');
const sala = require('./salaRouter');
const qrData = require('./qrDataRouter');
const auth = require('./authRouter');

module.exports = (app) => {
    app.use('/sala', sala);
    app.use('/edificio', edificio);
    app.use('/qrdata', qrData);
    app.use('/auth', auth);
};
