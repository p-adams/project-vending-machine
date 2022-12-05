import fs from "fs";

interface InventoryCoordinator {
  inventory: any;
  init: () => InventoryCoordinator;
  get: () => any;
}

const fetchData = function (path: string): Buffer {
  return fs.readFileSync(path);
};

const InventoryCoordinator: InventoryCoordinator = {
  init: function () {
    this.inventory = JSON.parse(fetchData("stock.json").toLocaleString());
    return this;
  },

  get: function () {
    return this.inventory;
  },

  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
