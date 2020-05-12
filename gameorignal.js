var buttonColours=['red','blue','green','yellow'];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

// for displaying current Level and starting game by pressing key

$(document).keypress(function(){
if(!started){
  $("#level-title").text("Level "+level) // changing the h1 to the required text
  nextSequence();
  started=true;
}
});


// using touch event

$(document).on("pagecreate",function(){
  if(!started){
    $("#level-title").text("Level "+level) // changing the h1 to the required text
    nextSequence();
    started=true;
  }
});


// getting user input or button pressed by user

$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");// this specifies the button thta is clicked and its
  //id is saved in var userChosenColour
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); //calling checkAnswer function w passing
  //index minus one.
});

// checking the pattern and result

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}
// generating randon numbers and checking it with the arrays of colours and pusing the pattern onto array
function nextSequence() {

  userClickedPattern = [];
  //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// for restarting game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

// for playing sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animations

function animatePress(currentColor) {
  //we add the class to currentColour that actually points towards the vr
  //defined above(userChosenColour)
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
