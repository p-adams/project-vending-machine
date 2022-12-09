import fs from "fs";

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
  get: () => any;
  processOrder: (r: number, c: number) => any;
}

const fetchData = function (path: string): Buffer {
  return fs.readFileSync(path);
};
const findItem = function (
  inventory: any[][],
  row: number,
  col: number
): InventoryItem | null {
  return inventory[row][col] ?? null;
};

const InventoryCoordinator: InventoryCoordinator = {
  init: function () {
    this.inventory = JSON.parse(fetchData("stock.json").toLocaleString());
    return this;
  },
  get: function () {
    return this.inventory;
  },
  processOrder(row, col) {
    const item = findItem(this.get(), row, col);
    if (item?.quantity) {
      // remove
      console.log(item);
    }
  },

  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
