const db = require('../database/models');

const mainController = {
    index: (req, res) => res.render('home'),
};

module.exports = mainController;