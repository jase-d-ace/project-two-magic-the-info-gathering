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
                  , power INTEGER
                  , toughness INTEGER
                  , deck_id INTEGER references decks(id));
                  
INSERT INTO decks(deck_name, description) VALUES(
                                    'My Collection',
                                    'Cards you pick will be saved here.');
