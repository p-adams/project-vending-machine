import { dataStore } from "./inventoryStore";
const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {
  socket.send(mToStr({ type: "fetch_inventory" }));
});

((store) => {
  socket.addEventListener("message", (event) => {
    const { channel }: { channel: "inventory | vm"; type: string; data: any } =
      JSON.parse(event.data);

    store.set(event.data);
  });
})(dataStore);

const sendData = (data) => {
  if (socket.readyState <= 1) {
    socket.send(mToStr(data));
  }
};

export function mToStr(message) {
  return JSON.stringify(message);
}

export default {
  subcribe: dataStore.subscribe,
  sendData,
};
