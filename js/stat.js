'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GUP = 10;
const FONT_GAP = 15;
const GUP_COLUMN = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_HEIGHT_RESULT = CLOUD_HEIGHT - BAR_HEIGHT + FONT_GAP * 2;
const TEXT_MAIN_COLOR = '#000';

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getRandomSatiety = () => {
  let s = Math.floor(Math.random() * (101))
  return `hsl(234, ${s}%, 50%)`;
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    };
  };
  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
  //render shadow
  renderCloud(ctx, CLOUD_X + GUP, CLOUD_Y + GUP, 'rgba(0, 0, 0, 0.7)');
  //render cloud
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  //render win text
  ctx.fillStyle = TEXT_MAIN_COLOR;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    //render statistic player
    ctx.fillStyle = TEXT_MAIN_COLOR;
    ctx.fillText(
      players[i],
      CLOUD_X + BAR_WIDTH + (GUP_COLUMN + BAR_WIDTH) * i,
      CLOUD_HEIGHT - BAR_HEIGHT - GUP_COLUMN
    );

    ctx.fillText(
      Math.floor(times[i]),
      CLOUD_X + BAR_WIDTH + (GUP_COLUMN + BAR_WIDTH) * i,
      BAR_HEIGHT_RESULT + (BAR_HEIGHT_RESULT * times[i] / maxTime) - GUP_COLUMN
    );

    if(players[i] === 'Вы'){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomSatiety();
    }
    ctx.fillRect(
      CLOUD_X + BAR_WIDTH + (GUP_COLUMN + BAR_WIDTH) * i,
      CLOUD_HEIGHT - BAR_HEIGHT - FONT_GAP * 2,
      BAR_WIDTH,
      (BAR_HEIGHT_RESULT * times[i] / maxTime)
    );
  };
};
