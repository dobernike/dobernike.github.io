const form = document.querySelector('.setting__form');
const gameSize = form.querySelector('#game-size');
const setting = document.querySelector('.setting');
const game = document.querySelector('.game');
const gameTable = game.querySelector('.table');

const tableCell = '<div class="table__cell"></div>';

const viewScoreO = game.querySelector('.playerO-score');
const viewScoreX = game.querySelector('.playerX-score');

const PLAYERS = {
  'O': {
    name: 'O',
    score: 0,
    positions: []
  },
  'X': {
    name: 'X',
    score: 0,
    positions: []
  }
}

let currentPlayer = PLAYERS['O'];

const turn = game.querySelector('.player-turn');

function updateGame(cell) {
  cell.removeEventListener('click', cellClickHandler)

  currentPlayer === PLAYERS['O'] ? currentPlayer = PLAYERS['X'] : currentPlayer = PLAYERS['O'];

  turn.innerText = currentPlayer.name;
}

function canContinue() {
  return true;
}

function startNextGame(winner) {
  winner = winner.score + 1;
  createGameTable(gameSize.value);
}

function cellClickHandler() {
  this.innerText = currentPlayer.name;
  if (canContinue()) {
    updateGame(this);
  } else {
    startNextGame(currentPlayer)
  }
}

function createGameTable(size) {
  viewScoreO.innerHTML = PLAYERS['O'].score;
  viewScoreX.innerHTML = PLAYERS['X'].score;

  gameTable.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gameTable.innerHTML = tableCell.repeat(size ** 2);

  const cells = gameTable.querySelectorAll('.table__cell');
  for (const cell of cells) {
    cell.addEventListener('click', cellClickHandler)
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  createGameTable(gameSize.value);
  setting.classList.add('hidden');
  game.classList.remove('hidden');
});

const repeat = game.querySelector('.repeat');
repeat.addEventListener('click', () => {

  PLAYERS['O'] = {
    name: 'O',
    score: 0,
    positions: []
  }

  PLAYERS['X'] = {
    name: 'X',
    score: 0,
    positions: []
  }

  currentPlayer = PLAYERS['O'];

  game.classList.add('hidden');
  setting.classList.remove('hidden');
});