import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", async (error) => {
  if (error) {
    return console.error(error.message);
  }
  // seed database with inventory json data
  const inventory = await (await import("./stock.json")).default;
  console.log("Connected to DB", inventory);
});
export default db;
