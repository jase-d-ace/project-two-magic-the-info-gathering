$(document).ready(function () {
    const form = $('.find-cards');
    const makeUrl = function () {
        let url = 'https://api.deckbrew.com/mtg/cards?';
        let name = $('.name-input').val();
        let color = $('.color-input').val();
        let type = $('.type-input').val();
        let text = $('.text-input').val();
        if (name != '') {
            url += '&name=' + name;
        }
        if (color != '') {
            url += '&color=' + color;
        }
        if (type != '') {
            url += '&type=' + type;
        }
        if (text != '') {
            url += '&oracle=' + text;
        }
        if (name === '' && color === '' && type === '' && text === '') {
            alert('please enter search parameters')
        }
        return url;
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
            let name = $('<div>');
            name.text(thing.name);
            $('#card-show').append(name);
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
            $('#card-show').append(img);
            //save that image to pass to the backend
            let imgSrc = img.attr('src');
            let save = $('<button>');
            save.text('Add to Collection?').click(function () {
                saveCard(thing.name, thing.types[0], thing.cmc, imgSrc, thing.text, thing.power, thing.toughness)
            }); //end of save button click listener
            $('#card-show').append(save);
        }); //end of forEach method
    }; //end of loop function
    const saveCard = function (name, type, cost, image, text, power, toughness, deck_id) {
        $.ajax({
            type: 'POST'
            , url: '/api/cards'
            , data: {
                name: name
                , type: type
                , cmc: cost
                , image: image
                , text: text
                , power: power
                , toughness: toughness
                , deck_id: 1
                    //default is to put card in general collection;
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
    })
    const createDeck = function (name, description) {
        $.ajax({
            type: 'POST'
            , url: '/api/decks'
            , data: {
                name: name
                , description: description
            }
            , success: function (data) {
                window.location.replace('/decks/' + data.id);
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
    });
    const changeDeck = function (id, deck_id) {
        $.ajax({
            type: 'PUT'
            , url: '/api/cards/' + $('.card-id').attr('data-id')
            , data: {
                id: id
                , deck_id: deck_id
            }
            , success: function (data) {
                window.location.replace('/decks/' + $('.add-input').val());
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
    })
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
}); //end of document.ready