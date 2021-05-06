import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {COLOURS, MIN_BAR_LENGTH, BAR_THICKNESS, FONT_SIZE, TITLE_FONT_SIZE, PADDING_SIZE} from '../const';

export const createDefaultChart = ({ctx, formatter, title, labels, data} = {}) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: COLOURS.BLACK,
        hoverBackgroundColor: COLOURS.BLACK,
        anchor: 'start',
        minBarLength: MIN_BAR_LENGTH,
        barThickness: BAR_THICKNESS,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE,
          },
          color: COLOURS.WHITE,
          anchor: 'end',
          align: 'start',
          formatter,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: COLOURS.WHITE,
        fontSize: TITLE_FONT_SIZE,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: COLOURS.WHITE,
            padding: PADDING_SIZE,
            fontSize: FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
