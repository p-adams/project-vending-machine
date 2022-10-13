<script lang="ts">
  import type { InventoryItems } from "src/socket";
  import { buildVMItemGrid, stockVMWindow } from "../vmUtils";
  import VMItems from "./VMItems.svelte";
  export let inventory: InventoryItems;
</script>

<div class="VM-container">
  <div class="Window">
    <VMItems inventory={stockVMWindow(inventory)} />
  </div>
  <aside class="Pay">pay</aside>
  <div class="Dispense">dispense</div>
  <div class="Return">return</div>
</div>

<style>
  .VM-container {
    height: 600px;
    width: 500px;
    display: grid;
    grid-template-areas:
      "window pay"
      "window pay"
      "dispense return";
  }

  .Window {
    grid-area: window;
    background: lightgray;
    padding: 10px;
  }

  .Pay {
    grid-area: pay;
  }

  .Dispense {
    grid-area: dispense;
  }

  .Return {
    grid-area: return;
  }
</style>
