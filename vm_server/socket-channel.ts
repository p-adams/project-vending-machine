import { WebSocket } from "ws";
export default class SocketChannel {
  #ws: WebSocket;
  constructor(ws: WebSocket) {
    this.#ws = ws;
  }

  public get ws(): WebSocket {
    return this.#ws;
  }

  public receive(event = "message", handler: (d: string) => void) {
    this.ws.on(event, (data: string) => handler(data));
  }

  public dispatch(data: any) {
    this.ws.send(data);
  }
}
