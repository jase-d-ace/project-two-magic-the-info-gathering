const decks = require('../../../models/decks');
const controller = {};
controller.index = (req, res) => {
    decks.findAll().then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Index Controller Error: ', error);
    });
};
controller.show = (req, res) => {
    const id = req.params.id
    decks.showDeck(id).then((data) => {
        res.json(data)
    }).catch((error) => {
        console.log('API Show Controller Error: ', error);
    });
};
controller.create = (req, res) => {
    decks.create(req.body.name, req.body.description).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Create Controller Error: ', error);
    });
};
controller.sampleHand = (req, res) => {
    decks.sampleHand(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Sample Hand Controller Error: ', error)
    })
}
controller.update = (req, res) => {
    decks.update(req.params.id, req.body.name, req.body.description).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Update Controller Error: ', error);
    });
};
controller.destroy = (req, res) => {
    decks.destroy(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('API Delete Controller Error: ', error)
    })
}
module.exports = controller;