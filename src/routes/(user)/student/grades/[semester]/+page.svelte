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
    import Tag from '../Tag.svelte';
    import { page } from '$app/stores';

    let semesters = [];
    $: semesters = $semStore;

    const modalStore = getModalStore();
    const semStore = SemStore.get();
    const semId = $page.params.semester;
    let curr = { className: '', grade: 0, units: 0, id: '' };

    const addClassModal: ModalSettings = {
        type: 'component',
        component: 'addgrade',
        title: 'Add New Class',
        response: (r: Subject) => {
            semStore.addSubject(r, semId);
        },
    };

    const editGradeModal: ModalSettings = {
        type: 'component',
        component: 'editgrade',
        meta: curr,
        response: (r) => {
            if (r[0] == 'remove') {
                semStore.removeSubject(r[1], semId);
            } else if (r[0] == 'edit') {
                semStore.editSubject(r[1], semId);
            }
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
        const table = getTable(subjects);
        return { ...details, table };
    }

    function addClass() {
        modalStore.trigger(addClassModal);
    }

    function editGrade(deets: any) {
        curr.className = deets.detail[0];
        curr.grade = deets.detail[1];
        curr.units = deets.detail[2];
        curr.id = semId;
        modalStore.trigger(editGradeModal);
    }

    $: ({ gwa, units, sem, table, year } = update($semStore));
    $: scholarship = computeHonor(gwa ?? 0, 'sem');
</script>

<div class="h-full m-10 space-y-10">
    <div class="title-default">{sem}, AY {year}</div>

    <div class="flex gap-6 items-center justify-between">
        <div class="bg-secondary-500 rounded-xl flex card-section justify-between gap-10 px-10">
            <Tag label="GWA" value={gwa?.toFixed(4) ?? 0} />
            <Tag label="Units" value={units ?? 0} />
            <Tag label="Scholarship" value={scholarship} />
        </div>
        <Button on:click={addClass} style="bg-secondary-500 h-fit">Add Class</Button>
    </div>

    {#if table.body.length > 0}
        <Table
            regionBody="bg-secondary-300 text-xl"
            regionCell="text-center text-tertiary-900"
            regionHeadCell="bg-secondary-500 text-center text-xl font-bold"
            interactive={true}
            on:selected={(deets) => {
                editGrade(deets);
            }}
            source={table}
        ></Table>
    {:else}
        <div class="title-default text-center p-5 rounded-lg">No Subjects</div>
    {/if}
</div>
