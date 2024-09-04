var userClickedPattern = [];

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];

var levelTitle = $("#level-title");

var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
    levelTitle.text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function nextSequence() {
  level++;
  levelTitle.text("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animateNext(randomChosenColour);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function animateNext(currentColour) {
  $("#" + currentColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(currentColour) {
  var audio = new Audio("sounds/" + currentColour + ".mp3");
  audio.play();
}

function gameOver() {
  playSound("wrong");
  levelTitle.text("Game Over, Press Any Key to RESTART");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  started = false;
}
