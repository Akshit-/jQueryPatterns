var keyboardKeys = [];
keyboardKeys['scratch'] = ['firstbasic', 'secondbasic', 'thirdbasic', 'fourthbasic'];
keyboardKeys['block'] = ['firstblock', 'secondblock', 'thirdblock', 'fourthblock'];
keyboardKeys['paralyze'] = ['firstpara', 'secondpara', 'thirdpara', 'fourthpara'];

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var attackDict = {};
var keys = {
  "A" : 65,
    "D" : 68,
    "S" : 83,
    "W" : 87,
};

var getKeyCode = function(k) { return keys[k]; }
function toCodeArray(str) { return str.split("").map(getKeyCode); }
attackDict['scratch']   = toCodeArray("WWWW");
attackDict['block']     = toCodeArray("AASA");
attackDict['paralyze']  = toCodeArray("SAWD");
var sequenceSoFar = [];
var count = 0;
var client = new Client();

function successfulPokemonAttack(pokemon, attack) {
  if (attack === "BLOCK") {
    
  } else if (attack === "SCRATCH") {
    client.attack();
  } else if (attack === "PARALYZE") {
  }
  
    $("#textbox").text(pokemon + " successfully used " + attack + "!");
    count = 0;
    sequenceSoFar =[];
    setTimeout(function(){
      //jQuery lets you treat all elements of a class as one object
      $('.keyboard').css('background', '#222');
    }, 100);
}

function isSubArray(typedArray, givenMove) {
  if (typedArray.length == 0) {
    return true;
  } else if (typedArray[0] != givenMove[0]) {
    return false;
  } else {
    return isSubArray(typedArray.slice(1), givenMove.slice(1));
  }
}

function setupHealthBars() {
  var $youHealthBarContainer = $('#you .health-bar'),
    $opponentHealthBarContainer = $('#opponent .health-bar'),
    width  = $youHealthBarContainer.width(),
    height = $youHealthBarContainer.height(),
    youHealthPaper = Raphael($youHealthBarContainer[0], width, height),
    opponentHealthPaper = Raphael($opponentHealthBarContainer[0], width, height);
    
    var x = 0.1*width, y = 0.1*height, w = 0.8*width, h = 0.8*height;
    // health bar backgrounds
    youHealthPaper.rect(x,y,w,h).attr({'fill' : '#aaffaa'});
    opponentHealthPaper.rect(x,y,w,h).attr({'fill' : '#aaffaa'});
    
    // actual health bars
    var youHealthBar = youHealthPaper
    .rect(x,y,w,h)
    .attr({ fill : '#50dd50'}),
    
    opponentHealthBar = opponentHealthPaper
    .rect(x,y,w,h)
    .attr({ fill : '#50dd50'});
    
    youHealthBar.data('origHeight', .8*height);
    youHealthBar.data('origWidth', .8*width);
    opponentHealthBar.data('origHeight', .8*height);
    opponentHealthBar.data('origWidth', .8*width);
    $youHealthBarContainer.data('healthBar', youHealthBar);
    $opponentHealthBarContainer.data('healthBar', opponentHealthBar);
}

/*
 * healthBarContainer: health bar div
 * health: new health
 */
function setHealth($healthBarContainer, health) {
  // raphael rectangle health bar
  var rHealthBar = $healthBarContainer.data('healthBar'),
    rHealthBarPaper = rHealthBar.paper,
    oldParams = {
      x : rHealthBar.attr('x'),
        y : rHealthBar.attr('y'),
        width : rHealthBar.attr('width'),
        height: rHealthBar.attr('height')
    },
  newParams = {
    width : rHealthBar.data('origWidth')*health,
      height: rHealthBar.data('origHeight')
  },
  popWidth = 0.1 * oldParams.width,
    popHeight = 0.1 * oldParams.height;
    rHealthBar.animate({
      x : oldParams.x - popWidth/2,
      y : oldParams.y - popHeight/2,
      width : oldParams.width + popWidth,
      height : oldParams.height + popHeight
    }, 100, function() {
      rHealthBar.animate(oldParams, 100, function() {
        var hurtRect = rHealthBarPaper
        .rect(oldParams.x, oldParams.y, oldParams.width, oldParams.height)
        .attr({ fill : '#dd5050' }).insertBefore(rHealthBar);
      });
      rHealthBar.animate(newParams, 300, function() {
        hurtRect.animate({ opacity : 0 }, 300, function() {
          hurtRect.remove();
        });
      });
    });
  
}

