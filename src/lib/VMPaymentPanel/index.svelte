<script lang="ts">
  import VmBillAcceptor from "./VMBillAcceptor.svelte";
  import VmCardReader from "./VMCardReader.svelte";
  import VmCoinAcceptor from "./VMCoinAcceptor.svelte";
  import VmKeypad from "./VMKeypad.svelte";
</script>

<aside class="Pay">
  <VmKeypad />
  <!-- TODO: implement first 
  <VmCardReader />
  <VmBillAcceptor />
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
