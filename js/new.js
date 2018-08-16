//https://codepen.io/bboyle/pen/QmmNLJ?editors=1111
var pokeImgSource = ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png"];
var firstCard;
var currentCard;
var counter = 0;
var imageFound = 0;
$(function() {
  for (let x = 1; x < 3; x++) {
    $.each(pokeImgSource, function(i, val) {
      $("#boxcard").append("<div id=card-" + x + "-" + i + "><img src=" + val + "></div>");
    });
  }
  shuffleCards();
  $("#boxcard div").on("click", flipCard);
  $('.resetButton').on("click", resetGame);
});

function flipCard() {
  // find the image that was clicked on
  currentCard = $(this).find("img");
  // if hidden, show it
  if (currentCard.is(":hidden")) {
    currentCard.slideDown("fast");
    // do we the last image to compare?
    if (firstCard) {
      console.info('second card selected');
      //if both cards are equal it's a match
      if (firstCard.attr("src") == currentCard.attr("src")) {
        (firstCard).parent().css("visibility", "hidden");
        (currentCard).parent().css("visibility", "hidden");
        console.info("matched!");
        imageFound++;
      } else {
        console.warn("not a match!");
        // TODO can we make these cards disappear together?
        currentCard.delay(500).slideUp("slow");
        firstCard.delay(500).slideUp("slow");
      }
      currentCard = firstCard = null;
    } else {
      console.info('first card selected');
      // they have only clicked one card
      console.log("currentCard", currentCard.attr('src'));
      firstCard = currentCard;
      console.log("firstCard", firstCard.attr('src'));
    }
    counter++;
    console.log(counter);
    $('.counterButton').html(" " + counter + " clicks");
    if (imageFound == pokeImgSource.length) {
      $(".counterButton").prepend('<span id="success">You Found All Pictues With </span>');
    }
  }
}

function shuffleCards() {
  // jQuery specific:
  // 1) remove elements from DOM and convert them into a native JavaScript array
  // 2) apply algorithm
  // 3) inject the array back to DOM
  var a = $("#boxcard > div").remove().toArray();
  for (var i = 0; i < a.length; i++) {
    var random = Math.round(Math.random() * i);
    var temp = a[i];
    a[i] = a[random];
    a[random] = temp;
  }
  $("#boxcard").append(a);
}

function resetGame() {
  shuffleCards();
 /* $("#boxcard div img").hide();
  $("#boxcard div").css("visibility", "visible");
  counter = 0;
  $("#success").remove();
  $(".counterButton").html("" + counter);
  currentCard = "";
  firstCard = "";
  imageFound = 0;
  // flipCard();*/

   document.location.reload(true);
   
}