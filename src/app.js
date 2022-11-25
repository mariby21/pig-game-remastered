'use strict';
/**
 * app: PIG-GAME
 * creator: Jonas Schmedtmann
 * remastered: Mario Petkov
 * new features: New colors, login page and styles
 * other new: Player names come from input fields on login page
 * TODO: Input filed for score to reach for win
 * date: 24.11.2022
 * purpose: Re-created it for my portfolio
 * github: https://github.com/mariby21
 * email: mario.nik.petkov@gmail.com
 * BUG TO FIX: Dice png don't show in the dist folder
 */

// import images from './img';

//LOGIN PAGE
const btnSumbit = document.querySelector('#sumbit');
let player1, player2;
btnSumbit.addEventListener('click', function (e) {
  [player1, player2] = [
    document.querySelector('.text-0').value,
    document.querySelector('.text-1').value,
  ];

  e.preventDefault();

  if ((player1, player2 === '')) {
    alert('No Empty Fileds!');
    location.reload();
  } else {
    document.querySelector('.login-box').style.display = 'none';
    document.querySelector('.app').style.display = 'flex';
    document.querySelector('#name--0').textContent = `${player1}`;
    document.querySelector('#name--1').textContent = `${player2}`;
    startGame();
  }
});

//APP
// Selecting score display
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
//Selecting Players Names (in future we need it to come from input)
const player1Name = document.querySelector('#name--0');
const player2Name = document.querySelector('#name--1');
//Selecting Buttons
const buttonNewGame = document.querySelector('.btn--new');
const buttonHold = document.querySelector('.btn--hold');
const buttonRollDice = document.querySelector('.btn--roll');
//Selecting Current Stats Labels
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');
//Select dice
const dice = document.querySelector('.dice');
//Active Player
const activePlayer1 = document.querySelector('.player--0');
const activePlayer2 = document.querySelector('.player--1');
//Dice images folder
// RESET THE UI
const startGame = function () {
  document.querySelector('#name--0').textContent = `${player1}`;
  document.querySelector('#name--1').textContent = `${player2}`;
  document
    .querySelector(`.player--${playerNumber}`)
    .classList.remove('player--active');
  activePlayer1.classList.remove('player--winner');
  activePlayer2.classList.remove('player--winner');
  playing = true;
  scores = [0, 0];
  playerNumber = 0;
  currScore = 0;
  document
    .querySelector(`.player--${playerNumber}`)
    .classList.add('player--active');
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  dice.style.display = 'none';
};

let playerNumber = 0;
let currScore = 0;
let playing = true;
let scores = [0, 0];

//When dice is 1 or button Hold is press
const switchActivePlayer = function () {
  document.getElementById(`current--${playerNumber}`).textContent = 0;
  playerNumber = playerNumber === 0 ? 1 : 0;
  currScore = 0;
  activePlayer1.classList.toggle('player--active');
  activePlayer2.classList.toggle('player--active');
};

const rollDice = function () {
  if (playing) {
    //Generate dice from 1 to 6 and chnage the img (dice)
    const currDice = Math.trunc(Math.random() * 6 + 1);
    dice.style.display = '';
    dice.src = `/src/img/dice-${currDice}.png`;

    // Switch to new player or add score
    if (currDice !== 1) {
      currScore += currDice;
      document.getElementById(`current--${playerNumber}`).textContent =
        currScore;
    } else {
      switchActivePlayer();
    }
  }
};

// HOLD button add current score to Score field
const btnHold = function () {
  if (playing) {
    scores[playerNumber] += currScore;
    document.getElementById(`score--${playerNumber}`).textContent =
      scores[playerNumber];
    if (scores[playerNumber] >= 101) {
      document.querySelector(`#name--${playerNumber}`).textContent = 'WINNER';
      document
        .querySelector(`.player--${playerNumber}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerNumber}`)
        .classList.remove('player--active');
      dice.style.display = 'none';
      playing = false;
    } else {
      switchActivePlayer();
    }
  }
};

//EventListneres
buttonNewGame.addEventListener('click', startGame);
buttonRollDice.addEventListener('click', rollDice);
buttonHold.addEventListener('click', btnHold);
