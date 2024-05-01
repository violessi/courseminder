<script lang="ts">
    import { getCourseData, getCourseKey } from '$lib/firebase/database';
    import { COURSES } from '$lib/data/courses';
    import { Course } from '$lib/models/types';
    import Popup from './Popup.svelte';
    import { studentDegree } from '$lib/stores/CurriculumStores';

    // FIXME: we need to initialize firebase at the root level
    import { initFirebase } from '$lib/firebase/client';
    initFirebase();

    // fetch the courses for the student
    $: courses = COURSES[$studentDegree];

    let showPopup = false;
    let selectedCourse: string;
    let courseData: Course;
    let seeCourseData = true;

    async function showCoursePopup(course: string) {
        selectedCourse = course;
        try {
            const courseKey = await getCourseKey(course);
            courseData = await getCourseData(courseKey);
            showPopup = true;
        } catch (e) {
            // TODO: handle errors here
            console.error(e);
            return;
        }
    }

    function changeMode() {
        seeCourseData = !seeCourseData
    }

    // NOTE: Unused functions are found at the bottom of this file
</script>

<div class="flex-row">
    <div class="flex-row grid grid-cols-4 p-2 grid-rows-15 gap-4 content-center">
        {#if courses}
            {#each courses as course}
                {#if seeCourseData}
                    <button on:click={() => showCoursePopup(course)} class="bg-secondary-500 rounded-lg p-1.5 text-sm"
                        >{course}</button
                    >
                {:else}
                    <button class="bg-secondary-500 rounded-lg p-1.5 text-sm"
                        >{course}</button
                    >
                {/if}
            {/each}
        {:else}
            <p>No courses found</p>
        {/if}
    </div>
    <div class="flex-row">
        <button on:click={changeMode} class="bg-secondary-500 rounded-lg p-1.5 text-sm"> Edit Course Progress </button>

    </div>

    {#if showPopup}
        <Popup {selectedCourse} {courseData} bind:showPopup />
    {/if}
</div>

<!-- // NOTE: currently unused
let studentnumber;
studentId.subscribe((value) => {
    studentnumber = value;
});

// NOTE: currently unused
async function makeCourseDirectory() {
    const courseRef = ref(db, `courses`);
    for (let i = 0; i < courses.length; i++) {
        const snapshot = await get(child(courseRef, courses[i]));
        let courseKey;
        if (!snapshot.exists()) {
            let courseData = {
                course: courses[i],
                title: courseTitle,
                desc: courseDescription,
                numUnits: numUnits,
                prereq: prerequisites,
                coreq: corequisites,
            };
            const newCourseRef = push(courseRef, courseData);
            courseKey = newCourseRef.key;
            const mapRef = ref(db, 'courseMap/' + courseKey);
            set(mapRef, courses[i]);
        }
    }
}

// NOTE: currently unused
async function deleteCollection(collectionPath: string) {
    const courseref = ref(db, collectionPath);
    await set(courseref, null);
} -->
