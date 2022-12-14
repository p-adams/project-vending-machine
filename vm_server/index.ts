import express from "express";
const app = express();
const PORT = 8080;
import { WebSocketServer, WebSocket } from "ws";
import { socketChannel as socketChannelCoordinator } from "./socket/socket-channel";
import { messageHandler } from "./message/message-handler";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  const socketChannel = socketChannelCoordinator.init(ws);

  socketChannel.receive("message", (data) =>
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
