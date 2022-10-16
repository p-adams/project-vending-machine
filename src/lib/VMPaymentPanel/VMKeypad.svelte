<script lang="ts">
  import store from "../vmStore";
  import { CLEAR_KEY, KEYS, validate } from "./vmKeypadUtils";

  let keys = [];
  let isProcessingKeycode = false;

  function registerKey(key) {
    if (key === CLEAR_KEY) {
      keys = [];
      return;
    }
    if (!keys.includes(key) && keys.length < 2) {
      keys = [...keys, key];
    }

    const kStr = [...keys].join("");
    if (keys.length === 2) {
      if (validate(kStr)) {
        store.setSelectedKey(kStr);
        isProcessingKeycode = true;
        // mock async process
        processKeycode().then((res) => {
          if (res === "transaction_complete") {
            isProcessingKeycode = false;
            keys = [];
          }
        });
      } else {
        // TODO: handle error state
        console.log("VALIDATION_ERROR");
        keys = [];
      }
    }
  }

  function processKeycode() {
    return new Promise((res) => {
      setTimeout(() => {
        res("transaction_complete");
      }, 3000);
    });
  }

  $: keyStr = [...keys].join("");
</script>

<input bind:value={keyStr} />
<div class="Keypad">
  {#each KEYS as key}
    <button on:click={() => registerKey(key)} disabled={isProcessingKeycode}
      >{key}</button
    >
  {/each}
</div>

<style>
  input {
    margin-bottom: 10px;
  }
  .Keypad {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
</style>
