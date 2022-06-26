import Chart from "chart.js/auto";
import { CHART_COLORS } from "./utils";

import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);
///////////////////////////////////////
// setups
const numberOfData = (31 * 24 * 3600) / 10;
const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < numberOfData; i++) {
  prev += 5 - Math.random() * 10;
  data.push({ x: i, y: prev });
  prev2 += 5 - Math.random() * 10;
  data2.push({ x: i, y: prev2 });
}

const decimation = {
  enabled: true,
  algorithm: "lttb",
  samples: 744,
};

const config = {
  type: "line",
  data: {
    datasets: [
      {
        borderColor: CHART_COLORS.red,
        borderWidth: 1,
        radius: 0,
        data: data,
      },
      {
        borderColor: CHART_COLORS.blue,
        borderWidth: 1,
        radius: 0,
        data: data2,
      },
    ],
  },
  options: {
    animation: false,
    parsing: false,

    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
      decimation: decimation,
      tooltip: {
        enabled: false,
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
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "linear",
      },
    },
  },
};
////////////////////////////////////////

const myChart = new Chart(document.querySelector("#myChart"), config);

const form = document.querySelector("form");
const onOff = document.querySelector("#on-off");
const typeOfDecimation = document.querySelector("#decimation");
form.addEventListener("change", (e) => {
  console.log(onOff.checked);
  console.log(+typeOfDecimation.value);

  decimation.enabled = onOff.checked;
  decimation.samples = +typeOfDecimation.value;
  myChart.update();
});
const resetZoom = document.querySelector("#btn");

resetZoom.addEventListener("click", (e) => {
  myChart.resetZoom();
});
