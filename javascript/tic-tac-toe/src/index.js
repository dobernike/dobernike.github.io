const form = document.querySelector('.setting__form');
const setting = document.querySelector('.setting');
const game = document.querySelector('.game');
const gameTable = game.querySelector('.table');
const viewScore = {
  'O': game.querySelector('.playerO-score'),
  'X': game.querySelector('.playerX-score')
}

const PLAYERS = {
  'O': {
    name: 'O',
    score: 0
  },
  'X': {
    name: 'X',
    score: 0
  }
}

let currentPlayer = PLAYERS['O'];

const turn = game.querySelector('.player-turn');

let positionArr = [];
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
  const WIN = {
    X: 0,
    Y: 0,
    XY: 0,
    YX: 0
  }

  for (let k = 0; k < gameSize; k++) {
    if (positionArr[currentY][k].innerHTML == currentPlayer.name) {
      WIN.X += 1;
      if (WIN.X == gameSize) {
        return true;
      }
    }

    if (positionArr[k][currentX].innerHTML == currentPlayer.name) {
      WIN.Y += 1;
      if (WIN.Y == gameSize) {
        return true;
      }
    }

    if (k > 0) {
      try {
        if (positionArr[currentY - k][currentX - k].innerHTML == currentPlayer.name) {
          WIN.XY += 1;
          if (WIN.XY == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY + k][currentX + k].innerHTML == currentPlayer.name) {
          WIN.XY += 1;
          if (WIN.XY == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY + k][currentX - k].innerHTML == currentPlayer.name) {
          WIN.YX += 1;
          if (WIN.YX == gameSize - 1) {
            return true;
          }
        }
      } catch { }

      try {
        if (positionArr[currentY - k][currentX + k].innerHTML == currentPlayer.name) {
          WIN.YX += 1;
          if (WIN.YX == gameSize - 1) {
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
  winner.score = Number(winner.score) + 1;
  count = 1;
  currentPlayer = PLAYERS['O'];
  gameTable.removeEventListener('click', cellClickHandler);
  createGameTable(gameSize);
}

function cellClickHandler(e) {
  const target = e.target;

  if (target.innerHTML !== '' || target.tagName !== 'TD') { return }
  target.innerText = currentPlayer.name;

  currentX = target.dataset.positionx;
  currentY = target.parentElement.dataset.positiony;

  if (canContinue(currentX, currentY)) {
    updateGame(target);
  } else {
    startNextGame(currentPlayer);
  }
}

function createGameTable(size) {
  for (const player in PLAYERS) {
    if (localStorage[`score${player}`] !== undefined &&
      localStorage[`score${player}`] >= PLAYERS[player].score) {
      PLAYERS[player].score = localStorage.getItem(`score${player}`);
    } else {
      localStorage.setItem(`score${player}`, PLAYERS[player].score);
    }
    viewScore[player].innerHTML = PLAYERS[player].score;
  }

  turn.innerText = currentPlayer.name;

  let gameTd = '';
  for (let j = 0; j < size; j++) {
    gameTd += `<td class="table__cell" data-positionx="${j}"></td>`;
  }

  let gameTr = '';
  for (let i = 0; i < size; i++) {
    gameTr += `<tr class="table__tr" data-positiony="${i}">${gameTd}</tr>`
  }

  gameTable.innerHTML = gameTr;

  gameTable.addEventListener('click', cellClickHandler);

  positionArr = [];
  const trs = gameTable.querySelectorAll('.table__tr');

  for (let j = 0; j < trs.length; j++) {
    const tr = trs[j];
    positionArr.push([]);

    let tds = tr.children;
    for (let i = 0; i < tds.length; i++) {
      const td = tds[i];
      positionArr[j].push(td);
    }
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
  positionArr = [];

  PLAYERS['O'] = {
    name: 'O',
    score: 0
  }

  PLAYERS['X'] = {
    name: 'X',
    score: 0
  }

  currentPlayer = PLAYERS['O'];

  localStorage.clear();

  game.classList.add('hidden');
  setting.classList.remove('hidden');
});
