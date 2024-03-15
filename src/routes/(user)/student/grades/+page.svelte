<script lang="ts">
    import * as SemStore from '$lib/stores/SemesterStores';
    import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
    import { AddSem as AddSemType } from '$lib/models/types';
    import { computeGWA, computeHonor, computeUnits } from '$lib/functions/helper';
    import GradeCard from '$lib/components/GradeCard.svelte';
    import Tag from './Tag.svelte';

    const modalStore = getModalStore();
    const semStore = SemStore.get();

    const modal: ModalSettings = {
        type: 'component',
        component: 'addsem',
        title: 'Add New Semester',
        response: (r: AddSemType) => {
            semStore.addSemester(r);
        },
    };

    $: totalUnits = computeUnits($semStore);
    $: GWA = parseFloat(computeGWA($semStore).toFixed(4));
    $: honor = computeHonor(GWA);
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">View Grades</div>
        <button type="button" class="btn bg-secondary-400 text-lg" on:click={() => modalStore.trigger(modal)}>
            Add Semester
        </button>
    </div>

    <div class="bg-surface-300 py-6 rounded-xl flex justify-around border border-tertiary-300">
        <Tag label="Total Units" value={`${totalUnits} units`} />
        <Tag label="GWA" value={GWA} />
        <Tag label="Latin Honors" value={honor} />
    </div>

    <div class="grid grid-cols-4 grid-flow-row-dense gap-10">
        {#each $semStore as sem}
            <GradeCard data={sem} />
        {/each}
    </div>
</div>
