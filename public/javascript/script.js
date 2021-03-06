$(document).ready(function () {
    //before we start, shoutout to deckbrew.com for the solid API
    //weirdly enough, Wizards of the Coast is rather stingy with their information
    //this API, while not perfect, got the job done!
    const form = $('.find-cards');
    //grab values from search bars to generate a URL
    //still looking for a way to refactor this nightmare
    const makeUrl = function () {
        let url = 'https://api.deckbrew.com/mtg/cards?';
        let name = {name: $('.name-input').val()}
        let color = {color: $('.color-input').val()}
        let type = {type: $('.type-input').val()}
        let text = {text: $('.text-input').val()}
        let params = [name, color, type, text];
        let searchParameters = params.map(param => {
          if(Object.values(param).join('')){
            return `&${Object.keys(param).join('')}=${Object.values(param).join('')}`
          } else {
            return
          }
        })
        console.log(url+searchParameters.join(''))
        return url+searchParameters.join('')
    };
    form.on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: makeUrl()
            , type: 'GET'
            , success: function (data) {
                $('#card-show').empty();
                loop(data);
                if (data.length === 0) {
                    let alert = $('<div>');
                    alert.text('Your parameters do not match any cards');
                    $('#card-show').append(alert);
                }
            }
            , error: function (error) {
                    alert('invalid search, please rework your query')
                } //end of error
        }); //end of AJAX GET
    }); //end of submit listener
    //use this to append everything
    const loop = function (array) {
        array.forEach(function (thing) {
            let newCard = $('<div>');
            newCard.addClass('new-card');
            let name = $('<div>');
            name.addClass('card-name');
            name.text(thing.name);
            newCard.append(name)
            let img = $('<img>');
            //API limitation:
            //image url is nested within an array...
            //...and sometimes the first index of that array...
            //...has an image of the back of a card...
            //instead of the card itself.
            if (thing.editions[0].image_url === 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') {
                if (!thing.editions[1]) {
                    //if it doesn't have a second index
                    //settle for the cardback.
                    img.attr('src', thing.editions[0].image_url);
                }
                //if it DOES have a second index, take that image instead
                else {
                    img.attr('src', thing.editions[1].image_url)
                }
            }
            //if it has the right image in index 0, take that image
            else {
                img.attr('src', thing.editions[0].image_url);
            }
            newCard.append(img);
            //save that image to pass to the backend
            let imgSrc = img.attr('src');
            let save = $('<button>');
            let cardNumber = $('<input>');
            let deckId = $('<input>');
            newCard.append(deckId)
            newCard.append(cardNumber);
            save.text('Add to Collection?').click(function () {
                for (i = 0; i < cardNumber.val(); i++) {
                    //got tired of clicking through every time i wanted multiples of a card
                    //this loops through however many times i want, and i get a bunch of the same card
                    saveCard(thing.name, thing.types[0], thing.cmc, imgSrc, thing.text, thing.power, thing.toughness, deckId.val())
                }
            }); //end of save button click listener
            newCard.append(save);
            deckId.attr('placeholder', 'Which Deck?')
            cardNumber.attr('placeholder', 'How Many ?');
            //fancy little trick i picked up from stackoverflow
            newCard.hide().appendTo('#card-show').fadeIn(1000);
        }); //end of forEach method
    }; //end of loop function
    const saveCard = function (name, type, cost, image, text, power, toughness, deck_id) {
        //found a way to add cards directly to a deck
        $.ajax({
            type: 'POST'
            , url: '/api/cards'
            , data: {
                name,
                type,
                cost,
                image,
                text,
                power,
                toughness,
                deck_id
            }
            , success: function (data) {
                window.location.replace('/cards/' + data.id)
            }
            , error: function (error) {
                    console.log('AJAX card POST error: ', error)
                } //end of error
        }); //end of AJAX POST
    }; //ends saveCard function
    $('.new-deck').on('submit', function (e) {
        e.preventDefault();
        let newName = $('.deck-name-input').val()
        let newDesc = $('.deck-description-input').val()
        createDeck(newName, newDesc);
    }); // end of createDeck submit listener
    const createDeck = function (name, description) {
        $.ajax({
            type: 'POST'
            , url: '/api/decks'
            , data: {
                name: name
                , description: description
            }
            , success: function (data) {
                console.log('AJAX is good')
                console.log(data);
                window.location.replace('/decks/');
            }
            , error: function (error) {
                console.log('AJAX deck POST error: ', error);
            }
        }); //end of AJAX POST
    }; //end of createDeck function
    $('.add-to-deck-submit').click(function () {
        let id = $('.card-id').attr('data-id')
        let deck_id = $('.add-input').val()
        changeDeck(id, deck_id)
    }); // end of assignment click listener
    const changeDeck = function (id, deck_id) {
        $.ajax({
            type: 'PUT'
            , url: '/api/cards/' + id
            , data: {
                id: id
                , deck_id: deck_id
            }
            , success: function (data) {
                window.location.replace('/decks/' + deck_id);
            }
            , error: function (error) {
                console.log('AJAX card PUT error: ', error);
            }
        }); //end of AJAX card PUT
    }; //end of addToDeck function
    $('.edit-deck').on('submit', function (e) {
        e.preventDefault();
        const id = $('.deck-id').attr('data-id');
        const name = $('.edit-name-input').val();
        const description = $('.edit-description-input').val();
        editDeck(id, name, description)
    }); //end of edit submit form listener
    const editDeck = function (id, name, description) {
        $.ajax({
            type: 'PUT'
            , url: '/api/decks/' + $('.deck-id').attr('data-id')
            , data: {
                id: id
                , name: name
                , description: description
            }
            , success: function (data) {
                window.location.replace('/decks/' + $('.deck-id').attr('data-id'));
            }
            , error: function (error) {
                    console.log('AJAX deck PUT error: ', error);
                } //end of error
        }); //end of AJAX deck PUT
    }; //end of editDeck function
    $('.delete-button').click(function () {
        //delete button won't work unless there's something on the page to render the id of the deck
        //but the deck can't be deleted because its a foreign key for anything else in here
        //so there's no way to get the id on the page while keeping the deck empty
        //so we hack.
        if (confirm('Are you sure you want to delete this deck?')) {
            const id = window.location.href.split('/')
                //this parses the URL and grabs the id from there
                //hacky? yes. inelegant? absolutely. does it work? you bet your bottom dollar it does.
            deleteDeck(id[4]);
        }; //end of confirm check
    }); // end of delete button listener
    const deleteDeck = function (id) {
        $.ajax({
            type: 'DELETE'
            , url: '/api/decks/' + id
            , success: function (data) {
                window.location.replace('/decks');
            }
            , error: function (error) {
                console.log('AJAX deck DELETE Error: ', error)
            }
        }); //end of AJAX deck DELETE
    }; //end of deleteDeck function
    $('.delete-card').click(function () {
        if (confirm('Are you sure you want to delete this card?')) {
            const id = $('.card-id').attr('data-id');
            deleteCard(id)
        };
    }); //end of delete card click listener
    const deleteCard = function (id) {
        $.ajax({
            type: 'DELETE'
            , url: '/api/cards/' + id
            , success: function (data) {
                window.location.replace('/decks');
            }
            , error: function (error) {
                console.log('AJAX card DELETE Error: ', error)
            }
        }); //end of AJAX card DELETE
    }; //end of deleteCard function
    const sampleHand = function (id) {
        $.ajax({
            type: 'GET'
            , url: '/api/decks/' + id
            , success: function (data) {
                $('.sample-hand').empty();
                drawCards(data);
            }
            , error: function (error) {
                console.log('AJAX Sample Hand Error: ', error);
            }
        }); //end of AJAX sample hand GET
    }; //end of sampleHand function
    $('.generate-hand').click(function () {
        const id = $('.show-id').attr('data-id');
        sampleHand(id);
    }); //end of generate hand listener
    const drawCards = function (array) {
        array.forEach(function (card) {
            let hand = $('<div>');
            let thisCard = $('<div>');
            thisCard.text(card.card_name);
            let thisImg = $('<img>');
            thisImg.attr('src', card.image);
            thisCard.appendTo(hand);
            thisImg.appendTo(hand);
            hand.hide().appendTo('.sample-hand').fadeIn(3000);
        }); //end of forEach method
    }; // end drawCards function
}); //end of document.ready don't touch this!
