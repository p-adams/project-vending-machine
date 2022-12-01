import fs from "fs";

interface InventoryCoordinator {
  inventory: any;
  init: () => InventoryCoordinator;
  getInventory: (fileName: string) => Buffer;
}

const InventoryCoordinator: InventoryCoordinator = {
  init: function () {
    this.inventory = JSON.parse(
      this.getInventory("stock.json").toLocaleString()
    );
    return this;
  },
  getInventory: function (path: string) {
    return fs.readFileSync(path);
  },
  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
