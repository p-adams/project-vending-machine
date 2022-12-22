import sqlite3 from "sqlite3";
import { InventoryItem } from "../types";

const db = new sqlite3.Database(":memory:", async (error) => {
  if (error) {
    return console.error(error.message);
  }
  console.log("Connected to DB");
});

db.serialize(async () => {
  // initialize inventory table if it doesn't already exist
  const CREATE_INVENTORY_TABLE =
    "CREATE TABLE IF NOT EXISTS inventory (id integer primary key, name text, price real, quantity integer)";
  db.run(CREATE_INVENTORY_TABLE, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("Created inventory table");
  });
  // seed database with inventory json data
  const inventory: InventoryItem[][] = await (
    await import("./stock.json")
  ).default;
  for (const inventoryItemRow of inventory) {
    for (const inventoryItem of inventoryItemRow) {
      console.log(inventoryItem);
    }
  }
});

export default db;
