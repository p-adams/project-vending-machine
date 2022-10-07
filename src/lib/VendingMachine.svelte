<script lang="ts">
  import type { InventoryItems } from "src/socket";
  import { onMount, afterUpdate } from "svelte";
  import VMItems from "./VMItems.svelte";

  export let inventory: InventoryItems;

  afterUpdate(() => {
    console.log(inventory);
  });
</script>

<div class="VM-container">
  <div class="Window">
    <VMItems />
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
