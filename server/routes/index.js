const edificio = require('./edificioRouter');
const sala = require('./salaRouter');
const auth = require('./authRouter');

module.exports = (app) => {
    app.use('/sala', sala);
    app.use('/edificio', edificio);
    app.use('/auth', auth);
};