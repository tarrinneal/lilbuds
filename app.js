//A lot of these files are just borrowed from twiddler, I figured we can just adjust things as we go.

$(document).ready(function() {


  var $app = $('#app');




  var start = function () {
    $app.html('');
    var $homeScreenHousing = $('<div class="home-screen-housing"></div>');
    var $battleStartButton = $('<button class="button battle-start-button">Let\'s Battle!</button>');




    $homeScreenHousing.appendTo($app);
    $battleStartButton.appendTo($homeScreenHousing);
    $battleStartButton.on('click', handleStartButtonClick);
  }




  //event handler functions
  var attacker;
  var defender;

  var handleStartButtonClick = function(event) {
    console.log(event)
    //clears the stage, allowing for a new scene to be put in place.
    $app.html('');
    //run bud selection element builder?
    renderBudSelectScreen();
  }

  var renderBudSelectScreen = function () {
    var $budSelectScreen = $('<section class="bud-select-screen"></section>');
    var $chooseBudTitle = $('<p class="choose-bud-title">Choose your Bud!</p>');
    var $chooseWindow = $('<div class="choose-window"></div>');

    $chooseBudTitle.appendTo($budSelectScreen);
    $chooseWindow.appendTo($budSelectScreen);

    buds.forEach(bud => {
      $budWindow = makeBudCard(budStorage[bud])
      $budWindow.appendTo($chooseWindow);

      $budWindow.on('click', handleLilBudClick);
    })

    $budSelectScreen.appendTo($app);
  }

  var handleLilBudClick = function (event) {
    attacker = {...budStorage[event.currentTarget.id]};
    startFight(attacker)
  }

  var makeBudCard = function (bud) {
    var $budWindow = $('<div id="' + bud.key + '" class="bud-window"></div>');

    var $budPic = $('<img class="bud-pic">');
    $budPic.attr("src", bud.pic);
    // $budPic.on('click' , /*run something here*/);

    var $budName = $('<div class="bud-name"></div>');
    $budName.text("Name: " + bud.name);

    var $budHealth = $('<div class="bud-health"></div>');
    $budHealth.text("HP: " + bud.currentHp + "/" + bud.maxHp);

    var $budType = $('<div class="bud-type"></div>');
    $budType.text("Type: " + bud.type);

    // $budWindow.appendTo($chooseWindow);
    $budPic.appendTo($budWindow);
    $budName.appendTo($budWindow);
    $budHealth.appendTo($budWindow);
    $budType.appendTo($budWindow);

    return $budWindow
  }
  var randomBud = function () {
    var randomIndex = Math.floor(buds.length * Math.random())
    return buds[randomIndex]
  }

  var startFight = function(bud, evilBud = randomBud()) {
    $app.html('');
    var $battleScreen = $('<section class="battle-screen"></section>');
    $battleScreen.html('');
    var $budWindow = makeBudCard(bud);
    $budWindow.appendTo($battleScreen);
    if (!defender) {
      defender = {...budStorage[evilBud]};
    }
    var $evilBudWindow = makeBudCard(defender);
    $evilBudWindow.attr('id', 'evil-bud');
    $evilBudWindow.appendTo($battleScreen)
    generateMoveButtons(bud).appendTo($battleScreen)
    $battleScreen.appendTo($app)
  }

  var generateMoveButtons = function(bud) {
    var $battleScreen = $('.battle-screen');
    var moveList = bud.moves;
    var $moveListBox = $('<div class="move-list-box"></div>');
    for (var i = 0; i < moveList.length; i++) {
      $moveButton = $('<button id="' + moveList[i] + '" class="move-button move-' + (i+1) +'">' + attacks[moveList[i]].name + '</button>')
      $moveButton.appendTo($moveListBox);
      $moveButton.on('click', attackClickHandler);
    }
    return $moveListBox;
  }

  var attackClickHandler = function(event) {
    var move = event.currentTarget.id
    attackMaker(move, attacker, defender);
    startFight(attacker, defender);
    var $moveListBox = $('.move-list-box');
    $moveListBox.html('');
    $movedButton = $('<button class="moved-button button">' + attacker.name + ' used ' + attacks[move].name + attackDid(move) + '</button>')
    $movedButton.appendTo($moveListBox);

    $movedButton.on('click', movedButtonHandler)
  }

  var attackDid = function (move) {
    var result = ''
    if (attacks[move].damage !== 0) {
      result += ' and did ' + attacks[move].damage + ' damage'
    }
    if (attacks[move].heal !== 0) {
      result += ' and healed ' + attacks[move].heal + ' hp'
    }
    //add the rest of the things  the moves can do
    return result + '!'
  }

  var movedButtonHandler = function() {
    if (defender.currentHp === 0) {
      gameEndWin()
      return;
    }
    var randomMove = defender.moves[Math.floor(Math.random() * defender.moves.length)]
    attackMaker(randomMove, defender, attacker)
    startFight(attacker, defender);
    var $moveListBox = $('.move-list-box');
    $moveListBox.html('');
    $continueFightButton = $('<button class="moved-button button">Enemy ' + defender.name + ' used ' + attacks[randomMove].name + ' and ' + attackDid(randomMove) + '</button>')
    $continueFightButton.appendTo($moveListBox);

    $continueFightButton.on('click', continueFight)
  }

  var continueFight = function() {
    startFight(attacker, defender)
    generateMoveButtons(attacker);
  }

  var attackMaker = function (attack, damageDoer, damageReciever) {
//attacker and defender are global variables now, we'll need to change the hp and other stats, then refresh the cards probably, unless we can refresh just the hp on screen
    if (damageDoer.currentHp + attacks[attack].heal > damageDoer.maxHp) {
      damageDoer.currentHp = damageDoer.maxHp;
    } else {
      damageDoer.currentHp += attacks[attack].heal;
    }
    if (damageReciever.currentHp - attacks[attack].damage < 0) {
      damageReciever.currentHp = 0;
    } else {
      damageReciever.currentHp -= attacks[attack].damage;
    }
    // impliment other types of attacks, status changes etc

  }

  var gameEndWin = function () {
    $app.html('');
    alert('YOU WIN!!!!!!!')
    $playAgainButton = $('<button class="play-again-button button">Play Again?</button>')
    $playAgainButton.appendTo($app);

    $playAgainButton.on('click', reset)
  }

  var reset = function () {
    attacker = undefined;
    defender = undefined;
    start()
  }






start();
});



