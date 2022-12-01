import { inventoryCoordinator } from "./inventory-coordinator";
import { SocketChannel } from "./socket-channel";

export function messageHandler(socketChannel: SocketChannel, data: string) {
  const dataObj = JSON.parse(data);
  switch (dataObj.type) {
    case "fetch_inventory":
      const inventory = inventoryCoordinator.init();
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
