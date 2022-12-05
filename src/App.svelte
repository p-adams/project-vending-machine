<script lang="ts">
  import { onMount } from "svelte";
  import VendingMachine from "./lib/VendingMachine.svelte";
  import store from "./lib/store";
  let inventory = null;
  onMount(() => {
    store.subcribe((data) => {
      const pData = JSON.parse(String(data));
      switch (pData?.type) {
        case "receive_inventory":
          inventory = pData.data;
          break;
        default:
          break;
      }
    });
  });
</script>

<main>
  <VendingMachine {inventory} />
</main>

<style>
</style>
