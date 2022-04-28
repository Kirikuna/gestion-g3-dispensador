const dispensadores = require('./dispensadores');
const edificio = require('./edificioRouter');

module.exports = (app) => {
    app.use('/dispensadores', dispensadores);
    app.use('/edificio', edificio);
};