import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:", (error) => {
  if (error) {
    return console.error(error.message);
  }
  console.log("Connected to DB");
});
export default db;
