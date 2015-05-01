var Player = require('./player.js');

Game = function (gameRef, id) {
  this.players = new Array();
  this.gameRef = gameRef;
  this.id = id;
  this.isStarted = false;
}

Game.prototype.start = function() {
  if (!this.isStarted && this.players.length >= 2) {
    console.log("started");
    this.isStarted = true;
    this.players[0].enemy = this.players[1];
    this.players[1].enemy = this.players[0];
  }
}

Game.prototype.stop = function() {
  // this.players = new Array();
  this.sockets.emit('gameover');
  this.gameRef.remove();
}

Game.prototype.isFull = function() {
  return this.players.length >= 2;
}

Game.prototype.createPlayer = function(socketId) {
  console.log(this.gameRef);
  console.log(socketId);
  var player = new Player(this.gameRef.child(socketId), this.players.length, this);
  this.players.push(player);
  if (this.players.length <= 2) {
    player.type = "player";
  } else {
    player.type = "spectator";
  }
  return player;
}

module.exports = Game;
