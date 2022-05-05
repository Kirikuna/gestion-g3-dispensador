const edificio = require('./edificioRouter');
const sala = require('./salaRouter');

module.exports = (app) => {
    app.use('/sala', sala);
    app.use('/edificio', edificio);
};