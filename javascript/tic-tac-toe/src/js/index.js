const form = document.querySelector('.setting__form');
const gameSize = form.querySelector('#game-size');
const setting = document.querySelector('.setting');
const game = document.querySelector('.game');
const gameTable = game.querySelector('.table');

const tableCell = '<div class="table__cell"></div>';

const playerO = 'O';
const playerX = 'X';
let currentPlayer = playerO;

const turn = game.querySelector('.player-turn');

function updateGame(cell) {
  cell.removeEventListener('click', cellClickHandler)

  currentPlayer === playerO ? currentPlayer = playerX : currentPlayer = playerO;

  turn.innerText = currentPlayer;
}

function cellClickHandler() {
  this.innerText = currentPlayer;
  updateGame(this);
}

function createGameTable(size) {
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
  currentPlayer = playerO;
  game.classList.add('hidden');
  setting.classList.remove('hidden');
});