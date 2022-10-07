import express from "express";
import fs from "fs";
const app = express();
const PORT = 8080;
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const pdata = JSON.parse(data);
    switch (pdata.type) {
      case "fetch_inventory":
        const rStock = fs.readFileSync("stock.json");
        const stock = JSON.parse(rStock);
        ws.send(
          JSON.stringify({ type: "receive_inventory", inventory: stock })
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
