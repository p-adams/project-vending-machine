import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", async (error) => {
  if (error) {
    return console.error(error.message);
  }
  console.log("Connected to DB");
});

db.serialize(async () => {
  // initialize inventory table if it doesn't already exist
  // TODO: define table columns
  const CREATE_INVENTORY_TABLE = "CREATE TABLE IF NOT EXISTS inventory ()";
  db.run(CREATE_INVENTORY_TABLE, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  // seed database with inventory json data
  const inventory = await (await import("./stock.json")).default;
  for (const inventoryItemRow of inventory) {
    for (const inventoryItem of inventoryItemRow) {
      console.log(inventoryItem);
    }
  }
});

export default db;
