/**
 * Guess the Number Game
 * TODO: create function playGame with event listeners on buttons reset and submit
 * DONE Create function generateRandomNumber and assign to Global Variable correctNumber
 * DONE: Create functions showTooHigh, showTooLow, showWon, showEmpty
 * DONE: Create function to display result (checkGuess())  using input from show functions above and with corresponding bootstrap alert
 * DONE: Create function displayHistory to show user's history of guesses. Track number of guesses using array totalGuesses
 * DONE: Create initGame function to reset the game to default. can be used for a replay functionality
 * TODO: Create a countdown timer function startTimer(). When timer ends, the game state should freeze, a message pops up with user's score.
 * *********Execute game in a while loop (while gameOn is True). if False, stop timer, display message asking if they want to replay-.
 * DONE: Create Redirect function to Navigate to google.com if they choose not to play
 * TODO: Create a replay function for when round ends.
 *
 *
 *
 *
 *
 *
 *
 */

//duration of game round (2mins)
const duration = new Date().getTime() + 120000;
//const duration = 120000;

//array to store all guesses made by player
let guesses = [];
//console.log(guesses);

//array to store all correct guesses
let correctGuesses = [];

//variable to store correct nunber
let correctNumber = getRandomNumber();
//console.log(correctNumber);

//variable  to  store game state  default is false
let gameOn = false;

let replay_game = false;

window.onload = function () {
  //display Welcome Modal
  displayWelcome();
  $("#welcome-modal").modal({
    backdrop: "static",
    keyboard: false,
    show: true,
  });
  //autofocus on input field
  $("#welcome-modal").on("hidden.bs.modal", function (e) {
    $("#number-guess").focus();
  });

  //activate guess button with keyboard enter
  var input = document.getElementById("number-guess");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("check-guess").click();
    }
  });

  document.getElementById("check-guess").addEventListener("click", playGame);
  document.getElementById("reset-values").addEventListener("click", resetGame);
  document.getElementById("start-game").addEventListener("click", function () {
    startTimer("time", duration);
  });
};

//Play the game
function playGame() {
  while (gameOn) {
    let numberGuess = document.getElementById("number-guess").value;
    checkGuess(numberGuess);
    saveGuessHistory(numberGuess);
    showGuessHistory();
    document.getElementById("number-guess").value = "";

    break;

    // if(!replay_game){
    //     endGame();
    //     break;
    // }
  }
  //console.log("Game Started");
}

function saveGuessHistory(guess) {
  guesses.push(guess);
  //console.log(guesses);
}

function showGuessHistory() {
  let index = guesses.length - 1;
  let list = "<ul class='list-group' id='list-of-guesses'>";
  while (index >= 0) {
    list += ` <li class='list-group-item'>You guessed ${guesses[index]}</li>`;
    index--;
  }
  list += "</ul";
  document.getElementById("history-content").innerHTML = list;
  document.querySelector(".count-total").innerHTML = (
    "0" + guesses.length
  ).slice(-2);
}

function checkGuess(numberGuess) {
  if (!numberGuess) {
    showEmpty();
  } else if (numberGuess > correctNumber) {
    showTooHigh();
  } else if (numberGuess < correctNumber) {
    showTooLow();
  } else {
    showWon();
    correctGuesses.push(numberGuess);
    document.querySelector(".count-correct").innerHTML = (
      "0" + correctGuesses.length
    ).slice(-2);
    correctNumber = getRandomNumber();
    //console.log(correctNumber);
  }
}

//choose what kind of alert is displayed based on dialog type
function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>";
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>";
      break;
    case "empty":
      dialog = "<div class='alert alert-danger' role='alert'>";
      break;
  }
  dialog += text;
  dialog += "</div>";
  return dialog;
}

function showWon() {
  const message =
    "Great Job! You guessed right. <strong>Now Guess The Next One!</strong>";

  let dialog = getDialog("won", message);
  document.querySelector(".result").innerHTML = dialog;
}

