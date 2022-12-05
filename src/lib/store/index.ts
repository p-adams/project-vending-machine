import { dataStore } from "./inventoryStore";
const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {
  socket.send(JSON.stringify({ type: "fetch_inventory" }));
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
    socket.send(JSON.stringify(data));
  }
};

export default {
  subcribe: dataStore.subscribe,
  sendData,
};
