<script>
    import Card from '$lib/components/Card.svelte';
    import { IconPlus } from '@tabler/icons-svelte';
    import { isOverlayOpen } from '$lib/stores/OverlayStore.js';
    import Overlay from '$lib/components/Overlay.svelte';

    let totUnits = 0;
    let GWA = 0.0;
    let latinHonors =
        GWA >= 1.2 ? 'Summa Cum \n Laude' : GWA >= 1.45 ? 'Magna Cum Laude' : GWA >= 1.75 ? 'Cum Laude' : 'None';

    const data = [
        {
            sem: 'First Semester',
            year: '2022-2023',
            units: 18,
            gwa: 1.25,
        },
        {
            sem: 'Second Semester',
            year: '2022-2023',
            units: 21,
            gwa: 1.5,
        },
        {
            sem: 'First Semester',
            year: '2023-2024',
            units: 15,
            gwa: 1.75,
        },
        {
            sem: 'Second Semester',
            year: '2023-2024',
            units: 12,
            gwa: 1.0,
        },
        {
            sem: 'First Semester',
            year: '2024-2025',
            units: 18,
            gwa: 1.25,
        },
        {
            sem: 'Second Semester',
            year: '2024-2025',
            units: 21,
            gwa: 1.5,
        },
        {
            sem: 'First Semester',
            year: '2025-2026',
            units: 15,
            gwa: 1.75,
        },
        {
            sem: 'Second Semester',
            year: '2025-2026',
            units: 12,
            gwa: 1.0,
        },
    ];
</script>

{#if $isOverlayOpen}
    <Overlay />
{/if}

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">View Grades</div>
        <button
            type="button"
            class="btn bg-secondary-400 text-white rounded-xl"
            on:click={() => {
                isOverlayOpen.set(true);
            }}
        >
            <IconPlus />
            <span class="text-lg">Add Semester</span>
        </button>
    </div>

    <div class="bg-primary-300 px-10 py-6 rounded-xl flex justify-between font-bold">
        <div class="flex items-center gap-2">
            <div class="text-2xl text-tertiary-700">Total<br />Units</div>
            <div class="text-4xl text-tertiary-900">{totUnits} units</div>
        </div>
        <div class="flex items-center gap-2">
            <div class="text-2xl text-tertiary-700">GWA</div>
            <div class="text-4xl text-tertiary-900">{GWA}</div>
        </div>
        <div class="flex items-center gap-2">
            <div class="text-2xl text-tertiary-700">Latin<br />Honors</div>
            <div class="text-4xl text-tertiary-900">{latinHonors}</div>
        </div>
    </div>

    <div class="grid grid-flow-col">
        {#each data as item}
            <div>{item.gwa}</div>
        {/each}
    </div>
</div>