function setupKeyHandlers() {
  $(document).keydown(function (e) {
    if (!beatsUI.playing) { console.log("Not playing!"); return; }
    var onBeat = beatsUI.hit() != 0;
    sequenceSoFar.push(e.keyCode);
    if (e.keyCode == attackDict['block'][count] && isSubArray(sequenceSoFar, attackDict['block'])) {
      console.log("1");
    if (onBeat) {
      document.getElementById(keyboardKeys['block'][count]).style.background = "#f00";
    count = count + 1;
    if (count == attackDict['block'].length) {
      // var youpokemonel = $('#you .pokemon')[0];
      // var youpokemonelcopy = youpokemonel.src.toString();
      //should be a shielf or something for block
      var youpokemonel = $('#you .pokemon')[0];
    youpokemonel.style.transform = "scale(-0.5, 0.5)";
    youpokemonel.style.OTransform = "scale(-0.5, 0.5)";
    youpokemonel.style.MozTransform = "scale(-0.5, 0.5)";
    youpokemonel.style.WebkitTransform = "scale(-0.5, 0.5)";
    var enemypokemonel = $('enemypokepon')[0];
    var transitionendhandler = function(event) {
      youpokemonel.style.transform = "scaleX(-1)";
        youpokemonel.style.OTransform = "scaleX(-1)";
        youpokemonel.style.MozTransform = "scaleX(-1)";
        youpokemonel.style.WebkitTransform = "scaleX(-1)";
    }
  youpokemonel.addEventListener("transitionend", transitionendhandler, true);
    //
    var transitionendhandler = function(event) {
    }
  youpokemonel.addEventListener("transitionend", transitionendhandler, true);
    successfulPokemonAttack("Pokepon", 'BLOCK');
    }
    }
    }
    else if (e.keyCode == attackDict['scratch'][count] && isSubArray(sequenceSoFar, attackDict['scratch'])) {
      console.log("2");
        if (onBeat) {
          document.getElementById(keyboardKeys['scratch'][count]).style.background = "#f00";
            count = count + 1;
            if (count == attackDict['scratch'].length) {
              var youpokemonel = $('#you .pokemon')[0];
                youpokemonel.style.transform = "scaleX(-1) translateX(-200px)";
                youpokemonel.style.OTransform = "scaleX(-1) translateX(-200px)";
                youpokemonel.style.MozTransform = "scaleX(-1) translateX(-200px)";
                youpokemonel.style.WebkitTransform = "scaleX(-1) translateX(-200px)";
                var enemypokemonel = $('enemypokepon')[0];
                var transitionendhandler = function(event) {
                  youpokemonel.style.transform = "scaleX(-1)";
                    youpokemonel.style.OTransform = "scaleX(-1)";
                    youpokemonel.style.MozTransform = "scaleX(-1)";
                    youpokemonel.style.WebkitTransform = "scaleX(-1)";
                }
              youpokemonel.addEventListener("transitionend", transitionendhandler, true);
                sequenceSoFar =[];
                count = 0;
                successfulPokemonAttack("Pokepon", 'SCRATCH');
            }
        }
    } 
    else if (e.keyCode == attackDict['paralyze'][count] && isSubArray(sequenceSoFar, attackDict['paralyze'])) {
      console.log("3");
        if (onBeat) {
          document.getElementById(keyboardKeys['paralyze'][count]).style.background = "#f00";
            count = count + 1;
            if (count == attackDict['paralyze'].length) {
              var youpokemonel = $('#you .pokemon')[0];
                youpokemonel.style.WebkitTransform = "scaleX(-1) translateY(-100px)";
                var transitionendhandler = function(event) {
                  youpokemonel.style.WebkitTransform = "scaleX(-1)";
                }
              youpokemonel.addEventListener("transitionend", transitionendhandler, true);
                successfulPokemonAttack("Pokepon", 'PARALYZE');
            }
        }
    } else {
      console.log("invalid move!");
        $("div#textbox").text("YOU TYPED AN INVALID MOVE!");
        sequenceSoFar = [];
        count = 0;
        $('.keyboard').css('background', '#222');
        //user can't type for half a second
    }
  
    function isEqual(arr1, arr2) {
      if (arr1.length != arr2.length) {
        return false;
          for (var i = 0; i < arr1.length; i = i +1) {
          }
        if (arr1[i] != arr2[i]) {
          return false;
        }
      }
      return true;
    }
  });
  
}

