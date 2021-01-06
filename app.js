//A lot of these files are just borrowed from twiddler, I figured we can just adjust things as we go.

$(document).ready(function() {


  //select already existing elements
  var $app = $('#app');
  $app.html('');

  //create new HTML elements
  var $header = $('<div class="header"></div>');
  var $title = $('<h1>Little Buds</h1>');

  //event handler functions

  //set event listeners (providing appropriate handlers as input)

  //append new HTML elements to the DOM

  $header.appendTo($app);
  $title.appendTo($header);



});

