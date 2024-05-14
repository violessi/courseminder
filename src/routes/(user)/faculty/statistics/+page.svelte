<script lang="ts">
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
    import { initFirebase, db } from '$lib/firebase/client';
    import { ref, get, onValue } from 'firebase/database';

    initFirebase();

    let comboboxValue: string;

    // update with list of semesters present in database
    // let semesters: string[] = ['1st Semester, AY 2021-2022', '2nd Semester, AY 2021-2022', 'Midyear, AY 2021-2022'];
    let semesters : string[] = [];
    const semesterDataRef = ref(db, `semesterData/`);
    onValue(semesterDataRef, (snapshot : any) => {
        const data = snapshot.val();
        for (let studentNumber in data) {
            // console.log(`Student Number: ${studentNumber}`);
            for (let semester in data[studentNumber]) {
                if (!semesters.includes(semester)){
                    semesters.push(semester);
                }
            }
        }
    });
    $: console.log(semesters);
    async function getListOfSem(){

    }
    // update with list of subjects present in a semester
    // need to compute passRate and totalTakers per subject
    let subjectPassRates = [
        { className: 'CS 21', passRate: '65%', totalTakers: 100 },
        { className: 'CS 150', passRate: '70%', totalTakers: 50 },
        { className: 'CS 153', passRate: '75%', totalTakers: 75 },
    ];

    const popupCombobox: PopupSettings = {
        event: 'click',
        target: 'popupCombobox',
        placement: 'bottom-start',
        closeQuery: '.listbox-item',
    };

    function getTable(): TableSource {
        if (!Array.isArray(subjectPassRates)) {
            return {
                head: [],
                body: [],
                meta: [],
            };
        }
        return {
            head: ['Class', 'Total Takers', 'Passing Rate'],
            body: tableMapperValues(subjectPassRates, ['className', 'totalTakers', 'passRate']),
            meta: tableMapperValues(subjectPassRates, ['className', 'totalTakers', 'passRate']),
        };
    }

    $: table = getTable();
</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div class="text-error-900">
        <div class="font-bold text-4xl">Pass Rate</div>
    </div>
    <button class="btn w-1/4 text-lg bg-primary-50 text-white justify-between" use:popup={popupCombobox}>
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
    {:else}
        <div></div>
    {/if}
</div>
