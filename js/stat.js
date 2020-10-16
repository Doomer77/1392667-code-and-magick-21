'use strict';

// render stats

(function () {
  const CLOUD = {
    X: 100,
    Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    HORIZONTAL_GAP: 50,
    VERTICAL_GAP: 15,
    COLOR: '#fff',
    SHADOW_OFFSET: 10,
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
  };

  const TEXT = {
    FONT_SIZE: 16,
    FONT_FAMILY: 'PT Mono',
    COLOR: '#000',
    GAP: 4
  };

  const BAR = {
    WIDTH: 40,
    MAX_HEIGHT: 150
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

  let renderCloud = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD.WIDTH, CLOUD.HEIGHT);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD.WIDTH, CLOUD.HEIGHT);
  };

  let renderHistogram = (ctx, shell, bar, labels, data) => {
    let histogramX = shell.X + shell.HORIZONTAL_GAP - shell.SHADOW_OFFSET;
    let histogramY = shell.Y + shell.HEIGHT - shell.VERTICAL_GAP;
    let barMargin = getGapBetween(shell.WIDTH - (shell.HORIZONTAL_GAP * 2) - shell.SHADOW_OFFSET, bar.WIDTH, data.length);
    let itemX;
    let currentBarHeight;

    for (let i = 0; i < labels.length; i++) {
      itemX = histogramX + (bar.WIDTH + barMargin) * i;
      currentBarHeight = bar.MAX_HEIGHT * Math.round(data[i]) / window.util.getMaxElement(data);

      renderText(ctx, TEXT, itemX, histogramY, labels[i], 'bottom');
      renderText(ctx, TEXT, itemX, histogramY - TEXT.FONT_SIZE - TEXT.GAP * 2 - currentBarHeight, Math.round(data[i]), 'bottom');

      ctx.fillStyle = (labels[i] === 'Вы') ? '#f00' : 'hsl(240, ' + window.util.getRandomNum(0, 100) + '%, 50%)';

      ctx.fillRect(itemX, histogramY - TEXT.FONT_SIZE - TEXT.GAP, bar.WIDTH, -currentBarHeight);
    }
  };

  window.renderStatistics = (ctx, names, times) => {
    let initialX = CLOUD.X + CLOUD.HORIZONTAL_GAP - CLOUD.SHADOW_OFFSET * 3;
    let initialY = CLOUD.Y + CLOUD.VERTICAL_GAP + CLOUD.SHADOW_OFFSET / 2;

    renderCloud(ctx, CLOUD.X + CLOUD.SHADOW_OFFSET, CLOUD.Y + CLOUD.SHADOW_OFFSET, CLOUD.SHADOW_COLOR);
    renderCloud(ctx, CLOUD.X, CLOUD.Y, CLOUD.COLOR);

    renderText(ctx, TEXT, initialX, initialY, 'Ура вы победили!');
    renderText(ctx, TEXT, initialX, initialY + TEXT.FONT_SIZE + TEXT.GAP, 'Список результатов:');

    renderHistogram(ctx, CLOUD, BAR, names, times);
  };

})();
