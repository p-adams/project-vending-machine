<script lang="ts">
</script>

<div class="VM-container">
    <div class="Window">window</div>
    <aside class="Pay">pay</aside>
    <div class="Dispense">dispense</div>
    <div class="Return">return</div>
</div>

<style>
    .VM-container {
        height: 600px;
        width: 500px;
        display: grid;
        grid-template-areas:
            "window pay"
            "window pay"
            "dispense return";
    }

    .Window {
        grid-area: window;

        outline: 1px solid gray;
        background: lightgray;
    }

    .Pay {
        grid-area: pay;
    }

    .Dispense {
        grid-area: dispense;
    }

    .Return {
        grid-area: return;
    }
</style>
