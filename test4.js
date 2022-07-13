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
async function show() {
  const raw_data = await myFetch(URL);
  const prez = raw_data.filter((row) =>
    row.terms.some((term) => term.type === "prez")
  );
  const rows = prez.map((row) => ({
    name: row.name.first + " " + row.name.last,
    birthday: row.bio.birthday,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  // worksheet["!cols"] = [{ wch: max_width }];

  // XLSX.writeFile(workbook, "Presidents.xlsx");
}

show();
