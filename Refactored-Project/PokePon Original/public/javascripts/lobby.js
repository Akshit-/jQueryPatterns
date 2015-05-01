var baseUrl = 'https://pokepon.firebaseio.com/';
var gamesRef;

var loadGamesList = function() {
  gamesRef.on('child_added', function(data) {
    var game = data.val();
    if (!game.id) {
      return;
    }
    $("#gamesList").append('<li id="' + game.id + '"><a href="/games/' + game.id + '">' + game.id + '</a></li>');
  });
  gamesRef.on('child_removed', function(data) {
    var game = data.val();
    if (!game.id) {
      return;
    }
    $("#" + game.id).remove();
  });
}

$(function() {
  gamesRef = new Firebase(baseUrl + "games");
  loadGamesList();
});
