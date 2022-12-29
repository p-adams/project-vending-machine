import {
  decrementInventoryItemQuantityById,
  getInventory,
  getInventoryItemById,
} from "../db";
import { InventoryItem } from "../types";

type InventoryItems = InventoryItem[][] | null;

interface InventoryCoordinator {
  inventory: InventoryItems;
  init: () => Promise<InventoryCoordinator>;
  get: () => InventoryItems;
  processSelection: (r: number, c: number) => Promise<InventoryItems | -1>;
}

const findItem = function (
  inventory: InventoryItems,
  row: number,
  col: number
): InventoryItem | null {
  return inventory?.[row][col] ?? null;
};

function createInventoryGroups(
  inventory: InventoryItem[],
  groupCount = 5
): InventoryItems {
  return inventory.reduce(
    (list: InventoryItems, item, index): InventoryItems => {
      if (!list) {
        return [];
      }
      const groupIdx = Math.floor(index / groupCount);
      if (!list[groupIdx]) {
        list[groupIdx] = [];
      }
      list[groupIdx].push(item);
      return list;
    },
    []
  );
}

const InventoryCoordinator: InventoryCoordinator = {
  init: async function () {
    const data = await getInventory();
    this.inventory = createInventoryGroups(data);
    return this;
  },
  get: function (): InventoryItems {
    return this.inventory;
  },
  async processSelection(row, col): Promise<InventoryItems | -1> {
    const item = findItem(this.get(), row, col);
    const inventoryItem = await getInventoryItemById(item?.id);
    if (inventoryItem?.quantity) {
      await decrementInventoryItemQuantityById(item?.id);
      const data = await getInventory();
      this.inventory = createInventoryGroups(data);
      return this.inventory;
    }
    // -1 denotes out-of-stock
    return -1;
  },

  inventory: null,
};

export const inventoryCoordinator: InventoryCoordinator =
  Object.create(InventoryCoordinator);
