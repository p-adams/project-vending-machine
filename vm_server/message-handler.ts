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
      const [row, col]: [number, number] = dispatch.data;
      // process item selection
      // check db, either send the client the item
      // or send -1 indicating out-of-stock
      const selectedItem = inventoryCoordinator.processSelection(row, col);

      socketChannel.dispatch({
        channel: "vm",
        type: "selection_processed",
        data: selectedItem,
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
