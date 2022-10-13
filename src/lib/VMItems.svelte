<script lang="ts">
  import type { InventoryItems, InventoryItem } from "src/socket";
  import { afterUpdate } from "svelte";
  import { onMount } from "svelte";

  // TODO: implement file inventory upload for vendor_operator USER_ROLE[]
  export let inventory: InventoryItem[][] = null;
  afterUpdate(() => console.log(inventory));
</script>

<div class="VMItems--grid-container">
  {#each inventory as item}
    {#each item as i}
      <div class="Item">
        <div class="Item--display">
          {i.name ?? ""}
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
  .Item--display {
    height: 75%;
    color: black;
    background-color: var(--display-bg);
  }
  .Item--label {
    background-color: var(--label-bg);
    color: var(--label-font-color);
    font-family: var(--primary-font);
    font-size: 12px;
    font-weight: bold;
  }
</style>
