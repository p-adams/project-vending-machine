import express from "express";
import fs from "fs";
const app = express();
const PORT = 8080;
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    /**
     * dataObj: {channel: "inventory | vm", type: string, data: string | number | object}
     */
    const dataObj = JSON.parse(data);
    switch (dataObj.type) {
      case "fetch_inventory":
        const rStock = fs.readFileSync("stock.json");
        const inventory = JSON.parse(rStock);
        ws.send(
          mToStr({
            channel: "inventory",
            type: "receive_inventory",
            inventory,
          })
        );
        break;

      default:
        break;
    }
    console.log("received: %s", data);
  });
});

const server = app.listen(PORT);

server.on("upgrade", (req, ws, h) => {
  wss.handleUpgrade(req, ws, h, (ws) => {
    wss.emit("connection", ws, req);
  });
});

export function mToStr(message) {
  return JSON.stringify(message);
}
