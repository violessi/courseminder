<script>
    import { IconPlus } from '@tabler/icons-svelte';

    let semester = '1st';
    let year = '2020-2021';

    let grades = [
        { className: 'Math 1', grade: 1.25, units: 3 },
        { className: 'Fil 1', grade: 1.5, units: 3 },
        { className: 'Eng 1', grade: 1.75, units: 3 },
        { className: 'PE 1', grade: 1.0, units: 2 },
        { className: 'NSTP 1', grade: 1.0, units: 3 },
    ];

    let totUnits = 0;
    let GWA = 0.0;

    grades.forEach((grade) => {
        totUnits += grade.units;
        GWA += grade.grade * grade.units;
    });
    GWA /= totUnits;

    let honors = GWA <= 1.45 ? 'University' : GWA <= 1.75 ? 'College' : 'None';
</script>

<div class="h-full m-10 space-y-10">
    <div class="flex justify-between">
        <div class="text-tertiary-900 font-bold text-4xl">{semester} Semester</div>
        <div class="text-tertiary-900 font-bold text-4xl">AY {year}</div>
    </div>

    <div>
        <div
            class="bg-primary-300 px-10 py-6 space-x-7 rounded-xl font-bold border border-tertiary-300 grid grid-cols-3"
        >
            <button
                type="button"
                class="btn bg-primary-500 text-secondary-500 rounded-xl border border-tertiary-300 col-start-3 justify-self-end"
            >
                <IconPlus />
                <span class="text-lg">Add Class</span>
            </button>

            <div>
                {#each grades as { className, grade, units }}
                    <div class="flex items-center gap-2"></div>
                {/each}
            </div>
        </div>
    </div>
</div>
