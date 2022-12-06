import { inventoryCoordinator } from "./inventory-coordinator";
import { SocketChannel, Dispatch } from "./socket-channel";

export function messageHandler(socketChannel: SocketChannel, data: string) {
  const dispatch: Dispatch = JSON.parse(data);
  const invtCoordinator = inventoryCoordinator.init();

  switch (dispatch.type) {
    case "fetch_inventory":
      socketChannel.dispatch({
        channel: "inventory",
        type: "receive_inventory",
        data: invtCoordinator.get(),
      });
      break;
    case "keycode_selected":
      // check for item in inventory
      const [row, col]: number[][] = dispatch.data;

      console.log("t: ", row, col);

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
