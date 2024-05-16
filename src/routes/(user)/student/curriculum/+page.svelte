<script lang="ts">
    import { writable } from 'svelte/store';
    import { SvelteFlow, type Node, type Edge } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/style.css';
    import { csInitialNodes, csInitialEdges } from '$lib/data/csNodes';
    import { ceInitialNodes, ceInitialEdges } from '$lib/data/ceNodes';
    import CustomNode from './CustomNode.svelte';
    import { getCourseData, getCourseKey } from '$lib/firebase/database';
    import { COURSES, COURSESTATUS } from '$lib/data/courses';
    import { type Course, type CourseStatus, type SpecificCourseStatus } from '$lib/models/types';
    import Popup from './Popup.svelte';
    import LegendBox from '$lib/components/LegendBox.svelte';
    import { studentId, studentDegree, statusData } from '$lib/stores/CurriculumStores';
    import { db } from '$lib/firebase/client';
    import { set, get, ref } from 'firebase/database';

    // FIXME: we need to initialize firebase at the root level
    import { initFirebase } from '$lib/firebase/client';
    initFirebase();

    // fetch the courses for the student
    $: courses = COURSES[$studentDegree];
    $: status = COURSESTATUS[$studentDegree];
    $: statusData.set(status);

    const reference = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`);
    get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                status = snapshot.val();
            }
        })
        .catch((e) => {
            console.error(e);
        });

    function updateCourseStatus(course: string) {
        return new Promise((resolve, reject) => {
            console.log(`Updating course status`);
            let currStatus = '';
            get(reference)
                .then((snapshot) => {
                    currStatus = snapshot.child(course).val();
                    if (currStatus == 'Taking') {
                        status[course] = 'To Take';
                        console.log('From Taking To Take');
                    } else if (currStatus == 'To Take') {
                        status[course] = 'Not Taken';
                        console.log('From To Take To Not Taken');
                    } else if (currStatus == 'Not Taken') {
                        status[course] = 'Taken';
                        console.log('From Not Taken To Taken');
                    } else if (currStatus == 'Taken') {
                        status[course] = 'Taking';
                        console.log('From Taken To Taking');
                    }
                    resolve(status[course]);
                    set(reference, status);
                })
                .catch(reject);
        });
    }

    function handleUpdateCourseStatus(course: string) {
        updateCourseStatus(course)
            .then((newStatus) => {
                console.log(`Updated status of ${course} to ${newStatus}`);
                return newStatus;
            })
            .catch((e) => {
                console.error(e);
            });
    }

    const nodes = writable([]);
    const edges = writable([]);

    $: {
        if ($studentDegree === 'Computer Science') {
            nodes.set(csInitialNodes);
            edges.set(csInitialEdges);
        } else if ($studentDegree === 'Civil Engineering') {
            nodes.set(ceInitialNodes);
            edges.set(ceInitialEdges);
        }
    }

    const nodeTypes = {
        custom: CustomNode,
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
        seeCourseData = !seeCourseData;
        console.log(`change mode to seeCourseData: ${seeCourseData}`);
        if (seeCourseData) {
            console.log(`Updating course status`);
            const courseStatusRef = ref(db, `/courseStatus/${$studentDegree}/${$studentId}`);
            set(courseStatusRef, status);
        }
    }

    function handleNodeClick({ detail: { node } }) {
        const nodeId = node.id;
        if (seeCourseData) {
            showCoursePopup(nodeId);
        } else {
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
    <SvelteFlow {nodes} {nodeTypes} {edges} fitView class="bg-surface-500" on:nodeclick={handleNodeClick}></SvelteFlow>

    {#if showPopup}
        <Popup {selectedCourse} {courseData} bind:showPopup />
    {/if}
</div>
