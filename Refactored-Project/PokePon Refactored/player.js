Pokepon = require('./pokepon.js');

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');
var configRef = dataRef.child('config');

Player = function(playerRef, playerIndex, game) {
  this.playerRef = playerRef;
  this.playerIndex = playerIndex;
  this.game = game;
  this.pokepon = new Pokepon(playerIndex, this.playerRef.child('pokepon'), this.game);
}

Player.prototype.attack = function() {
  this.enemy.pokepon.damage(10);
}

Player.prototype.leaveGame = function() {
  // this.game.players.remove(this);
  if (this.type === "player") {
    this.game.stop();
  }
}

module.exports = Player;
