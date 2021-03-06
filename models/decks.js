const db = require('../database');
const decks = {};
decks.findAll = (user_id) => {
    //don't grab decks that belong to other people! 
    //this ensures you get only your own
    return db.any(`SELECT *, decks.id AS deckid FROM decks JOIN users ON users.id = decks.user_id WHERE user_id=$1`, [user_id])
};
decks.showDeck = (id) => {
    //small spin on the 'findOne' method
    //still finds one, but displays more than one element
    return db.any(`SELECT *, cards.id AS card_id, decks.deck_name AS deck_name FROM cards 
JOIN decks ON decks.id = cards.deck_id WHERE deck_id = $1`, [id]);
};
decks.findOne = (id) => {
    //for delete and update methods
    return db.one('SELECT * FROM decks WHERE id = $1', [id])
}
decks.sampleHand = (deck_id) => {
    //sampleHand just picks up 7 random cards
    //as if you shuffled your deck and drew a hand
    return db.any('SELECT * FROM cards JOIN decks ON decks.id = cards.deck_id WHERE deck_id = $1 ORDER BY RANDOM() LIMIT 7', [deck_id])
}
decks.create = (name, description, user_id, id) => {
    return db.one(`INSERT INTO decks(deck_name, description, user_id) VALUES($1, $2, $3) returning id`, [name, description, user_id, id]);
};
decks.update = (id, name, description) => {
    return db.one(`UPDATE decks SET deck_name = $1, description = $2 WHERE id = $3 returning id`, [name, description, id])
};
decks.destroy = (id) => {
    return db.none(`DELETE FROM decks WHERE id = $1`, [id])
};
module.exports = decks;