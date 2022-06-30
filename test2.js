import Chart from "chart.js/auto";
import * as Utils from "./utils";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

const numberOfData = (31 * 24 * 3600) / 10;
const datum = [];
let prev = 100;
for (let i = 0; i < numberOfData; i++) {
  prev += 5 - Math.random() * 10;
  datum.push({ x: Utils.newDate(i), y: prev });
}

const data = {
  datasets: [
    {
      label: "Dataset with date object point data",
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      borderColor: Utils.CHART_COLORS.blue,
      fill: false,
      data: datum,
      borderWidth: 1,
      radius: 0,
    },
  ],
};

const decimation = {
  enabled: true,
  algorithm: "lttb",
  samples: 744,
};
const config = {
  type: "line",
  data: data,
  options: {
    // parsing: false,
    spanGaps: true,
    animation: false,
    responsive: true,
    interaction: {
      intersect: false,
      // mode: "nearest",
    },
    plugins: {
      decimation: decimation,
      title: {
        display: true,
        text: "Chart.js Time - spanGaps: 172800000 (2 days in ms)",
      },
      zoom: {
        pan: {
          enabled: true,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
            modifierKey: "ctrl",
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        display: true,
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          major: {
            enabled: true,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "value",
        },
      },
    },
  },
};
const myChart = new Chart(document.querySelector("#myChart"), config);
