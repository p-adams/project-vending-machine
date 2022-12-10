import fs from "fs";
import db from "./db";

interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type InventoryItems = InventoryItem[][] | null;

interface InventoryCoordinator {
  inventory: InventoryItems;
  init: () => InventoryCoordinator;
  get: () => InventoryItems;
  processSelection: (r: number, c: number) => InventoryItem | -1;
}

const fetchData = function (path: string): Buffer {
  return fs.readFileSync(path);
};

const updateData = function (path: string, data: any) {
  const ddata = JSON.stringify(data);
  fs.writeFileSync(path, ddata);
};
const findItem = function (
  inventory: any[][],
  row: number,
  col: number
): InventoryItem | null {
  return inventory[row][col] ?? null;
};

function stockInventory() {
  db.serialize(() => {
    // db.run("")
  });
}

const InventoryCoordinator: InventoryCoordinator = {
  init: function () {
    this.inventory = JSON.parse(fetchData("stock.json").toLocaleString());
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
      const iitem = { ...item, quantity: item.quantity - 1 };
      updateData("stock.json", iitem);
      return item;
    }
    return -1;
  },

  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
