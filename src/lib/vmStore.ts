import { writable } from "svelte/store";

export interface VMState {
  selected_keycode: string;
}

const vmDataStore = writable<VMState>();

function setSelectedKey(key: string) {
  vmDataStore.set({ selected_keycode: key });
}

export default {
  subscribe: vmDataStore.subscribe,
  setSelectedKey,
};
