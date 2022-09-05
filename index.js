"use strict";

//Select elements
let holdScoreP0 = document.querySelector("#holdScore--0");
let holdScoreP1 = document.querySelector("#holdScore--1");
let currentScoreP0 = document.querySelector("#currentScore--0");
let currentScoreP1 = document.querySelector("#currentScore--1");
let player0 = document.querySelector(".player-0");
let player1 = document.querySelector(".player-1");
let diceImage = document.querySelector("#dice-img");
const btnNewGame = document.querySelector("#new-game");
const btnRoll = document.querySelector("#roll-dice");
const btnHold = document.querySelector("#hold");

/** GLOBAL SCOPE VARIABLE */
let scores, playing, currentScore, activePlayer;

/** RESET SETTINGS TO DEFAULT */
let resetGame = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  holdScoreP0.textContent = 0;
  holdScoreP1.textContent = 0;
  player0.classList.remove("winner");
  player1.classList.remove("winner");
  player1.classList.add("bg-opacity-50");
  player0.classList.remove("bg-opacity-50");
  player0.classList.add("bg-white");
  player1.classList.add("bg-white");
  diceImage.classList.add("hidden");
};
resetGame();

/** SWITCH PLAYER IF THE ROLL IS 1 OR THE GAME IS OVER */
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`currentScore--${activePlayer}`).textContent = 0;
  //If true switct to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("bg-opacity-50");
  player1.classList.toggle("bg-opacity-50");
};

/** ROLL DICE BUTTON */
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate Random 1-6
    let dice = Math.trunc(Math.random() * 6 + 1);
    //Display dice
    diceImage.classList.remove("hidden");
    diceImage.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`currentScore--${activePlayer}`).textContent =
        currentScore;
      //Check if the dice is 1 if true switct to next player
    } else {
      switchPlayer();
    }
  }
});

/** BUTTON HOLD */
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add Current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`holdScore--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check score if the score >= 100
    if (scores[activePlayer] >= 100) {
      // Active Score >= Finish the game
      // Switch Player
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("bg-white");
      btnNewGame.classList.remove("bg-gray-500/40");
      diceImage.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", resetGame);

/** SHOW GAME RULES */
const showRulesModal = document.querySelector(".show-modal");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

/** SHOW MODAL */
showRulesModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

/** HIDE MODAL  */
const hideModal = () => {
  modal.classList.add("hidden");
};

closeModal.addEventListener("click", function () {
  hideModal();
});

overlay.addEventListener("click", function () {
  hideModal();
});
