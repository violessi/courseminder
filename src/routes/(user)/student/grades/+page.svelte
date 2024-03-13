<script lang="ts">
    import GradeCard from '$lib/components/GradeCard.svelte';
    import { SemesterStore } from '$lib/stores/SemesterStores';
    import { SemDetails, SemType } from '$lib/models/types';
    import { pick, safeParse, string } from 'valibot';

    let totUnits: number = 0;
    let GWA: number = 0.0;

    const latinHonors: string =
        GWA <= 1.2 ? 'Summa Cum Laude' : GWA <= 1.45 ? 'Magna Cum Laude' : GWA <= 1.75 ? 'Cum Laude' : 'None';

    function addSem(): void {
        const data = {
            sem: SemType.first,
            year: '2021-2022',
        };

        SemesterStore.add(data);
    }

    $: data = $SemesterStore;
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">View Grades</div>
        <button type="button" class="btn bg-secondary-400 text-white rounded-xl" on:click={() => addSem()}>
            <!-- <IconPlus /> -->
            <span class="text-lg">Add Semester</span>
        </button>
    </div>

    <div
        class="bg-surface-300 py-6 rounded-xl flex justify-center font-bold border border-tertiary-300 gap-10 [&>div]:flex [&>div]:items-center [&>div]:gap-4"
    >
        <div>
            <div class="text-2xl text-tertiary-700">Total<br />Units</div>
            <div class="text-4xl text-tertiary-900">{totUnits} units</div>
        </div>
        <div>
            <div class="text-2xl text-tertiary-700">GWA</div>
            <div class="text-4xl text-tertiary-900">{GWA}</div>
        </div>
        <div>
            <div class="text-2xl text-tertiary-700">Latin<br />Honors</div>
            <div class="text-4xl text-tertiary-900">{latinHonors}</div>
        </div>
    </div>

    <!-- render SemStore -->
    <div class="grid grid-cols-4 grid-flow-row-dense gap-10">
        {#each $SemesterStore as sem}
            <GradeCard data={sem} />
        {/each}
    </div>
</div>
