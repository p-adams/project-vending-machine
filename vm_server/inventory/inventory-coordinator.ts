import db from "../db";
import { InventoryItem } from "../types";

type InventoryItems = InventoryItem[][] | null;

interface InventoryCoordinator {
  inventory: InventoryItems;
  init: () => Promise<InventoryCoordinator>;
  get: () => InventoryItems;
  processSelection: (r: number, c: number) => InventoryItem | -1;
}

const findItem = function (
  inventory: any[][],
  row: number,
  col: number
): InventoryItem | null {
  return inventory[row][col] ?? null;
};

function getInventory() {
  return new Promise((resolve, reject) => {
    return db.all("SELECT * FROM inventory", (err, row) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
}

const InventoryCoordinator: InventoryCoordinator = {
  init: async function () {
    const data = await getInventory();
    console.log("data:", data);
    this.inventory = []; // TODO: get inventory from DB;
    return this;
  },
  get: function (): InventoryItems {
    return this.inventory;
  },
  processSelection(row, col): InventoryItem | -1 {
    const item = this.get()?.[row]?.[col] ?? null;
    // TODO: query db for quantity and decrement if quantity is positive value
    // or return -1 to indicate item isn't in stock
    if (item?.quantity) {
      return item;
    }
    return -1;
  },

  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
