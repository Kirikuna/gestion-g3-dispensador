const dispensadores = require('./dispensadores');
module.exports = (app) => {
    app.use('/dispensadores', dispensadores)
};