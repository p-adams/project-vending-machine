import fs from "fs";
import path from "path";
import db from "../index";
const fetchData = function (pathStr: string): Buffer {
  return fs.readFileSync(path.resolve(__dirname, pathStr));
};
function run() {
  console.log("seed");
  const inventory = JSON.parse(fetchData("../stock.json").toLocaleString());
  console.log(inventory);
}

run();
