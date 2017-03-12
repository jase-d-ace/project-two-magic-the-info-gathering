const db = require('../database');
const decks = {};
decks.findAll = () => {
    return db.any('SELECT * FROM decks');
};
decks.showDeck = (id) => {
    return db.any(`SELECT * FROM cards 
JOIN decks ON decks.id = cards.deck_id 
WHERE deck_id = $1`, [id])
};
decks.create = (name, description) => {
    return db.one(`INSERT INTO decks(deck_name, description) VALUES($1, $2) returning id`, [name, description])
}
decks.update = (id, name, description) => {
    return db.one(`UPDATE decks SET deck_name = $1, description = $2 returning id`, [name, description])
};
decks.destroy = (id) => {
    return db.none(`DELETE FROM decks WHERE id = $1`, [id])
};
module.exports = decks;