<script lang="ts">
  import type { InventoryItems } from "src/socket";
  import { stockVMWindow } from "../vmUtils";
  import VMItems from "./VMWindow/VMItems.svelte";
  import VMWindow from "./VMWindow/index.svelte";
  import VMPaymentPanel from "./VMPaymentPanel/index.svelte";
  export let inventory: InventoryItems;
</script>

<div class="VM-container">
  <VMWindow>
    <VMItems inventory={stockVMWindow(inventory)} />
  </VMWindow>
  <VMPaymentPanel />
  <!-- TODO: move to component lib -->
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

  .Dispense {
    grid-area: dispense;
  }

  .Return {
    grid-area: return;
  }
</style>
