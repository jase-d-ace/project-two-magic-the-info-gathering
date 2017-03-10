$(document).ready(function () {
    const button = $('#test');
    // this works. API is live.
    // AJAX calls that return more than one card need to be looped through
    button.click(function () {
        $.ajax({
            url: 'https://api.deckbrew.com/mtg/cards?name=jace'
            , type: 'GET'
            , success: function (data) {
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
        //instead of console logs, though, generate divs and shit. you know what to do.
        array.forEach(function (thing) {
            let testName = $('<div>');
            testName.text(thing.name);
            testName.addClass('testClass')
            $('body').append(testName);
            let testImg = $('<img>');
            testImg.attr('src', thing.editions[0].image_url);
            $('body').append(testImg);
        });
    };
    /*taking out duplicates: 
    const uniqueCards = [];
    if ($.inArray(thing.id, uniqueCards) === -1){
        uniqueCards.push(thing);
    }
    uniqueCards.forEach(function(thing))
    */
    /* double faced cards are gonna be an issue
     if(thing.layout ==='double-faced'){
     the other side has its own entry
     $.ajax({
     url: mtg api/ thing.names[1],
     type: 'GET',
     success: function(data){
     put something that changes imageUrl on testImg
     })
     }
     })
    }
    function hoverClass(image){
    */
}); //end of document.ready