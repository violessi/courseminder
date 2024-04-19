<script lang="ts">
    import * as SemStore from '$lib/stores/SemesterStores';
    import {
        type ModalSettings,
        Table,
        type TableSource,
        getModalStore,
        tableMapperValues,
    } from '@skeletonlabs/skeleton';
    import { type Semester, Subject } from '$lib/models/types';
    import { Button } from '$lib/components';
    import { computeHonor } from '$lib/functions/helper';
    import { page } from '$app/stores';

    let semesters =[];
    $: semesters = $semStore;

    const modalStore = getModalStore();
    const semStore = SemStore.get();
    const semId = $page.params.semester;

    const modal: ModalSettings = {
        type: 'component',
        component: 'addgrade',
        title: 'Add New Class',
        response: (r: Subject) => {
            semStore.addSubject(r, semId);
        },
    };

    function getTable(subjects: Subject[]): TableSource {
        if (!Array.isArray(subjects)) {
            return {
                head: [],
                body: [],
                meta: [],
            };
        }
        return {
            // removes Sample Subject from the table
            head: ['Class', 'Grade', 'Units'],
            body: tableMapperValues(subjects.slice(1), ['className', 'grade', 'units']),
            meta: tableMapperValues(subjects.slice(1), ['className', 'grade', 'units']),
        };
    }

    function update(_: Semester[]) {
        const { details, subjects } = semStore.getSem(semId);
        console.log($semStore)
        console.log(details);
        console.log(subjects);
        const table = getTable(subjects);
        return { ...details, table };
    }

    $: ({ gwa, units, sem, table, year } = update($semStore));
    $: scholarship = computeHonor(gwa ?? 0, 'sem');
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between title-default">
        <div>{sem}</div>
        <div>AY {year}</div>
    </div>

    <div class="justify-end flex -mb-6">
        <Button on:click={() => modalStore.trigger(modal)}>Add Class</Button>
    </div>

    <div class="bg-primary-300 justify-around card-section">
        {#if table.body.length > 0}
            <Table source={table} />
        {:else}
            <div class="title-default">No Subjects</div>
        {/if}
    </div>

    <div class="variant-filled-primary card-section">
        <div class="flex justify-between title-default">
            <div>GWA: {parseFloat(gwa?.toFixed(4) ?? '0')}</div>
            <div>Units: {units ?? 0}</div>
            <div>Scholarship: {scholarship}</div>
        </div>
    </div>


    <div class="justify-end flex -mb-6">
        <div class ="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
            <button on:click={() => semStore.removeSemester(semId)}>
                Remove Semester
              </button>
        </div>
    </div>

    
</div>
