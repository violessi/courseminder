<script lang="ts">
    import type { Course } from '$lib/models/types';

    export let selectedCourse: string;
    export let courseData: Course;
    export let showPopup: boolean;

    $: ({ title, desc, numUnits, prereq, coreq } = courseData);

    if (selectedCourse == 'Physics 711'){
        selectedCourse = 'Physics 71.1';
    }
    else if (selectedCourse == 'Physics 721'){
        selectedCourse = 'Physics 72.1';
    }
    else if (selectedCourse == 'Chem 161'){
        selectedCourse =  'Chem 16.1';
    }

</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded left-7 w-1/2 items-center justify-center">
        <h2 class="text-emerald-900 text-xl font-bold mb-2">{selectedCourse}</h2>
        <div class="flex-column">
            <p class="text-emerald-900"><strong>Course Title:</strong> {title}</p>
            <p class="text-emerald-900">
                <strong>Course Description:</strong>
                {desc}
            </p>
            <p class="text-emerald-900"><strong>Number of Units:</strong> {numUnits}</p>
            <p class="text-emerald-900"><strong>Prerequisites:</strong> {prereq}</p>
            <p class="text-emerald-900"><strong>Corequisites:</strong> {coreq}</p>
        </div>
        <button on:click={() => (showPopup = false)} class="bg-red-500 text-white rounded px-2 py-1">Close</button>
    </div>
</div>
