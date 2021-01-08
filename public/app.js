//A lot of these files are just borrowed from twiddler, I figured we can just adjust things as we go.

$(document).ready(function() {


  var $app = $('#app');




  var start = function (state = 'Let\'s Battle!', last) {
    $app.html('');
    var $homeScreenHousing = $('<div class="home-screen-housing"></div>');
    var $battleStartButton = $('<button class="button battle-start-button">' + state + '</button>');
    var $lastDiv = $('<div class="last-game-state">' + last + '</div>');

    $homeScreenHousing.appendTo($app);
    $battleStartButton.appendTo($homeScreenHousing);
    if (last) {
      $lastDiv.appendTo($homeScreenHousing);
    }
    $battleStartButton.on('click', handleStartButtonClick);
  }




  //event handler functions
  var attacker;
  var defender;

  var handleStartButtonClick = function(event) {
    $app.html('');
    renderBudSelectScreen();
  }

  var renderBudSelectScreen = function () {
    var $budSelectScreen = $('<section class="bud-select-screen"></section>');
    var $chooseBudTitle = $('<p class="choose-bud-title">Choose your Bud!</p>');
    var $chooseWindowBox = $('<div class="choose-window-box"></div>');
    var $chooseWindow = $('<div class="choose-window"></div>');

    $chooseBudTitle.appendTo($budSelectScreen);
    $chooseWindowBox.appendTo($budSelectScreen)
    $chooseWindow.appendTo($chooseWindowBox);

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

    var $budName = $('<div class="bud-name"></div>');
    $budName.text("Name: " + bud.name);

    var $budHealth = $('<div class="bud-health"></div>');
    $budHealth.text("HP: " + bud.currentHp + "/" + bud.maxHp);

    var $budType = $('<div class="bud-type"></div>');
    $budType.text("Type: " + bud.type);

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
      $moveButton = $('<button id="' + moveList[i] + '" class="button move-button move-' + (i+1) +'">' + attacks[moveList[i]].name + '</button>')
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
    $movedButton = $('<button class="moved-button button">' + attacker.name + ' used ' + attacks[move].name + attackDid(move, attacker, defender) + '</button>')
    $movedButton.appendTo($moveListBox);

    $movedButton.on('click', movedButtonHandler)
  }

  var attackDid = function (move, damageDoer, damageReciever) {
    var result = ''
    if (attacks[move].damage !== 0) {
      result += ' which did ' + damageCalc(move, damageDoer, damageReciever) + ' damage'
    }
    if (attacks[move].heal !== 0) {
      result += ' and healed ' + attacks[move].heal + ' hp'
    }
    if (attacks[move].enemyAttackMod !== 0) {
      if (attacks[move].enemyAttackMod > 0) {
        result += ' and increased their enemies attack power by ' + attacks[move].enemyAttackMod + '!';
      } else {
        result += ' and lowered their enemies attack power by ' + -attacks[move].enemyAttackMod + '!';
      }
    }
    //add the rest of the things  the moves can do
    return result + '!'
  }

  var movedButtonHandler = function() {
    if (defender.currentHp === 0) {
      $app.html('');
      gameEnd('YOU WIN!');
      return;
    }
    var randomMove = defender.moves[Math.floor(Math.random() * defender.moves.length)]
    attackMaker(randomMove, defender, attacker)
    startFight(attacker, defender);
    var $moveListBox = $('.move-list-box');
    $moveListBox.html('');
    $continueFightButton = $('<button class="moved-button button">Enemy ' + defender.name + ' used ' + attacks[randomMove].name + attackDid(randomMove, defender, attacker) + '</button>')
    $continueFightButton.appendTo($moveListBox);

    $continueFightButton.on('click', continueFight)
  }

  var continueFight = function() {
    if (attacker.currentHp === 0) {
      $app.html('');
      gameEnd('YOU LOSE!')
      return;
    } else {
      startFight(attacker, defender)
      generateMoveButtons(attacker);
    }
  }

  var attackMaker = function (attack, damageDoer, damageReciever) {
    var totalDamage = damageCalc(attack, damageDoer, damageReciever)
    if (damageDoer.currentHp + attacks[attack].heal > damageDoer.maxHp) {
      damageDoer.currentHp = damageDoer.maxHp;
    } else {
      damageDoer.currentHp += attacks[attack].heal;
    }
    if (damageReciever.currentHp - totalDamage < 0) {
      damageReciever.currentHp = 0;
    } else {
      damageReciever.currentHp -= totalDamage;
    }
    if (attacks[attack].enemyAttackMod) {
      damageReciever.baseAtk += attacks[attack].enemyAttackMod;
      if (damageReciever.baseAtk < Math.floor(budStorage[damageReciever.key].baseAtk / 2)) {
        damageReciever.baseAtk = Math.floor(budStorage[damageReciever.key].baseAtk / 2);
      }
    }
    // impliment other types of attacks, status changes etc
  }

  var damageCalc = function (attack, damageDoer, damageReciever) {
    return Math.ceil(attacks[attack].damage * (damageDoer.baseAtk / damageReciever.def))
  }

  var gameEnd = function (state) {
    attacker = undefined;
    defender = undefined;
    start('Play Again?', state)
  }

start();
});



