DROP TABLE IF EXISTS decks CASCADE;
DROP TABLE IF EXISTS cards;

CREATE TABLE decks(id SERIAL PRIMARY KEY NOT NULL
                  , deck_name VARCHAR NOT NULL
                  , description TEXT NOT NULL);

CREATE TABLE cards(id SERIAL PRIMARY KEY NOT NULL
                  , card_name VARCHAR NOT NULL
                  , type VARCHAR NOT NULL
                  , cost INTEGER NOT NULL
                  , image VARCHAR NOT NULL
                  , oracle_text VARCHAR
                  , power INTEGER DEFAULT 0
                  , toughness INTEGER DEFAULT 0
                  , deck_id INTEGER references decks(id) DEFAULT 1);
                  
INSERT INTO decks(deck_name, description) VALUES(
                                    'Your Collection',
                                    'Cards you pick will be saved here until you assign them.');
