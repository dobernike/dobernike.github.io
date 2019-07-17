// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/javascript/tic-tac-toe/src/js/sw.js', { scope: '/javascript/tic-tac-toe/src/js/' }).then(function (reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }

  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

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
    // positions: []
  },
  'X': {
    name: 'X',
    score: 0,
    // positions: []
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
  // console.log('currentY', currentY, 'currentX', currentX, 'name', currentPlayer.name);
  const positionArr = [];
  const trs = gameTable.querySelectorAll('.table__tr');
  // console.log(tr);

  for (let j = 0; j < trs.length; j++) {
    const tr = trs[j];
    positionArr.push([]);

    let tds = tr.children;
    for (let i = 0; i < tds.length; i++) {
      const td = tds[i];
      positionArr[j].push(td);
    }
  }
  // console.log(positionArr, gameSize);
  let winX = 0;
  let winY = 0;
  let winXY = 0;
  let winYX = 0;

  for (let k = 0; k < gameSize; k++) {
    // console.log(positionArr);

    if (positionArr[currentY][k].innerHTML == currentPlayer.name) {
      winX += 1;
      if (winX == gameSize) {
        return true;
      }
    }

    if (positionArr[k][currentX].innerHTML == currentPlayer.name) {
      winY += 1;
      if (winY == gameSize) {
        return true;
      }
    }

    // console.log(positionArr[currentY][currentX]);
    if (k > 0) {
      try {
        if (positionArr[currentY - k][currentX - k].innerHTML == currentPlayer.name) {
          // console.log(positionArr[currentY - k][currentX - k]);
          winXY += 1;
          if (winXY == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY + k][currentX + k].innerHTML == currentPlayer.name) {
          // console.log(positionArr[currentY + k][currentX + k]);
          winXY += 1;
          if (winXY == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY + k][currentX - k].innerHTML == currentPlayer.name) {
          // console.log(positionArr[currentY + k][currentX - k]);
          winYX += 1;
          if (winYX == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY - k][currentX + k].innerHTML == currentPlayer.name) {
          // console.log(positionArr[currentY - k][currentX + k]);
          winYX += 1;
          if (winYX == gameSize - 1) {
            return true;
          }
        }
      } catch { }
    }
  }
  return false;
}

function canContinue(currentX, currentY) {
  if (!didPlayerWin(Number(currentX), Number(currentY))) {
    if (count !== gameSize ** 2) {
      return true;
    }
  }

  return false;
}

function startNextGame(winner) {
  winner.score += 1;
  count = 1;
  currentPlayer = PLAYERS['O'];
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
    // positions: []
  }

  PLAYERS['X'] = {
    name: 'X',
    score: 0,
    // positions: []
  }

  currentPlayer = PLAYERS['O'];

  game.classList.add('hidden');
  setting.classList.remove('hidden');
});