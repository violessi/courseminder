<script lang="ts">
    import * as SemStore from '$lib/stores/SemesterStores';
    import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
    import { computeGWA, computeHonor, computeUnits } from '$lib/functions/helper';
    import { AddSem as AddSemType } from '$lib/models/types';
    import Button from '$lib/components/Button.svelte';
    import GradeCard from '$lib/components/GradeCard.svelte';
    import Tag from './Tag.svelte';
    import { safeParse } from 'valibot';

    const modalStore = getModalStore();
    const semStore = SemStore.get();

    const addNewSemModal: ModalSettings = {
        type: 'component',
        component: 'addsem',
        title: 'Add New Semester',
        response: (r: AddSemType) => {
            const res = safeParse(AddSemType, r);
            if (res.success) semStore.addSemester(res.output);
        },
    };

    function addNewSem() {
        modalStore.trigger(addNewSemModal);
    }

    $: totalUnits = computeUnits($semStore);
    $: GWA = computeGWA($semStore).toFixed(4);
    $: honor = computeHonor(parseFloat(GWA));
    $: console.log($semStore);
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="title-default">View Grades</div>
        <Button on:click={addNewSem} style="bg-secondary-500">Add Semester</Button>
    </div>

    <div class="bg-secondary-500 rounded-xl flex card-section justify-center gap-32">
        <Tag label="Total Units" value={`${totalUnits} units`} />
        <Tag label="GWA" value={GWA} />
        <Tag label="Latin Honor" value={honor} />
    </div>

    <div class="grid grid-cols-4 grid-flow-row-dense gap-10">
        {#each $semStore as sem}
            <GradeCard data={sem} />
        {/each}
    </div>
</div>
