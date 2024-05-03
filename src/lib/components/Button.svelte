<script lang="ts">
    export let style = '';
</script>

<button type="button" class={`btn  text-lg rounded-xl ${style}`} on:click>
    <slot />
</button>
