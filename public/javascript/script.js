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
    }
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
    //also remember to add a CSS class so that this shit looks pretty, please.
    const loop = function (array) {
            //        instead of console logs, though, generate divs and shit. you know what to do.
            array.forEach(function (thing) {
                    let name = $('<div>');
                    name.text(thing.name);
                    $('#card-show').append(name);
                    let img = $('<img>');
                    if (thing.editions[0].image_url === 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') {
                        if (!thing.editions[1]) {
                            img.attr('src', thing.editions[0].image_url);
                        }
                        else {
                            img.attr('src', thing.editions[1].image_url)
                        }
                    }
                    else {
                        img.attr('src', thing.editions[0].image_url);
                    }
                    $('#card-show').append(img);
                    let imgSrc = img.attr('src')
                    let save = $('<button>')
                    save.text('save this card?').click(function () {
                        saveCard(thing.name, thing.types[0], thing.cmc, imgSrc, thing.text, thing.power, thing.toughness)
                    }); //end of save button click listener
                    $('#card-show').append(save);
                }) //end of forEach method
        } //end of loop function
    const saveCard = function (name, type, cost, image, text, power, toughness, deck_id) {
            $.ajax({
                    type: 'POST'
                    , url: '/api/cards'
                    , data: {
                        name: name
                        , type: type
                        , cmc: cost
                        , image: image
                        , oracle_text: text
                        , power: power
                        , toughness: toughness
                            //deck_id will end up changing at some point.
                            
                        , deck_id: 1
                    }
                    , success: function (data) {
                        window.location.replace('/cards/' + data.id)
                    }
                    , error: function (error) {
                            console.log('AJAX POST error: ', error)
                        } //end of error
                }) //end of AJAX POST
        } //ends save card function
}); //end of document.ready