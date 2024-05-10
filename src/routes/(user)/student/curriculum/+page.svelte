<!-- <script lang="ts">
    import { getCourseData, getCourseKey } from '$lib/firebase/database';
    import { COURSES, COURSESTATUS } from '$lib/data/courses';
    import { Course } from '$lib/models/types';
    import LegendBox from '$lib/components/LegendBox.svelte';
    import Popup from './Popup.svelte';
    import { studentId, studentDegree } from '$lib/stores/CurriculumStores';
    import { db } from '$lib/firebase/client'
    import { set, get, ref } from 'firebase/database';

    // FIXME: we need to initialize firebase at the root level
    import { initFirebase } from '$lib/firebase/client';
    initFirebase();

    // fetch the courses for the student
    $: courses = COURSES[$studentDegree];
    $: status = COURSESTATUS[$studentDegree];

    const reference = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`)
    get(reference).then((snapshot) => {
        if (snapshot.exists()) {
            status = snapshot.val();
        }
    }).catch((e) => {
        console.error(e);
    });

    function updateCourseStatus(course : string){
        return new Promise((resolve, reject) => {
            console.log(`Updating course status`);
            let currStatus = '';
            get(reference).then((snapshot) => {
                currStatus = snapshot.child(course).val()
                if (currStatus == 'Taking') {
                    status[course] = 'To Take';
                    console.log('From Taking To Take');
                }
                else if (currStatus == 'To Take') {
                    status[course] = 'Not Taken';
                    console.log('From To Take To Not Taken');
                }
                else if (currStatus == 'Not Taken') {
                    status[course] = 'Taken';
                    console.log('From Not Taken To Taken');
                }
                else if (currStatus == 'Taken') {
                    status[course] = 'Taking';
                    console.log('From Taken To Taking');
                }
                resolve(status[course]);
                set(reference, status);
            }).catch(reject);
        });
    }

    function handleUpdateCourseStatus(course: string) {
        updateCourseStatus(course).then((newStatus) => {
            console.log(`Updated status of ${course} to ${newStatus}`);
            return newStatus;
        }).catch((e) => {
            console.error(e);
        });
    }
    
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
        console.log(`change mode to seeCourseData: ${seeCourseData}`)
        if (seeCourseData) {
            console.log(`Updating course status`);
            const courseStatusRef = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`)
            set(courseStatusRef, status);
        }
    }

    // NOTE: Unused functions are found at the bottom of this file
</script>

