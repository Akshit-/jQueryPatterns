var baseUrl = 'https://pokepon.firebaseio.com/';

var $mypokepon = $('#mypokepon');


Client = function() {
  this.isStarted = false;
}

Client.prototype.loadMusic = function(trackId) {
  var self = this;
  var songUrl = baseUrl + "games/" + self.gameId + "/song";
  var songRef = new Firebase(songUrl);
  // songRef.on('value', function(dataSnapshot) {
  //   // SC.stream('/tracks/108831064', function(s) {
  //   SC.stream('/tracks/' + trackId, function(s) {
  //     self.sound = s;
  //   });
  // }
  songRef.set(trackId);
}

Client.prototype.connect = function() {
  var self = this;
  var url = window.location.href;
  self.gameId = url.substr(url.lastIndexOf('/') + 1);

  var urlToConnect = url.split('/')[2];
  console.log(urlToConnect);
  self.socket = io.connect("http://" + urlToConnect);

  self.socket.on('joined', function(player) {
    self.id = player.id;

    if (player.type !== 'player') {
      // which means there are more than 2 players in the game, and this player becomes a spectator.
      // disable key input for this player
      return;
    }
    
    //REFACTORED by caching
    $mypokepon.attr("src", 'http://sprites.pokecheck.org/i/' + player.pic + '.gif');
    //$('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + player.pic + '.gif');
  
  });

  self.socket.on('gameStart', function(data) {
    if (data.gameId !== self.gameId) {
      return;
    }

    self.isStarted = true;

    var url1 = baseUrl +  "games/" + self.gameId + '/' + data.player1 + '/pokepon';
    var url2 = baseUrl +  "games/" + self.gameId + '/' + data.player2 + '/pokepon';
    self.pic1 = data.pokepon1;
    self.pic2 = data.pokepon2;
    beatsUI.setup(data.beats);
    beatsUI.play();

   SC.stream('/tracks/90304600', function(s) {
     self.sound = s;
     self.sound.play();
   });
      
    var $yourname = $('#you').find('.name');
    var $opponentname = $('#opponent').find('.name');    
    var $enemypokepon = $('#enemypokepon');
    var $yourhealthbar = $('#you').find('.health-bar');
    var $healthnumber = $('.health-number');
    var $opponenthealthbar = $('#opponent').find('.health-bar');
   
    // TODO(melanie: set the right ref based on my self.id
    if (data.player1 === self.id) {
        console.log("I'm on the left", data.pokepon2);
    
        //REFACTORED   
        $yourname.html("melaniec"); //$('#you .name').html("melaniec");
        $opponentname.html("sdjidjev"); //$('#opponent .name').html("sdjidjev");
        
        self.pokeponRef = new Firebase(url1);
        self.enemyRef = new Firebase(url2);
        // $('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon1 + '.gif');
        $enemypokepon.attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon2 + '.gif');
    
    } else {
          console.log("I'm on the right", data.pokepon1);
          $yourname.html("sdjidjev");
          $opponentname.html("melaniec");

          self.pokeponRef = new Firebase(url2);
          self.enemyRef = new Firebase(url1);
          // $('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon2 + '.gif');
          $enemypokepon.attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon1 + '.gif');
    }
      
      
    // this is the my pokepon data.
    self.pokeponRef.on('value', function(snapshot) {
      // this function will get called everytime my HP changed.
      var pokepon = snapshot.val();
      console.log(pokepon.HP);
      
        // example of how to update the HP bar
      setHealth($yourhealthbar, pokepon.HP / 100.0);
      $healthnumber.html(pokepon.HP + "/100");
        
    });

    self.enemyRef.on('value', function(snapshot) {
      enemy = snapshot.val();
      console.log(enemy.HP);
      setHealth($opponenthealthbar, enemy.HP / 100.0);
    });
      
  });

  self.socket.on('gameover', function() {
    if (window.confirm("Game over!! Do you want to start a new game?")) {
      window.location.href = "/games/create";
    } else {
      window.location.href = "/";
    }
  });

  self.socket.emit('join', {id: self.gameId});
}

Client.prototype.requestMusic = function(track) {
}

Client.prototype.attack = function() {
  if (this.isStarted) {
    this.socket.emit('attack', {type: "basic"});
  }
}