function showTooHigh() {
  const message = "<strong>That's too high!</strong> Try again.";

  let dialog = getDialog("warning", message);
  document.querySelector(".result").innerHTML = dialog;
}

function showTooLow() {
  const message = "<strong>That's too low!</strong> Try again";

  let dialog = getDialog("warning", message);
  document.querySelector(".result").innerHTML = dialog;
}

function showEmpty() {
  const message = "You have not entered any guesses. Please make a guess!";

  let dialog = getDialog("empty", message);
  document.querySelector(".result").innerHTML = dialog;
}

//Reset the game
function resetGame() {
  guesses = [];
  correctGuesses = [];
  document.querySelector(".count-correct").innerHTML = "00";

  //Reset correctNumber
  correctNumber = getRandomNumber();

  //Reset guesses History
  showGuessHistory();

  //Reset the result display
  document.querySelector(".result").innerHTML = "";

  //Reset Guess Input Field
  document.getElementById("number-guess").value = "";
}

//set Game  State
function startGame() {
  //set gameOn to True
  gameOn = true;
}

function endGame() {
  gameOn = false;
}

function displayWelcome() {
  //show Modal
  let welcome = `

    <div class="modal fade show" id="welcome-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">  
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Welcome</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="redirect()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Welcome to the Guess What Number Game. All you need to do is to guess the number I'm currently thinking of &#129296;.
          <br>
          <br>
          <p>Are you ready?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="redirect_welcome()">No</button>
          <button type="button" class="btn btn-primary" id='start-game' data-dismiss="modal" onclick=""  >Yes</button>
        </div>
      </div>
    </div>
  </div>
   
    `;
  document.getElementById("welcome").innerHTML = welcome;

  //if yes, game_on =True, else game_on = false
}

//Get Remaining time
function getTimeRemaining(endTime) {
  let t = endTime - Date.parse(new Date());

  console.log(t);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    minutes: minutes,
    seconds: seconds,
  };
}

function startTimer(id, endTime) {
  startGame();
  resetGame();
  console.log(gameOn);
  //start timer code here
  let clock = document.getElementById(id);
  let minutesSpan = clock.querySelector(".minutes");
  let secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    let t = getTimeRemaining(endTime);
    console.log(t);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    clock.innerHTML = minutesSpan.innerHTML + ":" + secondsSpan.innerHTML;
    //console.log(clock.innerHTML);
    if (t.minutes == 0 && t.seconds <= 10) {
      document.getElementById("clock").style.backgroundColor = "#B71C1C";
    }
    if (t.total < 0) {
      clearInterval(timeInterval);
      clock.innerHTML = "00" + ":" + "00";
      endGame();
      askReplay();
    }
  }
  updateClock();
  let timeInterval = setInterval(updateClock, 1000);
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100 + 1);
  return randomNumber;
}

function askReplay() {
  //Display Modal for replay
  displayReplay();

  //if (replay), return true, Start Timer( reset values, start game)
}

function displayReplay() {
  //show Modal
  let replay = `

    <div class="modal fade" id="replay-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">  
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Time Up</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="redirect_replay()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="result-page">
          Time's Up!! <br><br>

          <strong>Your Current Score</strong><br><br>

          <strong>Correct Guesses:</strong> ${correctGuesses.length} <br><br>
          <strong>Total Guesses:</strong> ${guesses.length}<br><br>
          
          Would you like to play again?
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="redirect_replay()">No</button>
          <button type="button" class="btn btn-primary" id='start-game' data-dismiss="modal" onclick="location.reload()"  >Yes</button>
        </div>
      </div>
    </div>
  </div>
   
    `;
  document.getElementById("replay").innerHTML = replay;
  $("#replay-modal").modal({ backdrop: "static", keyboard: false, show: true });
}

function redirect_welcome() {
  window.location.href = "http://www.google.com";
}

function redirect_replay() {
  window.location.href = "thank-you.html";
}

function replay() {
  location.reload();
  replay_game = true;
}
