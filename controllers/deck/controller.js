const decks = require('../../../models/decks');
const controller = {};
controller.index = (req, res) => {
    decks.findAll().then((data) => {
        res.render('decks/index', {
            decks: data
        });
    }).catch((error) => {
        console.log('Deck Index Controller Error: ', error);
    });
};
controller.show = (req, res) => {
    const id = req.params.id;
    decks.showDeck(id) => {
        res.render('decks/show', {
            deckList: data
        });
    }).catch((error) => {
    console.log('Deck Show Controller Error: ', error);
});
};
controller.new = (req, res) => {
    res.render('decks/new');
};
controller.update = (req, res) => {
    const id = req.params.id;
    decks.findOne(id).then((data) => {
        res.render('decks/edit');
    }).catch((error) => {
        console.log('Deck Edit Controller Error: ', error);
    });
};
module.exports = controller;