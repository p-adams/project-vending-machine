<script lang="ts">
</script>

<div class="CardReader">
  <div class="Inner" on:click={() => console.log("process card")} />
</div>

<style>
  .CardReader {
    outline: 1px solid gray;
    margin-top: 10px;
    height: 75px;
  }
  .Inner {
    height: 55px;
    background-color: lightgray;
    margin: 10px 10px 10px 10px;
  }
</style>
