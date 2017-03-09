const db = require('../database');
const cards = {};
cards.findAll = () => {
    return db.any('SELECT * FROM cards');
};
cards.findOne = (id) => {
    return db.one(`SELECT * FROM cards WHERE id = $1`, [id]);
};
module.exports = cards;