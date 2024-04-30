<script lang="ts">
    export let label: string;
    export let value: string | number;

    $: rendered = label.split(' ');
</script>

<div class="flex items-center gap-4 font-bold">
    <div class="text-xl text-surface-600 text-right">
        {#each rendered as word}
            {word}<br />
        {/each}
    </div>
    <div class="text-4xl text-surface-300">{value}</div>
</div>
