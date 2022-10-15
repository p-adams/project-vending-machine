import type { InventoryItem, InventoryItems } from "./socket";

export const labels = Array.from(Array(5))
  .map((_, i) => i + 65)
  .map((ch) => String.fromCharCode(ch));

export function buildVMItemGrid(): string[][] {
  const gridItems: string[][] = [...new Array(5)].map(() =>
    new Array(5).fill(0)
  );
  for (const i in gridItems) {
    const item = gridItems[i];
    const label = labels[i];

    for (const slot in item) {
      item[slot] = `${label}${slot}`;
    }
  }
  return gridItems;
}

export function stockVMWindow(inventory: InventoryItems): InventoryItem[][] {
  const vmWindow: any = buildVMItemGrid();
  for (const row in vmWindow) {
    for (const col in vmWindow[row]) {
      const label = vmWindow[row][col];
      const inventoryItem = inventory?.[row][col];
      if (inventoryItem) {
        (vmWindow[row][col] as any) = { ...inventoryItem, label };
      }
    }
  }
  return vmWindow;
}
