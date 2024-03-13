<script lang="ts">
    import GradeCard from '$lib/components/GradeCard.svelte';
    // import { IconPlus } from '@tabler/icons-svelte';
    import AddSem from '$lib/components/AddSem.svelte';
    import { SemesterStore } from '$lib/stores/SemesterStores';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    const newSem = {
        id: $SemesterStore.length,
        sem: '',
        year: '',
        units: 0,
        gwa: 0.0,
    };

    let totUnits: number = 0;
    let GWA: number = 0.0;

    const latinHonors: string =
        GWA <= 1.2 ? 'Summa Cum Laude' : GWA <= 1.45 ? 'Magna Cum Laude' : GWA <= 1.75 ? 'Cum Laude' : 'None';

    function addSem(newSem: { id: number; sem: string; year: string; units: number; gwa: number }): void {
        $SemesterStore = [...$SemesterStore, newSem];
        totUnits += newSem.units;
        GWA = (GWA * ($SemesterStore.length + 1) + newSem.gwa) / $SemesterStore.length;
    }

    function inputSem(): void {
        const c: ModalComponent = { ref: AddSem };
        const modal: ModalSettings = {
            type: 'component',
            component: c,
            title: 'Add New Semester',
            response: (r) => {
                const newSem = {
                    id: $SemesterStore.length,
                    sem: r.semester,
                    year: r.year,
                    units: 0,
                    gwa: 0.0,
                };
                // console.log(newSem);
                addSem(newSem);
            },
        };
        modalStore.trigger(modal);
    }
</script>

<!-- {#if $isOverlayOpen}
    <Overlay />
{/if} -->

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">View Grades</div>
        <button type="button" class="btn bg-secondary-400 text-white rounded-xl" on:click={() => addSem(newSem)}>
            <!-- <IconPlus /> -->
            <span class="text-lg">Add Semester</span>
        </button>
    </div>

    <div
        class="bg-surface-300 px-10 py-6 space-x-7 rounded-xl flex justify-center font-bold border border-tertiary-300"
    >
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

    <div class="grid grid-cols-4 grid-flow-row-dense gap-10">
        {#each $SemesterStore as { sem, year, units, gwa }}
            <GradeCard>
                <div>{sem} Semester, AY {year}</div>
                <div>{units} units</div>
                <div class="font-bold text-xl pt-2">GWA: {gwa}</div>
            </GradeCard>
        {/each}
    </div>
</div>
