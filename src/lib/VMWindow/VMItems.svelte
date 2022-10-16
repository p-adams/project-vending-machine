<script lang="ts">
  // TODO: implement file inventory upload for vendor_operator USER_ROLE[]
  import { afterUpdate, tick } from "svelte";
  import store from "../store/vmStore";
  import type { InventoryItem } from "src/lib/store/inventoryStore";
  export let inventory: InventoryItem[][] = null;
  let selectedKeyCode = null;
  afterUpdate(async () => {
    await tick();
    store.subscribe((key) => (selectedKeyCode = key?.selected_keycode));
  });
</script>

<div class="VMItems--grid-container">
  {#each inventory as item}
    {#each item as i}
      <div class={`Item ${selectedKeyCode === i.label ? "Active" : ""}`}>
        <div class="Item--display">
          {i.name ?? ""}
          <span class="Price">{i.price ?? "--"}</span>
        </div>
        <div class="Item--label">
          {i.label ?? i}
        </div>
      </div>
    {/each}
  {/each}
</div>

<style>
  :root {
    --primary-font: Arial, Helvetica, sans-serif;
    --display-bg: azure;
    --label-bg: lavenderblush;
    --label-font-color: darkslategray;
  }
  .VMItems--grid-container {
    height: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
  .Item {
    display: flex;
    flex-direction: column;
    outline: 1px solid #f1f1f1;
  }
  .Item.Active {
    outline: 3px solid cornflowerblue;
  }
  .Item--display {
    height: 75%;
    color: black;
    background-color: var(--display-bg);
    font-size: small;
  }
  .Item--label {
    background-color: var(--label-bg);
    color: var(--label-font-color);
    font-family: var(--primary-font);
    font-size: smaller;
    font-weight: bold;
  }
  .Price::before {
    font-size: xx-small;
    content: "$";
  }
</style>
