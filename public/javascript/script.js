$(document).ready(function () {
    const form = $('.find-cards');
    const makeUrl = function () {
        let url = 'https://api.deckbrew.com/mtg/cards?';
        let name = $('.name-input').val();
        let color = $('.color-input').val();
        let type = $('.type-input').val();
        if (name != '') {
            url += '&name=' + name;
        }
        if (color != '') {
            url += '&color=' + color;
        }
        if (type != '') {
            url += '&type=' + $('.type-input').val();
        }
        if (name === '' && color === '' && type === '') {
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
                console.log('nope, you messed up. fix it.')
            }
        });
    });
    //use this to append everything
    //also remember to add a CSS class so that this shit looks pretty, please.
    const loop = function (array) {
            //        instead of console logs, though, generate divs and shit. you know what to do.
            array.forEach(function (thing) {
                    let testName = $('<div>');
                    testName.text(thing.name);
                    $('#card-show').append(testName);
                    let testImg = $('<img>');
                    if (thing.editions[0].image_url === 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') {
                        if (!thing.editions[1]) {
                            testImg.attr('src', thing.editions[0].image_url);
                        }
                    }
                    else {
                        testImg.attr('src', thing.editions[0].image_url);
                    }
                    $('#card-show').append(testImg);
                }) //end of forEach method
        } //end of loop function
}); //end of document.ready