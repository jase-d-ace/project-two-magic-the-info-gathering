$(document).ready(function () {
    const button = $('#test');
    // this works. API is live.
    // access elements by data.cards[index].key
    // AJAX calls that return more than one card need to be looped through
    button.click(function () {
        $.ajax({
            url: 'https://api.magicthegathering.io/v1/cards?name=abolisher+of+bloodlines'
            , type: 'GET'
            , success: function (data) {
                loop(data.cards);
            }
            , error: function (error) {
                console.log('nope, you messed up. fix it.')
            }
        });
    });
    //use this to append everything
    const loop = function (array) {
        //instead of console logs, though, generate divs and shit. you know what to do.
        array.forEach(function (thing) {
            let testName = $('<div>');
            testName.text(thing.name);
            $('body').append(testName);
            let testImg = $('<img>');
            testImg.attr('src', thing.imageUrl);
            $('body').append(testImg);
            console.log(thing.name, thing.manaCost);
        })
    };
}); //end of document.ready