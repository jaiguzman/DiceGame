/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const elements = {
  score0: document.getElementById('score-0'),
  score1: document.getElementById('score-1'),
  current0: document.getElementById('current-0'),
  current1: document.getElementById('current-1'),
  name0: document.getElementById('name-0'),
  name1: document.getElementById('name-1'),
  dice: document.querySelector('.dice'),
  player0: document.querySelector('.player-0-panel'),
  player1: document.querySelector('.player-1-panel'),
  btnRoll: document.querySelector('.btn-roll'),
  btnNew: document.querySelector('.btn-new'),
  btnHold: document.querySelector('.btn-hold'),
  finalScore: document.querySelector('.final-score')
};

let scores, roundScore, activePlayer, gamePlaying, lastRoll;

init();

//Using the roll dice will choose a random number and roll the dice
elements.btnRoll.addEventListener('click', () => {
  if (gamePlaying) {
    //gets random number
    let dice = Math.floor(Math.random() * 6) + 1;
    //Change the dice picture with the right number drawn
    elements.dice.style.display = 'block';
    elements.dice.src = 'dice-' + dice + '.png';
    //Updates the roundScore if the rolled number wasn't a 1
    if (lastRoll === 6 && dice === 6) {
      //resets players score if they roll a 6 twice in a row
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
    //Stores the last dice roll here so we can check against this varible
    lastRoll = dice;
  }
});

elements.btnHold.addEventListener('click', () => {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    //finds the what score will it take to win
    let winningScore;
    let input = elements.finalScore.value;
    if (input) {
      //If a numer was entered, then winningScore will take the number that was entered
      winningScore = input;
    } else {
      //Default winning score if there was not a number enetered into the field
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      //winners bracket
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
})

elements.btnNew.addEventListener('click', init);


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  elements.dice.style.display = 'none';

  //sets Scores to 0
  elements.score0.textContent = 0;
  elements.score1.textContent = 0;
  elements.current0.textContent = 0;
  elements.current1.textContent = 0;

  //removes active and winner panels then adds active panel to player 1
  elements.player0.classList.remove('winner');
  elements.player1.classList.remove('winner');
  elements.player0.classList.remove('active');
  elements.player1.classList.remove('active');
  elements.player0.classList.add('active');
};

//Switches to the next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  elements.current0.textContent = 0;
  elements.current1.textContent = 0;
  elements.dice.style.display = 'none';
  elements.player0.classList.toggle('active');
  elements.player1.classList.toggle('active');
};



