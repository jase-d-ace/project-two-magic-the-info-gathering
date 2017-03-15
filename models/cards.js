const db = require('../database');
const cards = {};
//not much to do with cards. There isn't a need for CRUD functionality, since you don't want to change official MTG stuff
cards.findAll = () => {
    return db.any('SELECT * FROM cards');
};
cards.findOne = (id) => {
    return db.one(`SELECT * FROM cards WHERE id = $1`, [id]);
};
cards.create = (name, type, cost, image, oracle_text, power, toughness, deck_id) => {
    //this doesn't actually create anything
    //this just takes existing values and adds them to the database.
    return db.one(`INSERT INTO cards(card_name, type, cost, image, oracle_text, power, toughness, deck_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning id`, [name, type, cost, image, oracle_text, power, toughness, deck_id])
}
cards.update = (id, deck_id) => {
    return db.one(`UPDATE cards SET deck_id = $1 WHERE id = $2 returning id`, [deck_id, id])
}
cards.destroy = (id) => {
    return db.none(`DELETE FROM cards WHERE id = $1`, [id])
}
module.exports = cards;