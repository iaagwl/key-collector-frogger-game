//Enemy
var Enemy = function(x, y) {
  this.speed = this.randomSpeed();
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
}

//update enemy's position
Enemy.prototype.update = function(dt) {
  this.x += 125 * dt * this.speed;
  this.x = this.x > 500 ? this.resetPos() : this.x;
}

//reset position and delegates a new speed
Enemy.prototype.resetPos = function() {
  this.speed = this.randomSpeed();
  return -100;
}

//render player
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//generates random speed for enemies
Enemy.prototype.randomSpeed = function() {
  return Math.floor((Math.random() * 8) + 4) * 0.25;
}

//Player
var Player = function(x, y) {
  this.sprite = 'images/char-boy2.png';
  this.x = x;
  this.y = y;
  this.hasKey = false;
  this.score = 0;
  this.level = 1;
}

//update players position
Player.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//render player
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//reset position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

//handle input
Player.prototype.handleInput = function(input) {
  if (!input) return;
  var moveToX = {
    'left': -100,
    'right': 100
  };
  var moveToY = {
    'up': -83,
    'down': 83
  };

  this.x += moveToX[input] || 0;
  this.y += moveToY[input] || 0;

  //prevents player from finishing level before grabbing the key
  if (this.y < 68 && this.hasKey === false) {
    this.y = 68;
  } else {
    this.y = this.y;
  }

  this.x = this.x < 0 ? 0 : this.x;
  this.x = this.x > 400 ? 400 : this.x;
  this.y = this.y > 400 ? 400 : this.y;
}

//Keys
var Key = function(x, y) {
  this.sprite = 'images/Key.png';
  this.x = x;
  this.y = y;
}

//update stars position
Key.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//render key
Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//instantiate objects
var player = new Player(200, 400);
var allEnemies = [new Enemy(0, 63), new Enemy(200, 146), new Enemy(400, 229), new Enemy(400, 312)];
var key = new Key(200, 234);

//eventlistener for input
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
