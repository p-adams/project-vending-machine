<script lang="ts">
  import VmKeypad from "./VMKeypad.svelte";
</script>

<aside class="Pay">
  <VmKeypad />
</aside>

<style>
  .Pay {
    position: relative;
    grid-area: pay;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
