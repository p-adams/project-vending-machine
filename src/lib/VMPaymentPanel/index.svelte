<script lang="ts">
  import VmCardReader from "./VMCardReader.svelte";
  // import VmBillAcceptor from "./VMBillAcceptor.svelte";
  // import VmCoinAcceptor from "./VMCoinAcceptor.svelte";
  import VmKeypad from "./VMKeypad.svelte";
</script>

<aside class="Pay">
  <VmKeypad />
  <VmCardReader />
  <!-- <VmBillAcceptor />
  <VmCoinAcceptor /> -->
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
