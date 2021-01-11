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
      $budSelectScreen.appendTo($app);
    })
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
    $budName.text(bud.name);

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
    var totalDamage = attackMaker(move, attacker, defender);
    startFight(attacker, defender);
    var $moveListBox = $('.move-list-box');
    $moveListBox.html('');
    $movedButton = $('<button class="moved-button button">' + attacker.name + ' used ' + attacks[move].name + attackDid(move, attacker, defender, totalDamage) + '</button>')
    $movedButton.appendTo($moveListBox);
    if (attacks[move].movement === 'forward' && typeof(totalDamage) === 'number') {
      $('#' + attacker.key + ' .bud-pic').attr('class', 'bud-pic on-attack');
    } else if (attacks[move].movement === 'in-place' && typeof(totalDamage) === 'number') {
      $('#' + attacker.key + ' .bud-pic').attr('class', 'bud-pic on-heal');
    } else if (attacks[move].movement === 'upward' && typeof(totalDamage) === 'number') {
      $('#' + attacker.key + ' .bud-pic').attr('class', 'bud-pic upward');
    }
    var audio = new Audio('assets/sfx/' + move + '.mp3');
    audio.play();
    $movedButton.on('click', movedButtonHandler)
  }

  var attackDid = function (move, damageDoer, damageReciever, damage) {
    var result = ''
    if (typeof(damage) === 'string') {
      return ' but it missed.'
    } else {
      if (attacks[move].damage !== 0) {
        result += ' which did ' + damage + ' damage'
      }
      if (attacks[move].heal !== 0) {
        result += ' and healed ' + attacks[move].heal + ' hp'
      }
      if (attacks[move].attackMod !== 0) {
        result += ' and increased their attack power by ' + attacks[move].attackMod
      }
      if (attacks[move].defenseMod !== 0) {
        result += ' and increased their defense by ' + attacks[move].defenseMod
      }
      if (attacks[move].evadeMod > 0) {
        result += ' and increased their evade ability by ' + attacks[move].evadeMod
      } else if (attacks[move].evadeMod < 0) {
        result += ' but decreased their evade ability by ' + -attacks[move].evadeMod
      }
      if (attacks[move].enemyAttackMod !== 0) {
        result += ' and lowered their enemies attack power by ' + -attacks[move].enemyAttackMod;
      }
      if (attacks[move].enemyDefenseMod !== 0) {
        result += ' and lowered their enemies defense by ' + -attacks[move].enemyDefenseMod;
      }
      if (attacks[move].enemyEvadeMod !== 0) {
        result += ' and lowered their enemies evade ability by ' + -attacks[move].enemyEvadeMod;
      }
      return result + '!'
    }
  }

  var movedButtonHandler = function() {
    if (defender.currentHp === 0) {
      $app.html('');
      gameEnd('YOU WIN!');
      return;
    }
    var randomMove = defender.moves[Math.floor(Math.random() * defender.moves.length)]
    var totalDamage = attackMaker(randomMove, defender, attacker)
    startFight(attacker, defender);
    var $moveListBox = $('.move-list-box');
    $moveListBox.html('');
    $continueFightButton = $('<button class="moved-button button">Enemy ' + defender.name + ' used ' + attacks[randomMove].name + attackDid(randomMove, defender, attacker, totalDamage) + '</button>')
    $continueFightButton.appendTo($moveListBox);
    var audio = new Audio('assets/sfx/' + randomMove + '.mp3');
    audio.play();
    if (attacks[randomMove].movement === 'forward' && typeof(totalDamage) === 'number') {
      $('#evil-bud .bud-pic').attr('class', 'bud-pic on-attack-back');
    } else if (attacks[randomMove].movement === 'in-place' && typeof(totalDamage) === 'number') {
      $('#evil-bud .bud-pic').attr('class', 'bud-pic on-heal');
    } else if (attacks[randomMove].movement === 'upward' && typeof(totalDamage) === 'number') {
      $('#evil-bud .bud-pic').attr('class', 'bud-pic upward-back');
    }

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
    if (attacks[attack].damage > 0 && ((Math.random() * 100) - damageReciever.evade < 5)){
      return 'miss'
    } else {
      var totalDamage = damageCalc(attack, damageDoer, damageReciever)
      if (damageDoer.currentHp + attacks[attack].heal > damageDoer.maxHp) {
        damageDoer.currentHp = damageDoer.maxHp;
      } else {
        damageDoer.currentHp += attacks[attack].heal;
      }

      if (attacks[attack].attackMod) {
        damageDoer.baseAtk += attacks[attack].attackMod;
        if (damageDoer.baseAtk > Math.floor(budStorage[damageDoer.key].baseAtk * 1.5)) {
          damageDoer.baseAtk = Math.floor(budStorage[damageDoer.key].baseAtk * 1.5);
        }
      }
      if (attacks[attack].defenseMod) {
        damageDoer.defense += attacks[attack].defenseMod;
        if (damageDoer.defense > Math.floor(budStorage[damageDoer.key].defense * 2)) {
          damageDoer.defense = Math.floor(budStorage[damageDoer.key].defense * 2);
        }
      }
      if (attacks[attack].evadeMod) {
        damageDoer.evade += attacks[attack].evadeMod;
        if (damageDoer.evade > Math.floor(budStorage[damageDoer.key].evade * 2)) {
          damageDoer.evade = Math.floor(budStorage[damageDoer.key].evade * 2);
        } else if (damageDoer.evade < Math.floor(budStorage[damageDoer.key].evade / 2)) {
          damageDoer.evade = Math.floor(budStorage[damageDoer.key].evade / 2);
        }
      }
      if (attacks[attack].enemyAttackMod) {
        damageReciever.baseAtk += attacks[attack].enemyAttackMod;
        if (damageReciever.baseAtk < Math.floor(budStorage[damageReciever.key].baseAtk / 2)) {
          damageReciever.baseAtk = Math.floor(budStorage[damageReciever.key].baseAtk / 2);
        }
      }
      if (attacks[attack].enemyDefenseMod) {
        damageReciever.defense += attacks[attack].enemyDefenseMod;
        if (damageReciever.defense < Math.floor(budStorage[damageReciever.key].defense / 2)) {
          damageReciever.defense = Math.floor(budStorage[damageReciever.key].defense / 2);
        }
      }
      if (attacks[attack].enemyEvadeMod) {
        damageReciever.evade += attacks[attack].enemyevadeMod;
        if (damageReciever.evade < Math.floor(budStorage[damageReciever.key].evade / 2)) {
          damageReciever.evade = Math.floor(budStorage[damageReciever.key].evade / 2);
        }
      }
      if (attacks[attack].damage !== 0) {
        if (damageReciever.currentHp - totalDamage < 0) {
          damageReciever.currentHp = 0;
        } else {
          damageReciever.currentHp -= totalDamage;
        }
        return totalDamage;
      }
      return 0;
    }
  }

  var damageCalc = function (attack, damageDoer, damageReciever) {
    return Math.ceil(attacks[attack].damage * (damageDoer.baseAtk / damageReciever.def)) + Math.floor(Math.random() * 3) - 1
  }

  var gameEnd = function (state) {
    attacker = undefined;
    defender = undefined;
    start('Play Again?', state)
  }

start();
});



