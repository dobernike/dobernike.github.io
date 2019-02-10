'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 30;
var TEXT_WIDTH = 20;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  if (maxElement !== undefined) {
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  } else {
    return 'Список пустой';
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_WIDTH, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_WIDTH, (CLOUD_Y + FONT_GAP) + TEXT_WIDTH);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), (CLOUD_HEIGHT - FONT_GAP - GAP) - (BAR_HEIGHT * times[i]) / maxTime);

    if (players[i] === 'Вы') {
      ctx.fillStyle = PLAYER_COLOR;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_HEIGHT - FONT_GAP, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
  }
};