var beatsUI = {
  setup : function(beatTimes) {
    this._beatTimes = beatTimes;
      
      var self = this;
      this._beatTimes.map(function(k) { self._beatObjects[k * 1000] = null; })
      
      var $beats = $("#beats"),
      w = $beats.width(),
      h = $beats.height();
      this._paper = Raphael($beats[0], w, h);
      
      this._w = 0.8*w;
      this._x = (w - this._w)/2;
      this._y = (h - this._h)/2;
      
      this._paper.rect(this._x, this._y, this._w, this._h)
      .attr({'fill' : '#000' });
  },
  
    play : function() {
      this._startTime = new Date().getTime();
        var self = this;
        
        var animation = function() {
          var elapsedTime = new Date().getTime() - self._startTime;
            var w = 10;
            for (var time in self._beatObjects) {
              if (self._beatObjects.hasOwnProperty(time)) {
                if (time < elapsedTime) {
                  if(self._beatObjects[time]) self._beatObjects[time].remove();
                    delete self._beatObjects[time];
                } else if ((time - elapsedTime) < self._msWidth) {
                  var x = self._x + ((time - elapsedTime) / self._msWidth) * self._w - w,
                    y = self._y,
                    w = 10,
                    h = self._h;
                    if (self._beatObjects[time] == null) {
                      self._beatObjects[time] = self._paper.rect(x, y, w, h)
                        .attr({'fill': '#aaa'});
                        self._beatObjects[time].data('x-offset',0);
                        self._beatObjects[time].data('y-offset',0);
                    } else {
                      self._beatObjects[time].animate({
                        x : x + self._beatObjects[time].data('x-offset'),
                        y : y + self._beatObjects[time].data('y-offset')
                      });
                    }
                }
              }
            }
          
            requestAnimFrame(animation);
        }
      animation();
        this.playing = true;
    },
  
    // returns value between 0-1 indicating how accurate this was
    hit : function() {
      var elapsedTime = new Date().getTime() - this._startTime,
        minDiff = -1,
        minDiffIndex = -1;
        for (var i = 0; i < this._beatTimes.length; ++i) {
          if (minDiff == -1 || minDiff > Math.abs(elapsedTime - this._beatTimes[i]*1000)) {
            minDiff = Math.abs(elapsedTime - this._beatTimes[i]*1000);
              minDiffIndex = i;
          }
        }
      if (minDiff < 500 && minDiff > 0) {
        if (!this._beatTimes[minDiffIndex]*1000 in this._beatObjects) {
          return 0;
        }
        var rBeat = this._beatObjects[this._beatTimes[minDiffIndex]*1000];
          if (!rBeat) return 0;
            var expandw = rBeat.attr('width'),
              expandh = 20;
              rBeat.data('x-offset', -expandw/2);
              rBeat.data('y-offset', -expandh/2);
              rBeat.animate({
                width : rBeat.attr('width') + expandw,
                height : rBeat.attr('height') + expandh,
                fill : 'red'
              },100)
        this._beatTimes.slice(minDiffIndex,1);
          delete this._beatObjects[this._beatTimes[minDiffIndex]];
          return (1 - minDiff / 500)
      } else {
        return 0;
      }
    },
  // dynamic
  _x : 0,
    _y : 0,
    _w : 0,
    _h : 100, // static
       _paper : null,
         // maps a beat to its raphael object
         _beatObjects : {},
         _beatTimes : null,
         _startTime : null,
         // 5 seconds worth of beats shown
         _msWidth : 5000,
         playing : false
}

function selectMusic() {
  var clientId = 'df1eacadddaf233fdf1c1192a27b7ce5';
    var host = io.connect("http://" + window.location.href.split('/')[2] + "/soundcloud-auth");
    console.log(host);
    // initialize client with app credentials
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://ec2-107-22-149-156.compute-1.amazonaws.com:3000/soundcloud-auth'
    });
  
    SC.connect(function() {
      SC.get("/me/playlists", function(playlists) {
        for (var i = 0; i < playlists.length; ++i) {
          if (playlists[i].title == "pokepom") {
            var playlist = playlists[i],
        tracks = playlist.tracks;
        var $soundcloudSelector = $('<div id="soundcloudSelector"><h1>Pick a song!</h1></div>');
        var width = 800;
        var height = 400;
        $('body').append($soundcloudSelector);
        $soundcloudSelector.css({
          width : width,
          height : height,
          top : ($('body').height() - height) / 2,
          left : ($('body').width() - width) / 2,
        });
      for (var j = 0; j < tracks.length; ++j) {
        (function(index) {
          var track = tracks[index];
          var url = track.artwork_url;
          if (!url) {
            url = track.waveform_url;
          }
        var $track = $('<div class="track">'+
          '<img src="'+url+'"></img>'+
          '<div>'+track.title+'</div>');
          $track.click(function() {
            $soundcloudSelector.fadeOut();
            var trackId = (/(\d+)/.exec(track.stream_url))[1];
            console.log("=============================");
            console.log(trackId);
            client.loadMusic(trackId);
          });
        $soundcloudSelector.append($track);
        })(j);
      }
      break;
          }
        }
      });
    });
}

$(function () {
  client.connect();
  
  setupHealthBars();
  setupKeyHandlers();
  selectMusic();
  // beatsUI.setup(beatTimes);
  // beatsUI.play();
});
