import { WebSocket } from "ws";

export interface Dispatch {
  channel: string;
  type: string;
  data?: any;
}

export interface SocketChannel {
  ws: WebSocket | null;
  init: (ws: WebSocket) => SocketChannel;
  receive: (event: string, handler: (d: string) => void) => void;
  dispatch: (data: Dispatch) => void;
}

const SocketChannel: SocketChannel = {
  init: function (ws: WebSocket) {
    this.ws = ws;
    return this;
  },
  receive: function (event = "message", handler: (d: string) => void) {
    this.ws?.on(event, (data: string) => handler(data));
  },
  dispatch: function (data: Dispatch) {
    const dataStr = JSON.stringify(data);
    this.ws?.send(dataStr);
  },
  ws: null,
};

export const socketChannel: SocketChannel = Object.create(SocketChannel);
