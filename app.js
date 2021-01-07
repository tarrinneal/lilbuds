//A lot of these files are just borrowed from twiddler, I figured we can just adjust things as we go.

$(document).ready(function() {


  //select already existing elements
  var $app = $('#app');
  $app.html('');



  //create new HTML elements

  var $homeScreenHousing = $('<div class="home-screen-housing"></div>');
  var $battleStartButton = $('<button class="button battle-start-button">Let\'s Battle!</button>');

  var $budSelectScreen = $('<section class="bud-select-screen"></section>');
  var $battleScreen = $('<section class="battle-screen"></section>');



  //event handler functions
  var attacker;
  var defender;

  var handleStartButtonClick = function(event) {
    //clears the stage, allowing for a new scene to be put in place.
    $app.html('');
    //run bud selection element builder?
    renderBudSelectScreen();
  }

  var renderBudSelectScreen = function () {
    var $chooseBudTitle = $('<p class="choose-bud-title">Choose your Bud!</p>');
    var $chooseWindow = $('<div class="choose-window"></div>');

    $chooseBudTitle.appendTo($budSelectScreen);
    $chooseWindow.appendTo($budSelectScreen);

    buds.forEach(bud => {
      $budWindow = makeBudCard(bud)
      $budWindow.appendTo($chooseWindow);

      $budWindow.on('click', handleLilBudClick);
    })

    $budSelectScreen.appendTo($app);
  }

  var handleLilBudClick = function (event) {
    attacker = {...budStorage[event.currentTarget.id]};
    startFight(event.currentTarget.id)
  }

  var makeBudCard = function (bud) {
    var $budWindow = $('<div id="' + bud + '" class="bud-window"></div>');

    var $budPic = $('<img class="bud-pic">');
    $budPic.attr("src", budStorage[bud].pic);
    // $budPic.on('click' , /*run something here*/);

    var $budName = $('<div class="bud-name"></div>');
    $budName.text("Name: " + budStorage[bud].name);

    var $budHealth = $('<div class="bud-health"></div>');
    $budHealth.text("HP: " + budStorage[bud].currentHp + "/" + budStorage[bud].maxHp);

    var $budType = $('<div class="bud-type"></div>');
    $budType.text("Type: " + budStorage[bud].type);

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

  var startFight = function(bud, evil) {
    $app.html('');
    var $budWindow = makeBudCard(bud);
    $budWindow.appendTo($battleScreen);
    if (evil) {
      evilBud = evil;
    } else {
      var evilBud = randomBud()
    }
    defender = {...budStorage[evilBud]};
    var $evilBudWindow = makeBudCard(evilBud);
    $evilBudWindow.attr('id', 'evil-bud');
    $evilBudWindow.appendTo($battleScreen)
    generateMoveButtons(bud)
    $battleScreen.appendTo($app)
  }

  var generateMoveButtons = function(bud) {
    var moveList = budStorage[bud].moves;
    var $moveListBox = $('<div class="move-list-box"></div>');
    for (var i = 0; i < moveList.length; i++) {
      $moveButton = $('<button id="' + moveList[i] + '" class="move-button move-' + (i+1) +'">' + attacks[moveList[i]].name + '</button>')
      $moveButton.appendTo($moveListBox);
      $moveButton.on('click', attackClickHandler);
    }
    $moveListBox.appendTo($battleScreen);
  }

  var attackClickHandler = function(event) {
    console.log(event)//---------------------------------------------remove
    var move = event.currentTarget.id
    attackMaker(move);
    var $moveListBox = $('.move-list-box');
    // $moveListBox.html('');
    //finish this
  }

  var attackMaker = function (attack) {
//attacker and defender are global variables now, we'll need to change the hp and other stats, then refresh the cards probably, unless we can refresh just the hp on screen
    attacker.currentHp += attacks[attack].heal;
    defender.currentHp -= attacks[attack].damage;
    console.log(attacker)
    startFight(attacker.key, defender.key)
    //need to access hp from new objects might have to rewrite the card maker function
    //also need to delete and redraw cards to avoid dupes

//finish this
  }



  //set event listeners (providing appropriate handlers as input)

  $battleStartButton.on('click', handleStartButtonClick);



  //append new HTML elements to the DOM

  $homeScreenHousing.appendTo($app);
  $battleStartButton.appendTo($homeScreenHousing);



});



