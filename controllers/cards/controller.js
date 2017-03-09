const cards = require('../../models/cards');
const controller = {};
controller.index = (req, res) => {
    cards.findAll().then((data) => {
        res.render('cards/index', {
            cards: data
        });
    }).catch((error) => {
        console.log('Card Index Controller Error: ', error)
    });
};
controller.show = (req, res) => {
    const id = req.params.id
    cards.findOne(id).then((data) => {
        res.render('cards/show', data);
    }).catch((error) => {
        console.log('Card Show Controller Error: ', error);
    });
};
module.exports = controller;