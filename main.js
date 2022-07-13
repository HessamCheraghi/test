import * as XLSX from "xlsx";

const URL = "https://sheetjs.com/executive.json";
async function myFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function reshaper() {
  console.log("start generating dummy data");
  console.time("generating data");
  const numberOfData = (31 * 24 * 3600) / 10;
  const startDate = 1656573712206;
  const datum = [];
  const datum2 = [];
  let prev = 100;
  let prev2 = 80;
  for (let i = 0; i < numberOfData; i++) {
    prev += 5 - Math.random() * 10;
    prev2 += 5 - Math.random() * 10;
    const time = startDate + 10000 * i;
    datum.push({ x: time, y: prev });
    datum2.push({ x: time, y: prev2 });
  }

  console.timeEnd("generating data");

  console.log("start convering data to Jalali calendar");

  console.time("converting to Jalali");
  const asker = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
  const res = datum.map((_, index) => {
    return {
      time: asker.format(datum[index].x),
      balmil1: datum[index].y,
      balmil2: datum2[index].y,
    };
  });

  console.timeEnd("converting to Jalali");
  return res;
}

function show(rows) {
  console.log("start converting to excel");
  console.time("converting to excel");
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RASSAM IOT");

  // console.log(worksheet);
  // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  // worksheet["!cols"] = [{ wch: max_width }];

  XLSX.writeFile(workbook, "RASSAM IOT.xlsx");
  console.timeEnd("converting to excel");
}

const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  console.log("TEST BEGIN");
  console.time("total time");
  const data = reshaper();
  show(data);
  console.timeEnd("total time");
  console.log("TEST END");
});
