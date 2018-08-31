/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
3 extra Challenges
channge the game to follow these rules:
1. A player looses his Entire Score when he rolls two 6 in a row. After that, its; the next
  player's turn. (hint: Always save the pervious dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can
  change the predefined score of 100. (Hint: you can read that value with the .value property
  in JavaScript. This is a good oppotunity to use google to figure this out)
3. Add another dice to the game, so that there are two dices now. The player looses his
  current score when one of them is a 1. (Hint: you will need CSS to position the second
  dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();
var lastRoll;
//using the roll dice will choose a random number and roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //gets random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //change the dice picture with the right number drawn
    let diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    //updates the roundScore if the rolled number was not a 1
    if (lastRoll === 6 && dice === 6) {
      //resets players score if they roll a 6 twice in a row
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    //stores the last dice roll here so we can check against this variable.
    lastRoll = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  //add the roundScore to the players score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //finds the what score will it take to win
    var winningScore;
    var input = document.querySelector('.final-score').value;
    if (input) {
      //if a number was entered, then winningScore will take the number that was entered
      winningScore = input;
    } else {
      //default winning score if there was not a number entered into the field
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      //winner bracket
      document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

//starts a new game sets all scores to 0
function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  //sets scores to 0
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent =0;
  //renames players to player 1 and 2
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  //removes active and winner panels then adds active panel to player 1
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');


}

//switches to the next player and switches the background panels to the active player.
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}
