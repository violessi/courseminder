<script lang="ts">
    // import { IconPlus } from '@tabler/icons-svelte';
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
    import { SemesterStore } from '$lib/stores/SemesterStores';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    const semId = $page.params.semester;
    $: ({ id, details, subjects } = SemesterStore.getSem(semId));
    $: ({ sem, year, gwa, units } = details);

    function getTable(): TableSource {
        return {
            head: ['Class', 'Grade', 'Untis'],
            body: tableMapperValues(subjects, ['className', 'grade', 'units']),
            meta: tableMapperValues(subjects, ['className', 'grade', 'units']),
        };
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
                    <div class="text-tertiary-900 font-bold text-4xl">GWA: {gwa}</div>
                    <div class="text-tertiary-900 font-bold text-4xl">Units: {units}</div>
                </div>
            </div>
        </div>
    </div>
</div>
