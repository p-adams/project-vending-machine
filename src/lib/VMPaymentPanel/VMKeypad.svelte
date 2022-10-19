<script lang="ts">
  import store from "../store/vmStore";
  import { CLEAR_KEY, CONFIRM_KEY, KEYS, validate } from "./vmKeypadUtils";
  let isMagnified = false;
  let hasError = false;
  let keys = [];

  function registerKey(key) {
    if (key === CLEAR_KEY) {
      hasError = false;
      keys = [];
      return;
    }

    if (!keys.includes(key) && keys.length < 2) {
      keys = [...keys, key];
    }

    const selectedKeyStr = [...keys].join("");

    if (keys.length === 2 && key === CONFIRM_KEY) {
      if (validate(selectedKeyStr)) {
        store.setSelectedKey(selectedKeyStr);
        keys = [];
        hasError = false;
        return;
      } else {
        hasError = true;
        keys = [];
      }
    }
  }

  $: keyStr = !hasError
    ? [...keys]
        .filter((key) => key !== CLEAR_KEY && key !== CONFIRM_KEY)
        .join("")
    : "ERROR";
</script>

<div class={`VMKeypad ${isMagnified ? "Magnify" : ""}`}>
  <input bind:value={keyStr} />
  <div class={`Keypad`}>
    {#each KEYS as key}
      <button on:click={() => registerKey(key)} disabled={key === null}
        >{key ?? ""}</button
      >
    {/each}
  </div>
</div>

<style>
  .VMKeypad {
    display: flex;
    flex-direction: column;
    width: 100px;
  }

  .VMKeypad.Magnify {
    position: absolute;
    left: 50px;
  }

  input {
    margin-bottom: 10px;
  }
  .Keypad {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .Keypad button {
    color: white;
    font-weight: 700;
    background-color: #42413c2e;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 3px;
  }
</style>
