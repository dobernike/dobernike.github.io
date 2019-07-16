const form = document.querySelector('.setting__form');
const setting = document.querySelector('.setting');
const game = document.querySelector('.game');
const gameTable = game.querySelector('.table');

// const winPositions = [];

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

let count = 1;
let gameSize;

function updateGame(cell) {
  cell.removeEventListener('click', cellClickHandler);

  currentPlayer === PLAYERS['O']
    ? currentPlayer = PLAYERS['X']
    : currentPlayer = PLAYERS['O'];

  turn.innerText = currentPlayer.name;
  count += 1;
}

function didPlayerWin(currentX, currentY) {
  console.log(currentY, currentX, currentPlayer);
  const trs = gameTable.querySelectorAll('.table__tr');
  for (const tr of trs) {
    const posY = tr.dataset.positiony;
    // console.log(tr.children);

    for (const td of tr.children) {
      // console.log(td);
    }

    if (currentY === posY) {
      console.log('success');
    }


    // if ()

    // const cells = tr.querySelectorAll('.table__cell');
    // for (const cell of cells) {
    // const position = cell.dataset.position;
    // if (currentPosition !== position) {

    // }
    // }
  }




  return false;
}

function canContinue(currentX, currentY) {
  if (!didPlayerWin(currentX, currentY)) {
    if (count !== gameSize ** 2) {
      return true;
    }
  }

  return false;
}

function startNextGame(winner) {
  winner.score += 1;
  count = 1;
  createGameTable(gameSize);
}

function cellClickHandler() {
  this.innerText = currentPlayer.name;

  currentX = this.dataset.positionx;
  currentY = this.parentElement.dataset.positiony;

  if (canContinue(currentX, currentY)) {
    updateGame(this);
  } else {
    startNextGame(currentPlayer);
  }
}

// function createWinPositions(size, maxSize) {
//   const tempArray = new Array(Number(size));
//   for (let i = 0; i < size; i++) {
//     tempArray[i] = new Array(Number(size));
//   }

//   winPositions.push(tempArray);
//   console.log(winPositions);
// }

function createGameTable(size) {
  viewScoreO.innerHTML = PLAYERS['O'].score;
  viewScoreX.innerHTML = PLAYERS['X'].score;

  turn.innerText = currentPlayer.name;
  // const maxSize = size ** 2;
  // createWinPositions(size, maxSize);
  // let dataId = 1;



  let gameTd = '';
  for (let j = 0; j < size; j++) {
    gameTd += `<td class="table__cell" data-positionx="${j}"></td>`;
  }

  let gameTr = '';
  for (let i = 0; i < size; i++) {
    gameTr += `<tr class="table__tr" data-positiony="${i}">${gameTd}</tr>`
  }
  // const gameTd = '<td class="table__cell"></td>'.repeat(size);
  // const gameTr = `<tr class="table__tr">${gameTd}</tr>`.repeat(size);

  gameTable.innerHTML = gameTr;

  const cells = gameTable.querySelectorAll('.table__cell');

  for (const cell of cells) {
    cell.addEventListener('click', cellClickHandler)
  }
}


form.addEventListener('submit', e => {
  e.preventDefault();

  gameSize = form.querySelector('#game-size').value;
  createGameTable(gameSize);

  setting.classList.add('hidden');
  game.classList.remove('hidden');
});


const repeat = game.querySelector('.repeat');
repeat.addEventListener('click', () => {
  count = 1;

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