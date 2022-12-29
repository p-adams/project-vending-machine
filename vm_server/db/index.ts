import { Database } from "sqlite3";
import { dBLogger } from "../logging/index";
import { InventoryItem } from "../types";

const db = new Database(":memory:", async (error) => {
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

export function getInventory(): Promise<InventoryItem[]> {
  return new Promise((resolve, reject) => {
    return db.all("SELECT * FROM inventory", (err, row: InventoryItem[]) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
}

export function decrementInventoryItemQuantityById(
  id: number | undefined
): Promise<any> | null {
  if (!id) {
    return null;
  }
  const UPDATE_INVENTORY_ITEM =
    "UPDATE inventory SET quantity = quantity - 1 WHERE id = ?";
  return new Promise((resolve, reject) => {
    return db.run(UPDATE_INVENTORY_ITEM, [id], (err) => {
      if (err) {
        reject(err.message);
      }
      resolve("Inventory item updated");
    });
  });
}

export function getInventoryItemById(id: number | undefined) {
  if (!id) {
    return null;
  }
  const GET_INVENTORY_ITEM = `SELECT * FROM inventory WHERE id = ? `;
  return new Promise((resolve, reject) => {
    return db.get(GET_INVENTORY_ITEM, [id], (err, row) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
}
