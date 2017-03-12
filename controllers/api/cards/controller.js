const cards = require('../../../models/cards');
const controller = {};
controller.index = (req, res) => {
    cards.findAll().then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Index Controller Error: ', error);
    });
};
controller.show = (req, res) => {
    cards.findOne(req.params.id).then((data) => {
        res.json(data)
    }).catch((error) => {
        console.log('API Show Controller Error: ', error);
    });
};
controller.create = (req, res) => {
    cards.create(req.body.name, req.body.type, req.body.cmc, req.body.image, req.body.text, req.body.power, req.body.toughness, req.body.deck_id).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Create Controller Error: ', error);
    });
};
controller.update = (req, res) => {
    cards.update(req.params.id, req.body.deck_id).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Update Controller Error: ', error);
    })
}
controller.destroy = (req, res) => {
    decks.destroy(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Delete Controller Error: ', error)
    })
};
module.exports = controller;