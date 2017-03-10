DROP TABLE IF EXISTS decks CASCADE;
DROP TABLE IF EXISTS cards;

CREATE TABLE decks(id SERIAL PRIMARY KEY NOT NULL
                  , name VARCHAR NOT NULL
                  , description TEXT NOT NULL);

CREATE TABLE cards(id SERIAL PRIMARY KEY NOT NULL
                  , name VARCHAR NOT NULL
                  , type VARCHAR NOT NULL
                  , cost INTEGER NOT NULL
                  , image VARCHAR NOT NULL
                  , power INTEGER NOT NULL
                  , toughness INTEGER NOT NULL
                  , deck_id INTEGER references decks(id));
                  
INSERT INTO decks(name, description) VALUES(
                                    'My First Deck',
                                    'This is my first deck!');
