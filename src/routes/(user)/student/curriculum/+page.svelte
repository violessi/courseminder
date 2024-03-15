<script lang="ts">
    import { equalTo, get, getDatabase, orderByValue, query, ref } from 'firebase/database';
    import { COURSES } from '$lib/data/courses';
    import { initializeApp } from 'firebase/app';
    import { studentDegree } from '$lib/stores/CurriculumStores';

    const firebaseConfig = {
        apiKey: 'AIzaSyCmwpRzGyoeD-Xuh6Cuh1Agbsxw31Uekhk',
        authDomain: 'courseminder-dev.firebaseapp.com',
        databaseURL: 'https://courseminder-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'courseminder-dev',
        storageBucket: 'courseminder-dev.appspot.com',
        messagingSenderId: '274860730108',
        appId: '1:274860730108:web:b7f706a51ee7a79dbd1979',
        measurementId: 'G-1T6H3BFHRR',
    };

    // Initialize Firebase and get database
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // NOTE: currently unused
    // let studentnumber;
    // studentId.subscribe((value) => {
    //     studentnumber = value;
    // });

    $: courses = COURSES[$studentDegree];

    let showPopup = false;
    let selectedCourse = '';
    let courseTitle = '';
    let courseDescription = '';
    let numUnits = '';
    let prerequisites = '';
    let corequisites = '';

    async function getCourseKey(course: string) {
        const q = query(ref(db, 'courseMap'), orderByValue(), equalTo(course));
        const snapshot = await get(q);
        if (snapshot.exists()) {
            let courseKey;
            snapshot.forEach((childSnapshot) => {
                console.log('Child found');
                courseKey = childSnapshot.key;
            });
            return courseKey;
        }
        console.log('No matching courses.');
    }

    async function getCourseData(courseKey: string | undefined) {
        if (courseKey === null) {
            console.log('courseKey is null');
            return;
        }
        const courseRef = ref(db, `courses/${courseKey}`);
        const snapshot = await get(courseRef);
        if (snapshot.exists()) {
            const courseData = snapshot.val();
            ({ selectedCourse, courseTitle, courseDescription, numUnits, prerequisites, corequisites } = courseData);
        } else {
            console.log('No data available');
        }
    }

    async function showCoursePopup(course: string) {
        selectedCourse = course;
        showPopup = true;
        const courseKey: string | undefined = await getCourseKey(course);
        getCourseData(courseKey);
    }

    function closePopup() {
        showPopup = false;
    }

    // NOTE: currently unused
    // async function makeCourseDirectory() {
    //     const courseRef = ref(db, `courses`);
    //     for (let i = 0; i < courses.length; i++) {
    //         const snapshot = await get(child(courseRef, courses[i]));
    //         let courseKey;
    //         if (!snapshot.exists()) {
    //             let courseData = {
    //                 course: courses[i],
    //                 title: courseTitle,
    //                 desc: courseDescription,
    //                 numUnits: numUnits,
    //                 prereq: prerequisites,
    //                 coreq: corequisites,
    //             };
    //             const newCourseRef = push(courseRef, courseData);
    //             courseKey = newCourseRef.key;
    //             const mapRef = ref(db, 'courseMap/' + courseKey);
    //             set(mapRef, courses[i]);
    //         }
    //     }
    // }

    // NOTE: currently unused
    // async function deleteCollection(collectionPath: string) {
    //     const courseref = ref(db, collectionPath);
    //     await set(courseref, null);
    // }
</script>

<div>
    <div class="flex-row grid grid-cols-4 p-2 grid-rows-5 gap-4 content-center">
        {#each courses as course (course)}
            <button on:click={() => showCoursePopup(course)} class="bg-secondary-500 rounded-lg p-1.5 text-sm"
                >{course}</button
            >
        {/each}
    </div>

    {#if showPopup}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-4 rounded left-7 w-1/2 items-center justify-center">
                <h2 class="text-emerald-900 text-xl font-bold mb-2">{selectedCourse}</h2>
                <div class="flex-column">
                    <p class="text-emerald-900"><strong>Course Title:</strong> {courseTitle}</p>
                    <p class="text-emerald-900"><strong>Course Description:</strong> {courseDescription}</p>
                    <p class="text-emerald-900"><strong>Number of Units:</strong> {numUnits}</p>
                    <p class="text-emerald-900"><strong>Prerequisites:</strong> {prerequisites}</p>
                    <p class="text-emerald-900"><strong>Corequisites:</strong> {corequisites}</p>
                </div>
                <button on:click={closePopup} class="bg-red-500 text-white rounded px-2 py-1">Close</button>
            </div>
        </div>
    {/if}
</div>
