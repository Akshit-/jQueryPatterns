
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var routes = require('./routes');
var game = require('./routes/game');
var soundcloud = require('./routes/soundcloud');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', game.list);
app.get('/games', game.list);
app.get('/games/create', game.create);
app.get('/games/:id', game.view);

app.get('/soundcloud', soundcloud.index);
app.get('/soundcloud-auth', soundcloud.auth);

var fs = require('fs');
var beatsArray = fs.readFileSync('./beats/90304600.txt').toString().split("\n");

io.sockets.on('connection', function (socket) {
  var myGame;
  var myPlayer;

  socket.on('disconnect', function () {
    if (!myGame || !myPlayer) {
      return;
    }

    myPlayer.leaveGame();
  });

  socket.on('join', function(data) {
    myGame = game.games[data.id];
    if (!myGame) {
      console.error("game does not exist");
      return;
    }

    myGame.sockets = io.sockets;
    myPlayer = myGame.createPlayer(socket.id);
    myPlayer.id = socket.id;
    game.players[socket.id] = myPlayer;
    socket.emit('joined', {
      type: myPlayer.type,
      id: socket.id,
      pic: myPlayer.pokepon.urlNumber
    });

    if (myGame.players.length === 2) {
      myGame.start();
      io.sockets.emit('gameStart', {
        "player1": myGame.players[0].id,
        "player2": myGame.players[1].id,
        "pokepon1": myGame.players[0].pokepon.urlNumber,
        "pokepon2": myGame.players[1].pokepon.urlNumber,
        "beats" : beatsArray,
        "song" : myGame.song,
        "gameId": myGame.id
      });
    }
 });

  socket.on('print', function() {
    console.log(myGame);
    console.log(game.games);
  });

  socket.on('attack', function(data) {
    myPlayer.attack();
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
