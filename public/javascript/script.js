$(document).ready(function () {
    const form = $('.find-cards');
    // this works. API is live.
    // AJAX calls that return more than one card need to be looped through
    const urlAddOns = [];
    const addOn = function (text) {
        if (text != undefined) {
            urlAddOns.push(text);
        }
    }
    addOn($('.name-input').val());
    addOn($('.color-input').val());
    addOn($('.type-input').val());
    form.on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'https://api.deckbrew.com/mtg/cards?'
            , type: 'GET'
            , success: function (data) {
                $('#card-show').empty();
                loop(data);
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
                    testName.addClass('testClass')
                    $('#card-show').append(testName);
                    let testImg = $('<img>');
                    if (thing.editions[0].image_url.indexOf('https://image.deckbrew.com/mtg/multiverseid/0.jpg') != -1) {
                        testImg.attr('src', thing.editions[1].image_url)
                    }
                    else {
                        testImg.attr('src', thing.editions[0].image_url);
                    }
                    $('#card-show').append(testImg);
                }) //end of forEach method
        } //end of loop function
}); //end of document.ready