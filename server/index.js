import express from "express";
const app = express();
const PORT = 8080;
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });
  ws.send(JSON.stringify({ id: 1, name: "foo" }));
});

const server = app.listen(PORT);

server.on("upgrade", (req, ws, h) => {
  wss.handleUpgrade(req, ws, h, (ws) => {
    wss.emit("connection", ws, req);
  });
});
