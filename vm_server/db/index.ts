import sqlite3 from "sqlite3";
import { dBLogger } from "../logging/index";
import { InventoryItem } from "../types";

const db = new sqlite3.Database(":memory:", async (error) => {
  if (error) {
    /*dBLogger.write({
      event: "CONNECTION ERROR",
      data: "Error connecting to DB",
    });*/
    return console.error(error.message);
  }
  // dBLogger.write({ event: "CONNECTION", data: "Connected to DB" });
  console.log("Connected to DB");
});

function createTable() {
  return new Promise((resolve, reject) => {
    const CREATE_INVENTORY_TABLE =
      "CREATE TABLE IF NOT EXISTS inventory (id integer primary key, name text, price real, quantity integer)";
    return db.run(CREATE_INVENTORY_TABLE, (err) => {
      if (err) {
        reject(err);
      }
      return resolve("Created inventory table");
    });
  });
}

db.serialize(async () => {
  try {
    await createTable();
    const inventory: InventoryItem[][] = await (
      await import("./stock.json")
    ).default;
    for (const inventoryItemRow of inventory) {
      for (const inventoryItem of inventoryItemRow) {
        console.log(inventoryItem);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default db;
