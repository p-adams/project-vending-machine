import socket from ".";
import { writable } from "svelte/store";

export interface VMState {
  selected_keycode: string;
}

const vmDataStore = writable<VMState>();

function setSelectedKey(key: string) {
  vmDataStore.set({ selected_keycode: key });
  socket.sendData({ type: "keycode_selected", data: key });
}

export default {
  subscribe: vmDataStore.subscribe,
  setSelectedKey,
};
