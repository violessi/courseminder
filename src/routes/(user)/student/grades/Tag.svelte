<script lang="ts">
    export let label: string;
    export let value: string | number;
</script>

<div class="flex items-center gap-4 font-bold">
    <div class="text-2xl text-tertiary-700">{label}</div>
    <div class="text-4xl text-tertiary-900">{value}</div>
</div>
