//A lot of these files are just borrowed from twiddler, I figured we can just adjust things as we go.

$(document).ready(function() {


  //select already existing elements
  var $app = $('#app');
  $app.html('');






  //create new HTML elements
  //the header Little Buds is in the html file, because it will be the header for all the different scenes

  var $homeScreenHousing = $('<section class="home-screen-housing"></section>');
  //let's battle! button
  var $battleStartButton = $('<button class="battle-start-button">Let\'s Battle!</button>');




  //choose your bud
  //this isn't final, just a test code to see how a battle can work as if it were a function that we called
  //ex ===>  battle(myBud, enemyBud)
  var $budSelectScreen = $('<section class="bud-select-screen"></section>');
  var $battleScreen = $('<section class="battle-screen"></section>');








  //event handler functions


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

    var displayBuds = function () {
      buds.forEach(bud => {
        var $budWindow = $('<div class="bud-window"></div>');

        var $budPic = $('<img class="bud-pic">');
        $budPic.attr("src", bud.pic);

        var $budName = $('<div class="bud-name"></div>');
        $budName.text("Name: " + bud.name);

        var $budHealth = $('<div class="bud-health"></div>');
        $budHealth.text("Current HP: " + bud.currentHp);



        $budPic.appendTo($budWindow);
        $budName.appendTo($budWindow);
        $budHealth.appendTo($budWindow);
        $budWindow.appendTo($chooseWindow);
      })
    }
    displayBuds();
    $budSelectScreen.appendTo($app);
  }



  var generateMoveButtons = function(bud) {
    var moveList = bud.moves;
    var $moveListBox = $('<div class="move-list-box"></div>');
    for (var i = 0; i < moveList.length; i++) {
      $moveButton = $('<button class="move-' + (i+1) +'">' + moveList[i] + '</button>')
      $moveButton.appendTo($moveListBox);
    }
    $moveListBox.appendTo($battleScreen);
  }









  //set event listeners (providing appropriate handlers as input)

  $battleStartButton.on("click", handleStartButtonClick);









  //append new HTML elements to the DOM

  $homeScreenHousing.appendTo($app);
  $battleStartButton.appendTo($homeScreenHousing);

  // generateMoveButtons(sam);



});