<div class="flex-row">
    <div class="flex-row grid grid-cols-4 p-2 grid-rows-15 gap-4 content-center">
        {#if courses}
            {#each courses as course}
                {#if seeCourseData}
                    {#if status[course] == 'Taken'}
                        <button on:click={() => showCoursePopup(course)} class="bg-secondary-500 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'Not Taken'}
                        <button on:click={() => showCoursePopup(course)} class="bg-primary-900 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'Taking'}
                        <button on:click={() => showCoursePopup(course)} class="bg-secondary-700 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'To Take'}
                        <button on:click={() => showCoursePopup(course)} class="bg-primary-50 rounded-lg p-1.5 text-sm">{course}</button>
                    {/if}
                {:else}
                    {#if status[course] == 'Taken'}
                        <button on:click={() => handleUpdateCourseStatus(course)} class="bg-secondary-500 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'Not Taken'}
                        <button on:click={() => handleUpdateCourseStatus(course)} class="bg-primary-900 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'Taking'}
                        <button on:click={() => handleUpdateCourseStatus(course)} class="bg-secondary-700 rounded-lg p-1.5 text-sm">{course}</button>
                    {:else if status[course] == 'To Take'}
                        <button on:click={() => handleUpdateCourseStatus(course)} class="bg-primary-50 rounded-lg p-1.5 text-sm">{course}</button>
                    {/if}
                {/if}
            {/each}
        {:else}
            <p>No courses found</p>
        {/if}
    </div>
    <div class="flex justify-center items-center sticky bottom-5 gap-5">
        {#if seeCourseData}
            <button on:click={changeMode} class="bg-secondary-500 rounded-lg p-1.5 text-sm"> Edit Course Progress </button>
        {:else}
            <button on:click={changeMode} class="bg-secondary-500 rounded-lg p-1.5 text-sm"> View Course Data </button>
        {/if}
        <LegendBox></LegendBox>

    </div>
    {#if showPopup}
        <Popup {selectedCourse} {courseData} bind:showPopup />
    {/if}
    

</div>
</div> -->

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

<script lang="ts">
    import { writable } from 'svelte/store';
    import { SvelteFlow, type Node, type Edge } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    import { initialNodes, initialEdges } from '$lib/data/nodes-and-edges';
    import CustomNode from './CustomNode.svelte';
    import { getCourseData, getCourseKey } from '$lib/firebase/database';
    import { COURSES, COURSESTATUS } from '$lib/data/courses';
    import { type Course, type CourseStatus, type SpecificCourseStatus } from '$lib/models/types';
    import Popup from './Popup.svelte';
    import LegendBox from '$lib/components/LegendBox.svelte';
    import { studentId, studentDegree, statusData } from '$lib/stores/CurriculumStores';
    import { db } from '$lib/firebase/client'
    import { set, get, ref, child, push } from 'firebase/database';

    // FIXME: we need to initialize firebase at the root level
    import { initFirebase } from '$lib/firebase/client';
    initFirebase();

    // fetch the courses for the student
    $: courses = COURSES[$studentDegree];
    $: status = COURSESTATUS[$studentDegree];
    $: statusData.set(status);

    const reference = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`)
    get(reference).then((snapshot) => {
        if (snapshot.exists()) {
            status = snapshot.val();
        }
    }).catch((e) => {
        console.error(e);
    });

    // let courseTitle = 'blank';
    // let courseDescription = 'blank';
    // let numUnits = 'blank';
    // let prerequisites = 'blank';
    // let corequisites = 'blank';
    
    // console.log(courses);
    // async function makeCourseDirectory() {
    //     for (let i = 0; i < courses.length; i++) {
    //         let MyCourseKey = await getCourseKey(courses[i]);
    //         console.log(MyCourseKey);
    //         const courseRef = ref(db, `courses/${MyCourseKey}`);
    //         const snapshot = await get(courseRef);
    //         if (!snapshot.exists()) {
    //             let courseData = {
    //                 course: courses[i],
    //                 title: courseTitle,
    //                 desc: courseDescription,
    //                 numUnits: numUnits,
    //                 prereq: prerequisites,
    //                 coreq: corequisites,
    //             };
    //             let courseKey;
    //             const newCourseRef = push(ref(db, `courses`), courseData);
    //             courseKey = newCourseRef.key;
    //             const mapRef = ref(db, 'courseMap/' + courseKey);
    //             set(mapRef, courses[i]);
    //         }
    //     }
    // }
    // $: {
    //     if (courses) {
    //         makeCourseDirectory();
    //     }
    // }
    function updateCourseStatus(course : string){
        return new Promise((resolve, reject) => {
            console.log(`Updating course status`);
            let currStatus = '';
            get(reference).then((snapshot) => {
                currStatus = snapshot.child(course).val()
                if (currStatus == 'Taking') {
                    status[course] = 'To Take';
                    console.log('From Taking To Take');
                }
                else if (currStatus == 'To Take') {
                    status[course] = 'Not Taken';
                    console.log('From To Take To Not Taken');
                }
                else if (currStatus == 'Not Taken') {
                    status[course] = 'Taken';
                    console.log('From Not Taken To Taken');
                }
                else if (currStatus == 'Taken') {
                    status[course] = 'Taking';
                    console.log('From Taken To Taking');
                }
                resolve(status[course]);
                set(reference, status);
            }).catch(reject);
        });
    }

    function handleUpdateCourseStatus(course: string) {
        updateCourseStatus(course).then((newStatus) => {
            console.log(`Updated status of ${course} to ${newStatus}`);
            return newStatus;
        }).catch((e) => {
            console.error(e);
        });
    }
  
    const nodes = writable<Node[]>(initialNodes);
    const edges = writable<Edge[]>(initialEdges);
  
    const nodeTypes = {
      custom: CustomNode
    };

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
        console.log(`change mode to seeCourseData: ${seeCourseData}`)
        if (seeCourseData) {
            console.log(`Updating course status`);
            const courseStatusRef = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`)
            set(courseStatusRef, status);
        }
    }

    function handleNodeClick({detail: {node}}){
        const nodeId = node.id;
        if (seeCourseData) {
            showCoursePopup(nodeId);
        }
        else {
            handleUpdateCourseStatus(nodeId);
        }
    }
  </script>

  <div class="flex justify-center items-center sticky bottom-5 gap-5">
        {#if seeCourseData}
            <button on:click={changeMode} class="bg-secondary-500 rounded-lg p-1.5 text-sm"> Edit Course Progress </button>
        {:else}
            <button on:click={changeMode} class="bg-secondary-500 rounded-lg p-1.5 text-sm"> View Course Data </button>
        {/if}
        <LegendBox></LegendBox>

    </div>

  <div style="height:100vh; width:100vw;">
    <SvelteFlow {nodes} {nodeTypes} {edges} fitView class="bg-surface-500" on:nodeclick={handleNodeClick}>
    </SvelteFlow>

    {#if showPopup}
        <Popup {selectedCourse} {courseData} bind:showPopup />
    {/if}   
  </div>
  