import socket from ".";
import { writable } from "svelte/store";

export interface VMState {
  selected_keycode: string;
}
const keyMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
};
const vmDataStore = writable<VMState>();

function setSelectedKey(key: string) {
  const [row, col] = key;
  vmDataStore.set({ selected_keycode: key });
  socket.sendData({
    type: "keycode_selected",
    data: [keyMap[row], Number(col)],
  });
}

export default {
  subscribe: vmDataStore.subscribe,
  setSelectedKey,
};
