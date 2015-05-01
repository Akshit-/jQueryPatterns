Pokepon = function(index, pokeponRef, game) {
  this.HP = 100;
  this.pokeponRef = pokeponRef;
  this.game = game;
  this.urlNumber = this.getRandomNum();
  this.pokeponRef.set({
    name: "no name",
    maxHP: 100,
    HP: 100
  });
}

Pokepon.prototype.getRandomNum = function() {
  var num = Math.floor(Math.random() * 649) + 1;
  if (num < 10) {
    num = '00' + String(num);
  } else if (num < 100) {
    num = '0' + String(num);
  }
  console.log(num);
  return num;
}

Pokepon.prototype.damage = function(dmg) {
  this.HP -= dmg;
  if (this.HP < 0) {
    this.game.stop();
  }
  this.pokeponRef.child('HP').set(this.HP);
}

module.exports = Pokepon;
