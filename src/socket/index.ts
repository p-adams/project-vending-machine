import { writable } from "svelte/store";

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type InventoryItems = InventoryItems[];

const dataStore = writable<InventoryItems>(null);

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {
  socket.send(JSON.stringify({ type: "fetch_inventory" }));
});

socket.addEventListener("message", (event) => {
  dataStore.set(event.data);
});

const sendData = (data) => {
  if (socket.readyState <= 1) {
    socket.send(data);
  }
};

export default {
  subcribe: dataStore.subscribe,
  sendData,
};
