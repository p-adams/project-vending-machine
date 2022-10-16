import { writable } from "svelte/store";

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  label: string;
}

export type InventoryItems = InventoryItems[];

export const dataStore = writable<InventoryItems>(null);
