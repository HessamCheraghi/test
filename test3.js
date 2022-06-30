import Chart from "chart.js/auto";
import * as Utils from "./utils";
import "chartjs-adapter-luxon";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);
Chart.defaults.font.family = "'Vazirmatn', sans-serif";

const numberOfData = (31 * 24 * 3600) / 10;
const startDate = 1656573712206;
const datum = [];
let prev = 100;
for (let i = 0; i < numberOfData; i++) {
  prev += 5 - Math.random() * 10;
  const time = startDate + 10000 * i;
  datum.push({ x: time, y: prev });
}

const data = {
  datasets: [
    {
      label: "برق مصرفی",
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
    locale: "fa-IR",
    parsing: false,
    spanGaps: true,
    animation: false,
    responsive: true,
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    plugins: {
      decimation: decimation,
      title: {
        display: true,
        text: "یه نمودار",
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
          text: "تاریخ",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          major: {
            enabled: true,
          },
        },
        adapters: {
          date: {
            locale: "fa-IR",
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "آمپر",
        },
      },
    },
  },
};
const myChart = new Chart(document.querySelector("#myChart"), config);
