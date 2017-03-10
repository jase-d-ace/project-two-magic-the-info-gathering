const db = require('../database');
const cards = {};
cards.findAll = () => {
    return db.any('SELECT * FROM cards');
};
cards.findOne = (id) => {
    return db.one(`SELECT * FROM cards WHERE id = $1`, [id]);
};
cards.create = (name, type, manaCost, image, power, toughness, deck_id) => {
    return db.one(`INSERT INTO cards(name, type, manaCost, image, power, toughness, deck_id) VALUES($1, $2, $3, $4, $5, $6, $7)`, [name, type, manaCost, image, power, toughness, deck_id])
}
cards.destroy = (id) => {
    return db.none(`DELETE FROM cards WHERE id = $1`, [id])
}
module.exports = cards;