import express from "express";
import fs from "fs";
const app = express();
const PORT = 8080;
import { WebSocketServer, WebSocket } from "ws";
import {
  socketChannel as socketChannelCoordinator,
  SocketChannel,
} from "./socket-channel";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  function messageHandler(socketChannel: SocketChannel, data: string) {
    const dataObj = JSON.parse(data);
    switch (dataObj.type) {
      case "fetch_inventory":
        const rStock = fs.readFileSync("stock.json");
        const inventory = JSON.parse(rStock.toLocaleString());
        socketChannel.dispatch({
          channel: "inventory",
          type: "receive_inventory",
          data: inventory,
        });

        break;
      case "process_payment":
        // mock async process
        setTimeout(() => {
          socketChannel.dispatch({
            channel: "payment",
            type: "payment_complete",
          });
        }, 500);
        break;
      default:
        break;
    }
  }
  const socketChannel = socketChannelCoordinator.init(ws);

  socketChannel.receive("message", (data: string) =>
    messageHandler(socketChannel, data)
  );
});

const server = app.listen(PORT);

server.on("upgrade", (req, ws, h) => {
  wss.handleUpgrade(req, ws, h, (ws: any) => {
    wss.emit("connection", ws, req);
  });
});

export default {};
