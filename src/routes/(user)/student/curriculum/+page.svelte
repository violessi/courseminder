<script lang="ts">
    import { COURSES } from '$lib/data/courses';
    import { Course } from '$lib/models/types';
    import { studentDegree } from '$lib/stores/CurriculumStores';
    import { getCourseData, getCourseKey } from '$lib/firebase/database';

    // FIXME: we need to initialize firebase at the root level
    import { initFirebase } from '$lib/firebase/client';
    initFirebase();

    // fetch the courses for the student
    $: courses = COURSES[$studentDegree];

    let showPopup = false;
    let selectedCourse: string;
    let courseData: Course;

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

    function closePopup() {
        showPopup = false;
    }

    // NOTE: Unused functions are found at the bottom of this file
</script>

<div>
    <div class="flex-row grid grid-cols-4 p-2 grid-rows-5 gap-4 content-center">
        {#if courses}
            {#each courses as course (course)}
                <button on:click={() => showCoursePopup(course)} class="bg-secondary-500 rounded-lg p-1.5 text-sm"
                    >{course}</button
                >
            {/each}
        {/if}
    </div>

    {#if showPopup}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-4 rounded left-7 w-1/2 items-center justify-center">
                <h2 class="text-emerald-900 text-xl font-bold mb-2">{selectedCourse}</h2>
                <div class="flex-column">
                    <p class="text-emerald-900"><strong>Course Title:</strong> {courseData.title}</p>
                    <p class="text-emerald-900">
                        <strong>Course Description:</strong>
                        {courseData.desc}
                    </p>
                    <p class="text-emerald-900"><strong>Number of Units:</strong> {courseData.numUnits}</p>
                    <p class="text-emerald-900"><strong>Prerequisites:</strong> {courseData.prereq}</p>
                    <p class="text-emerald-900"><strong>Corequisites:</strong> {courseData.coreq}</p>
                </div>
                <button on:click={closePopup} class="bg-red-500 text-white rounded px-2 py-1">Close</button>
            </div>
        </div>
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
