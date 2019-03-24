import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const colorsCtx = document.querySelector(`.statistic__colors`);

const getColors = (tasksData) => {
  const colors = [];
  tasksData.map((item) => colors.push(...item.color));
  return colors;
};

const getColorsData = (colors) => {
  return colors.reduce((prev, cur) => {
    const prop = `#${cur}`;
    prev[prop] = (prev[prop] || 0) + 1;
    return prev;
  }, {});
};

export default {
  _labels: [],
  _data: [],
  _colors: [],
  init(tasksData) {
    const colors = getColors(tasksData);
    const colorsChartData = getColorsData(colors);

    this._labels = Object.keys(colorsChartData);
    this._data = Object.values(colorsChartData);
    this._colors = Array.from(new Set(colors));

    this.render();
  },
  render() {
    return new Chart(colorsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: this._labels,
        datasets: [{
          data: this._data,
          backgroundColor: this._colors
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });
  }
};
