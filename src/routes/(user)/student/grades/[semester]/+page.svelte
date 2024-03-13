<script lang="ts">
    // import { IconPlus } from '@tabler/icons-svelte';
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
    import { SemesterStore } from '$lib/stores/SemesterStores';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import AddGrade from '$lib/components/AddGrade.svelte';

    const modalStore = getModalStore();

    const semId = $page.params.semester;
    $: ({ id, details, subjects } = SemesterStore.getSem(semId));
    $: ({ sem, year, gwa, units } = details);

    function getTable(): TableSource {
        return {
            head: ['Class', 'Grade', 'Units'],
            body: tableMapperValues(subjects, ['className', 'grade', 'units']),
            meta: tableMapperValues(subjects, ['className', 'grade', 'units']),
        };
    }

    function addGrade(className: string, grade: number, units: number): void {
        const data = {
            className: className,
            grade: grade,
            units: units,
        };
        SemesterStore.addsubject(id, data);
    }
    $: data = $SemesterStore;

    function inputGrade(): void {
        const c: ModalComponent = { ref: AddGrade };
        const modal: ModalSettings = {
            type: 'component',
            component: c,
            title: 'Add New Class',
            response: (r) => {
                addGrade(r.className, r.grade, r.units);
            },
        };
        modalStore.trigger(modal);
    }
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">{sem}</div>
        <div class="text-tertiary-900 font-bold text-4xl">AY {year}</div>
    </div>

    <div class="gap-10">
        <div
            class="bg-primary-300 px-10 py-6 space-x-7 rounded-xl font-bold border border-tertiary-300 grid grid-cols-3 gap-5"
        >
            <button
                type="button"
                class="btn bg-primary-500 text-secondary-500 rounded-xl border border-tertiary-300 col-start-3 justify-self-end"
                on:click={() => inputGrade()}
            >
                <!-- <IconPlus /> -->
                <span class="text-lg">Add Class</span>
            </button>
            <div class="col-span-3">
                {#if subjects.length}
                    <Table source={getTable()} />
                {:else}
                    <div class="text-tertiary-900 font-bold text-4xl">No Subjects</div>
                {/if}
            </div>
        </div>

        <div>
            <div class="card variant-filled-primary *: border border-tertiary-300 px-10 py-6 space-x-7 rounded-xl">
                <div class="flex justify-between">
                    <div class="text-tertiary-900 font-bold text-4xl">GWA: {gwa ?? 0}</div>
                    <div class="text-tertiary-900 font-bold text-4xl">Units: {units ?? 0}</div>
                </div>
            </div>
        </div>
    </div>
</div>
