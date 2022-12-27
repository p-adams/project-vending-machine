import sqlite3 from "sqlite3";
import { dBLogger } from "../logging/index";
import { InventoryItem } from "../types";

const db = new sqlite3.Database(":memory:", async (error) => {
  if (error) {
    dBLogger.write({
      event: "CONNECTION ERROR",
      data: `Error connecting to DB: ${error.message}`,
    });
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

function insert(data: InventoryItem) {
  const INSERT_INVENTORY_ITEM = `INSERT INTO inventory(name, price, quantity) VALUES (?,?,?)`;
  return new Promise((resolve, reject) => {
    return db.run(
      INSERT_INVENTORY_ITEM,
      [data.name, data.price, data.quantity],
      (err) => {
        if (err) {
          reject(err);
        }
        return resolve(`Inserted ${data.name} into inventory table`);
      }
    );
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
        await insert(inventoryItem);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export function getInventory() {
  return new Promise((resolve, reject) => {
    return db.all("SELECT * FROM inventory", (err, row) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
}
