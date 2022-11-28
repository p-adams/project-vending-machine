import { WebSocket } from "ws";
export default class SocketChannel {
  #ws: WebSocket;
  constructor(ws: WebSocket) {
    this.#ws = ws;
  }

  public get ws(): WebSocket {
    return this.#ws;
  }
}
