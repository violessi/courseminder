<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import * as SemStore from '$lib/stores/SemesterStores';
    import { computeGWA, computeHonor } from '$lib/functions/helper';
    import { get, getDatabase, ref, set } from 'firebase/database';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { initializeApp } from 'firebase/app';
    import { onMount } from 'svelte';
    import { firebaseConfig } from '$lib/firebase/client';
    import { studentId } from '$lib/stores/CurriculumStores';

    const semStore = SemStore.get();
    let progress: number;

    let studentnumber = '';
    studentId.subscribe((value) => {
        studentnumber = value;
    });

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const reference = ref(db, `students/${studentnumber}`);
    // get student name of logged-in user
    let studentName = '';
    let studentDegree = '';
    get(reference).then((snapshot) => {
        if (snapshot.exists()) {
            studentName = snapshot.val().name;
            studentDegree = snapshot.val().degree;
        } else {
            console.log('No data available');
        }
    });

    const reference2 = ref(db, `courseStatus/Computer Science/${studentnumber}`);
    let promise: any;
    let activeCourses: string[] = [];
    let doneCourses: string[] = [];

    onMount(() => {
        promise = get(reference2).then((snapshot) => {
            if (snapshot.exists()) {
                for (const [key, value] of Object.entries(snapshot.val())) {
                    if (value === 'Taking') {
                        activeCourses.push(key);
                    }
                    if (value === 'Taken') {
                        doneCourses.push(key);
                    }
                }
                progress = Math.round((doneCourses.length / Object.entries(snapshot.val()).length) * 100);
            } else {
                console.log('No data available');
            }
        });
    });
    $: GWA = computeGWA($semStore).toFixed(4);
    $: honor = computeHonor(parseFloat(GWA));
</script>

{#await promise then value}
    <div class="h-full flex flex-col p-10 gap-10">
        <div class="text-tertiary-900">
            <div class="font-bold text-4xl">Welcome, {studentName}!</div>
            <div class="text-2xl pt-2">B.S. {studentDegree}</div>
        </div>
        <!-- Cards (see Skeleton for more information) -->
        <section class="grid grid-cols-2 grid-rows-4 gap-5 h-full">
            <!-- Card for Your Classes -->
            <Card height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4">
                <div class="font-bold text-xl uppercase">Your Classes</div>
                <div class="flex flex-col pt-5 gap-3 text-lg">
                    {#each activeCourses as course}
                        <div class="text-lg self-center">{course}</div>
                    {/each}
                </div>
            </Card>
            <!-- Card for Your Progress -->
            <Card height="row-span-3" flex="flex flex-col" items="items-center gap-10" padding="p-4">
                <div class="font-bold uppercase text-xl">Your Course Progress</div>
                <div class="relative w-72 h-72 mx-auto">
                    <ProgressRadial
                        value={progress ?? 0}
                        stroke={100}
                        meter="stroke-secondary-500"
                        track="stroke-surface-800/30"
                        fill="fill-secondary-900"
                        font={100}
                        width="w-full h-full"
                    ></ProgressRadial>
                    <div class="absolute inset-0 flex items-center justify-center flex-col">
                        <div class="text-5xl text-center text-secondary-900 font-semibold">
                            {progress}%
                        </div>
                        <div class="text-xl text-center">complete</div>
                    </div>
                </div>
            </Card>
            <!-- Card for Current Standing -->
            <Card height="row-span-1" flex="flex flex-col" items="items-center gap-5" padding="p-3">
                <div class="font-bold uppercase text-xl">Your Current Standing</div>
                <div class="text-4xl">{honor}</div>
            </Card>
        </section>
    </div>
{:catch error}
    <p>Something went wrong</p>
{/await}
