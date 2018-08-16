//https://codeburst.io/make-a-magic-the-gathering-card-in-css-5e4e06a5e604

let moves = [],
  pokemonType = [];
$(function() {
  $('#pokemonForm').submit(function(e) {
    $('.userInput-items').hide();
    e.preventDefault();
    //Take the input from the user
    let pokemonName = $('.inputBox').val().toLowerCase();
    $('.inputBox').val("");
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        let id = data.id;
        let weight = data.weight;
        let sideImg = data.sprites.back_default;
        let image = data.sprites.front_default;
        data.moves.length = 13;
        $('.pokeCards-container').removeClass('hidden');
        $('.pokeCards-background').removeClass('hidden');
        $('.pokeCards').removeClass('hidden');
        $('.pokeCards').append("<div class=\"pokeNameAndInfo\"><h4> " + pokemonName + "\t</h4><p>" + id + "</p></div>");
        // $('.pokeCards').append("<img id=\"sideImg\" src="+sideImg+">");                 
        $('.pokeCards').append("<div class=\"pokeImage\"><img src=" + image + "></div>");
        $.each(data.types, function(index, value) {
          let type = value.type.name;
          pokemonType.push(type);
        });
        $('.pokeCards').append('<div class=\"pokemonType\"><h2>Type</h2><p>' + pokemonType + '</p></div>');
        $.each(data.moves, function(index, moveData) {
          let m = moveData.move;
          moves.push(m.name);
        });
        $('.pokeCards').append('<div class=\"pokemonMoves\"><h2>Moves</h2><p>' + moves + '</p></div>');
      }
    }); //ajax ends here*/
  }); //event function ends here
}); // document ready / jquery ends here
//$('.basicInfo').append(`"<img src="${image}"/>`);