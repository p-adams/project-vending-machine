<script lang="ts">
  let keys = [];
  let isProcessingKeycode = false;
  const CLEAR_KEY = "CLEAR";

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
        // TODO: emit message to VMWindow with selection
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

  function validate(keyStr: string) {
    const re = new RegExp("[A-E]+[0-4]");
    return re.test(keyStr);
  }

  $: keyStr = [...keys].join("");
  const KEYS = [
    "A",
    "1",
    "2",
    "B",
    "3",
    "4",
    "C",
    "5",
    "6",
    "D",
    "7",
    "8",
    "E",
    "9",
    "0",
    "",
    CLEAR_KEY,
    "",
  ];
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
