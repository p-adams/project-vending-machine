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
  processOrder: (r: number, c: number) => InventoryItem | number;
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

const InventoryCoordinator: InventoryCoordinator = {
  init: function () {
    this.inventory = JSON.parse(fetchData("stock.json").toLocaleString());
    return this;
  },
  get: function () {
    return this.inventory;
  },
  processOrder(row, col): InventoryItem | number {
    const item = findItem(this.get(), row, col);
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
