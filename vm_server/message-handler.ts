import { inventoryCoordinator } from "./inventory-coordinator";
import { SocketChannel } from "./socket-channel";

export function messageHandler(socketChannel: SocketChannel, data: string) {
  const dataObj = JSON.parse(data);
  const invtCoordinator = inventoryCoordinator.init();

  switch (dataObj.type) {
    case "fetch_inventory":
      socketChannel.dispatch({
        channel: "inventory",
        type: "receive_inventory",
        data: invtCoordinator.get(),
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
