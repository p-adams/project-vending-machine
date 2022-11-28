import express from "express";
import fs from "fs";
const app = express();
const PORT = 8080;
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on(
  "connection",
  (ws: {
    on: (arg0: string, arg1: (data: any) => void) => void;
    send: (arg0: string) => void;
  }) => {
    ws.on("message", (data: string) => {
      /**
       * dataObj: {channel: "inventory | vm", type: string, data: string | number | object}
       */
      const dataObj = JSON.parse(data);
      switch (dataObj.type) {
        case "fetch_inventory":
          const rStock = fs.readFileSync("stock.json");
          const inventory = JSON.parse(rStock.toLocaleString());
          ws.send(
            mToStr({
              channel: "inventory",
              type: "receive_inventory",
              inventory,
            })
          );
          break;
        case "process_payment":
          // mock async process
          setTimeout(() => {
            ws.send(
              mToStr({
                channel: "payment",
                type: "payment_complete",
              })
            );
          }, 500);
          break;
        default:
          break;
      }
      console.log("received: %s", data);
    });
  }
);

const server = app.listen(PORT);

server.on("upgrade", (req, ws, h) => {
  wss.handleUpgrade(req, ws, h, (ws: any) => {
    wss.emit("connection", ws, req);
  });
});

export function mToStr(message: {
  channel: string;
  type: string;
  inventory?: any;
}) {
  return JSON.stringify(message);
}
