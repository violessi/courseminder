<script lang="ts">
    // import { IconPlus } from '@tabler/icons-svelte';
    import Edit from './Edit.svelte';
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { value } from 'valibot';

    let semester = '1st';
    let year = '2020-2021';

    let grades = [
        { className: 'Math 1', grade: 1.25, units: 3 },
        { className: 'Fil 1', grade: 1.5, units: 3 },
        { className: 'Eng 1', grade: 1.75, units: 3 },
        { className: 'PE 1', grade: 1.0, units: 2 },
        { className: 'NSTP 1', grade: 1.0, units: 3 },
    ];

    const tableSimple: TableSource = {
        // A list of heading labels.
        head: ['Class', 'Grade', 'Untis'],
        // The data visibly shown in your table body UI.
        body: tableMapperValues(grades, ['className', 'grade', 'units']),
        // Optional: The data returned when interactive is enabled and a row is clicked.
        meta: tableMapperValues(grades, ['className', 'grade', 'units']),
    };

    let totUnits = 0;
    let GWA = 0.0;

    grades.forEach((grade) => {
        totUnits += grade.units;
        GWA += grade.grade * grade.units;
    });
    GWA /= totUnits;

    let honors = GWA <= 1.45 ? 'University' : GWA <= 1.75 ? 'College' : 'None';

    function submit(field) {
        return ({ detail: newValue }) => {
            console.log(`updated ${field}, new value is: "${newValue}"`);
        };
    }
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">{semester} Semester</div>
        <Edit bind:value={semester} on:submit={submit('semester')} />
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
            <div class="col-span-3"><Table source={tableSimple} /></div>
        </div>
        <div>
            <div class="card variant-filled-primary *: border border-tertiary-300 px-10 py-6 space-x-7 rounded-xl">
                HELLO
            </div>
        </div>
    </div>
</div>
