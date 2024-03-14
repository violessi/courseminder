<script lang="ts">
    export let background = 'variant-filled-primary';
    export let text = '';
    export let flex = '';
    export let items = '';
    export let height = '';
    export let width = '';
    export let padding = '';
</script>

<div
    class={`${background} ${text} ${flex} ${items} ${height} ${width} ${padding} shadow rounded-xl border border-tertiary-300`}
>
    <slot />
</div>
