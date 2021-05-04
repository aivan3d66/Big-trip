import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {COLOURS} from '../const';

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
        minBarLength: 50,
        barThickness: 44,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
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
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: COLOURS.WHITE,
            padding: 5,
            fontSize: 13,
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
