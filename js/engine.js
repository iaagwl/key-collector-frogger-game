//grabs elements and sets initial values to the scoreboard
var imgEl = document.querySelector('#key-div img');
var levelDiv = document.getElementById('level-div');
var levelEl = document.querySelector('#level-div p');
var scoreEl = document.getElementById('score');
var scoreDiv = document.getElementById('score-div');
var containerEl = document.getElementById('container');

scoreEl.innerHTML = 'SCORE: ' + player.score;
scoreDiv.appendChild(scoreEl);

levelEl.innerHTML = 'LEVEL: ' + player.level;
levelDiv.appendChild(levelEl);

var Engine = (function(global) {
  //define variables and create the canvas element and add it the DOM.
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;

  canvas.width = 505;
  canvas.height = 606;
  containerEl.appendChild(canvas);

  function main() {
    //get time delta information for smooth animations
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;

    win.requestAnimationFrame(main);
  }

  //initial setup
  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateEntities(dt);
    checkCollisions();
    checkFinish();
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
    key.update();
  }

  function render() {
    //array with images needed for the game plan
    var rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 3 of stone
        'images/stone-block.png',
        'images/stone-block.png', // Row 2 of 3 of stone
        'images/stone-block.png', // Row 3 of 3 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;

    //draw grid
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
    key.render();
  }

  //reset on finish and collision
  function reset() {
    player.hasKey = false;
    key.x = Math.floor(Math.random() * 4) * 100;
    key.y = Math.floor(Math.random() * 3) * 83 + 68;
    player.reset();
  }

  //gather keys
  function keyCollision() {
    key.x = -100;
    key.y = 0;
    player.hasKey = true;
    player.score += 50;
    imgEl.classList.toggle('visible');
    scoreEl.innerHTML = 'SCORE: ' + player.score;
    scoreDiv.appendChild(scoreEl);
  }

  //check for collisions with bugs
  function checkCollisions() {
    allEnemies.forEach(function(enemy) {
      if (enemy.x - 50 < player.x && enemy.x + 50 > player.x && enemy.y - 50 < player.y && enemy.y + 50 > player.y) {
        player.score = 0;
        player.level = 1;

        if (player.hasKey === true) {
          imgEl.classList.toggle('visible');
        }

        scoreEl.innerHTML = 'SCORE: ' + player.score;
        scoreDiv.appendChild(scoreEl);
        levelEl.innerHTML = 'LEVEL: ' + player.level;
        levelDiv.appendChild(levelEl);
        reset();
      }
    });

    if (player.x === key.x && player.y === key.y) {
      keyCollision();
    }
  }

  //handle finished level
  function checkFinish() {
    if (player.y < 68 && player.hasKey === true) {
      player.score += 100;
      player.level += 1;
      levelEl.innerHTML = 'LEVEL: ' + player.level;
      levelDiv.appendChild(levelEl);
      imgEl.classList.toggle('visible');
      scoreEl.innerHTML = 'SCORE: ' + player.score;
      scoreDiv.appendChild(scoreEl);
      reset();
    }
  }

  //load all images before init
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy2.png',
    'images/Key.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
