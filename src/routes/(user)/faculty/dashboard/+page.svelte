<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import graph from '$lib/assets/samplegraph.png';

    import { initFirebase, db } from '$lib/firebase/client';
    import { ref, get, onValue, set } from 'firebase/database';
    import { facultyDegree, facultyName } from '$lib/stores/CurriculumStores';
    import {
        ListBox,
        ListBoxItem,
        popup,
        type PopupSettings,
        Table,
        type TableSource,
        tableMapperValues,
    } from '@skeletonlabs/skeleton';
    import Calendar from '~icons/tabler/calendar-month';
    import { convertSemID, parseSemester } from '$lib/functions/helper';

    initFirebase();
    
    let degree : string = '';
    facultyDegree.subscribe((value : string) => {
        degree = value.split(' ').slice(2, 4).join(' ');
    });

    let nextSemester = '';
    const nextSemesterRef = ref(db, `courseDemand/${nextSemester}`);
    let courseDemand : Record<string, number> = {};

    onValue(nextSemesterRef, (snapshot: any) => {
        if (snapshot.exists()) {
            nextSemester = snapshot.val()['nextSemester'];
        } else {
            console.log('nextSemesterRef does not exist');
        }

        // Create courseDemandRef and fetch courseDemand here
        let courseDemandRef = ref(db, `courseDemand/${degree}/${nextSemester}`);
        get(courseDemandRef).then((snapshot: any) => {
            if (snapshot.exists()) {
                courseDemand = snapshot.val();
            } else {
                console.log('courseDemandRef does not exist');
                courseDemand = {};  // or set a default value
            }    
        });
    });

    // if there are changes in demand, push data to database
    function pushCourseDemandData(nextSemester : string){
        let courseDemandRef = ref(db, `courseDemand/${degree}/${nextSemester}`);
        set(courseDemandRef, courseDemand);
    }

    const courseStatusRef = ref(db, `courseStatus/${degree}`);
    onValue(courseStatusRef, (snapshot: any) => {
        courseDemand = {};
        const data = snapshot.val();
        for (let studentnumber in data){
            for (let course in data[studentnumber]){
                if (data[studentnumber][course] == 'To Take'){
                    courseDemand[course] = courseDemand[course] ? courseDemand[course] + 1 : 1;
                }
            }
        }
        if (nextSemester != ''){
            pushCourseDemandData(nextSemester);
        }
    });

    $: console.log(courseDemand);

    // get list of semesters
    let semesters: string[] = [];
    let courseDemandSemesterRef = ref(db, `courseDemand/${degree}`);
    onValue(courseDemandSemesterRef, (snapshot: any) => {
        const data = snapshot.val();
        for (let semester in data) {
            semesters.push(convertSemID(semester));
        }
        semesters = semesters.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    });

    // load course demand data 
    let courseDemandList : any[] = [];
    async function loadCourseDemandData(semester : string){
        semester = parseSemester(semester);
        console.log(semester);
        console.log(degree);
        let courseDemandRef = ref(db, `courseDemand/${degree}/${semester}`);
        get(courseDemandRef).then((snapshot: any) => {
            if (snapshot.exists()){
                courseDemandList = [];
                for (let course in snapshot.val()){
                    courseDemandList.push({ Class : [course], Demand : snapshot.val()[course]});
                }
            } else {
                console.log('courseDemandRef does not exist');
            }
        });
    }
    
    let comboboxValue: string;
    $: if (comboboxValue) {
        loadCourseDemandData(comboboxValue);
    }

    $: console.log(courseDemandList);

    const popupCombobox: PopupSettings = {
        event: 'click',
        target: 'popupCombobox',
        placement: 'bottom-start',
        closeQuery: '.listbox-item',
    };

    function getTable(demand: any[]): TableSource {
        if (!Array.isArray(demand)) {
            return {
                head: [],
                body: [],
                meta: [],
            };
        }
        return {
            head: ['Class', 'Demand'],
            body: tableMapperValues(demand, ['Class', 'Demand']),
            meta: tableMapperValues(demand, ['Class', 'Demand']),
        };
    }

    function update(_: string[]) {
        const table = getTable(courseDemandList);
        return { table };
    }

    $: ({ table } = update(courseDemandList));

</script>

<!-- <div class="h-full flex flex-col p-10 gap-10">
    <div>
        <div class="title-default-faculty">Welcome, Dr. Masayuki!</div>
        <div class="subtitle-default-faculty pt-2">Department of Computer Science</div>
    </div>
    Cards (see Skeleton for more information)
    <section class="grid grid-cols-1 grid-rows-4 gap-5 h-full">
        Card for Your Classes
        <Card background="bg-primary-300" height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4">
            <div class="font-bold text-error-900 text-xl uppercase">Demand</div>
            nsert graph function here
            <img src={graph} alt="yeah" />
        </Card>
    </section>
</div> -->

<div class="h-full flex flex-col p-10 gap-10">
    <div class="title-default-faculty">Course Demand</div>

    <button class="btn w-2/5 px-2 text-lg bg-primary-50 text-white justify-between" use:popup={popupCombobox}>
        <span class="capitalize flex gap-2 items-center"><Calendar />{comboboxValue ?? 'Select Semester'}</span>
        <span>▼</span>
    </button>

    <div class="card shadow-xl py-2 bg-pink-50 text-black overflow-auto max-h-40" data-popup="popupCombobox">
        <ListBox rounded="rounded-full m-1">
            {#each semesters as semester}
                <ListBoxItem
                    bind:group={comboboxValue}
                    name="semester"
                    value={semester}
                    hover="hover:bg-rose-100"
                    active="bg-rose-200 border-pink-600">{semester}</ListBoxItem
                >
            {/each}
        </ListBox>
    </div>
    {#if table.body.length > 0}
        <Table
            regionBody="bg-rose-100 text-xl"
            regionCell="text-center text-tertiary-900"
            regionHeadCell="bg-primary-50 text-center text-xl font-bold"
            source={table}
        ></Table>
    {:else if !comboboxValue}
        <div class="subtitle-default-faculty text-center">
            Please select a semester to see the demand of each subject.
        </div>
    {:else}
        <div class="subtitle-default-faculty text-center font-bold">No data available.</div>
    {/if}
</div>
