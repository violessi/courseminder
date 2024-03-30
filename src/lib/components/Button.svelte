<script lang="ts">
    export let style = '';
</script>

<button type="button" class={`btn bg-secondary-400 text-lg rounded-xl ${style}`} on:click>
    <slot />
</button>
