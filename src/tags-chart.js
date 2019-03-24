import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {tasksData} from './data';

const tagsCtx = document.querySelector(`.statistic__tags`);

const getTags = () => {
  const tags = [];
  tasksData.map((item) => item.tags.forEach((it) => tags.push(it)));
  return tags;
};

const tagsData = getTags().reduce((prev, cur) => {
  const prop = `#${cur}`;
  prev[prop] = (prev[prop] || 0) + 1;
  return prev;
}, {});

const tagsChartData = {
  labels: Object.keys(tagsData),
  data: Object.values(tagsData)
};

export default {
  render() {
    return new Chart(tagsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: tagsChartData.labels,
        datasets: [{
          data: tagsChartData.data,
          backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`, `#e91e63`, `#607d8b`]
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
          text: `DONE BY: TAGS`,
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
