<script lang="ts">
    // TODO: implement file inventory upload for vendor_operator USER_ROLE[]
    export let inventory = [];
    const gridItems = [...new Array(5)].map(() => new Array(5).fill(0));
    const labels = Array.from(Array(5))
        .map((_, i) => i + 65)
        .map((ch) => String.fromCharCode(ch));

    function attachLabelsToInventory() {
        for (const i in gridItems) {
            const item = gridItems[i];
            const label = labels[i];
            for (const j in item) {
                item[j] = `${label}${j}`;
            }
        }
        return inventory;
    }
    attachLabelsToInventory();
</script>

<div class="VMItems--grid-container">
    {#each gridItems as item}
        {#each item as i}
            <div class="Item">
                <div class="Item--display" />
                <div class="Item--label">
                    {i}
                </div>
            </div>
        {/each}
    {/each}
</div>

<style>
    :root {
        --primary-font: Arial, Helvetica, sans-serif;
        --display-bg: azure;
        --label-bg: lavenderblush;
        --label-font-color: darkslategray;
    }
    .VMItems--grid-container {
        height: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }
    .Item {
        display: flex;
        flex-direction: column;
        outline: 1px solid #f1f1f1;
    }
    .Item--display {
        height: 75%;
        background-color: var(--display-bg);
    }
    .Item--label {
        background-color: var(--label-bg);
        color: var(--label-font-color);
        font-family: var(--primary-font);
        font-size: 12px;
        font-weight: bold;
    }
</style>
