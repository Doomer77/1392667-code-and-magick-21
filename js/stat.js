'use strict';

const Cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  PRONGS_LEDGE: 5,
  PRONGS_QUANTITY: 10,
  HORIZONTAL_GAP: 55,
  VERTICAL_GAP: 15,
  COLOR: '#fff',
  SHADOW_OFFSET: 10,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

const Text = {
  FONT_SIZE: 16,
  FONT_FAMILY: 'PT Mono',
  COLOR: '#000',
  GAP: 4
};

const Bar = {
  WIDTH: 40,
  MAX_HEIGHT: 150
};


let getMaxElement = (arr) => {
  return Math.max.apply(null, arr);
};

let getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let getGapBetween = (freeSpace, itemWidth, quantity) => {
  return (freeSpace - itemWidth * quantity) / (quantity - 1);
};


let renderText = (ctx, options, x, y, text, baseline) => {
  ctx.font = options.FONT_SIZE + 'px ' + options.FONT_FAMILY;
  ctx.textBaseline = 'hanging';
  if (baseline) {
    ctx.textBaseline = baseline;
  }
  ctx.fillStyle = options.COLOR;
  ctx.fillText(text, x, y);
};

let renderProngs = (ctx, cloud, x, y, reverse) => {
  let prongX = x + cloud.WIDTH;
  let prongY = y;
  let prongHalf = cloud.HEIGHT / (2 * cloud.PRONGS_QUANTITY);
  let prongLedge = -cloud.PRONGS_LEDGE;

  if (reverse) {
    prongX = x;
    prongY = y + cloud.HEIGHT;
    prongHalf = -prongHalf;
    prongLedge = -prongLedge;
  }

  for (let i = 1; i <= 2 * cloud.PRONGS_QUANTITY; i++) {
    if (i % 2 !== 0) {
      ctx.lineTo(prongX, prongY + i * prongHalf);
    } else {
      ctx.lineTo(prongX + prongLedge, prongY + i * prongHalf);
    }
  }
};

let renderCloud = (ctx, cloud, x, y, color) => {
  ctx.beginPath();
  ctx.moveTo(x + cloud.PRONGS_LEDGE, y);

  ctx.lineTo(x + cloud.WIDTH - cloud.PRONGS_LEDGE, y);
  renderProngs(ctx, Cloud, x, y);
  ctx.lineTo(x + cloud.PRONGS_LEDGE, y + cloud.HEIGHT);
  renderProngs(ctx, Cloud, x, y, true);

  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

let renderHistogram = (ctx, shell, bar, labels, data) => {
  let histogramX = shell.X + shell.HORIZONTAL_GAP;
  let histogramY = shell.Y + shell.HEIGHT - shell.VERTICAL_GAP;
  let barMargin = getGapBetween(shell.WIDTH - shell.HORIZONTAL_GAP * 2, bar.WIDTH, data.length);
  let itemX;
  let currentBarHeight;

  for (let i = 0; i < labels.length; i++) {
    itemX = histogramX + (bar.WIDTH + barMargin) * i;
    currentBarHeight = bar.MAX_HEIGHT * Math.round(data[i]) / getMaxElement(data);

    renderText(ctx, Text, itemX, histogramY, labels[i], 'bottom');
    renderText(ctx, Text, itemX, histogramY - Text.FONT_SIZE - Text.GAP * 2 - currentBarHeight, Math.round(data[i]), 'bottom');

    ctx.fillStyle = (labels[i] === 'Вы') ? '#f00' : 'hsl(240, ' + getRandomNum(0, 100) + '%, 50%)';

    ctx.fillRect(itemX, histogramY - Text.FONT_SIZE - Text.GAP, bar.WIDTH, -currentBarHeight);
  }
};

window.renderStatistics = (ctx, names, times) => {
  let initialX = Cloud.X + Cloud.HORIZONTAL_GAP;
  let initialY = Cloud.Y + Cloud.VERTICAL_GAP;

  renderCloud(ctx, Cloud, Cloud.X + Cloud.SHADOW_OFFSET, Cloud.Y + Cloud.SHADOW_OFFSET, Cloud.SHADOW_COLOR);
  renderCloud(ctx, Cloud, Cloud.X, Cloud.Y, Cloud.COLOR);

  renderText(ctx, Text, initialX, initialY, 'Ура вы победили!');
  renderText(ctx, Text, initialX, initialY + Text.FONT_SIZE + Text.GAP, 'Список результатов:');

  renderHistogram(ctx, Cloud, Bar, names, times);
};
