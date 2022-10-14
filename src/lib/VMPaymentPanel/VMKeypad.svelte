<script lang="ts">
  let input = "";
  let keys = [];

  function registerKey(e) {
    e.stopPropagation();
    const key = e.target.innerText;
    if (key === "clear") {
      keys = [];
      return;
    }
    // TODO: validation
    if (!keys.includes(key)) {
      keys = [...keys, key];
    }
  }
  $: keyStr = keys.join("");
</script>

<input bind:value={keyStr} />
<div class="Keypad" on:click={(e) => registerKey(e)}>
  <button>a</button>
  <button>1</button>
  <button>2</button>
  <button>b</button>
  <button>3</button>
  <button>4</button>
  <button>c</button>
  <button>5</button>
  <button>6</button>
  <button>d</button>
  <button>7</button>
  <button>8</button>
  <button>e</button>
  <button>9</button>
  <button>0</button>
  <button />
  <button>clear</button>
  <button />
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
