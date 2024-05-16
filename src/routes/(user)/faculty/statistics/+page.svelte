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
    import { tick } from 'svelte';

    initFirebase();

    let comboboxValue: string;

    function convertSemID(semester: string): string {
        const startYear: string = '20' + semester.slice(0, 2);
        const endYear: string = '20' + semester.slice(2, 4);
        if (semester.slice(4, 5) === 'A') {
            return `1st Semester ${startYear}-${endYear}`;
        } else if (semester.slice(4, 5) === 'B') {
            return `2nd Semester ${startYear}-${endYear}`;
        } else {
            return `Midyear ${startYear}-${endYear}`;
        }
    }

    let semesters: string[] = [];
    const semesterDataRef = ref(db, `semesterData/`);
    onValue(semesterDataRef, (snapshot: any) => {
        const data = snapshot.val();
        for (let studentNumber in data) {
            for (let semester in data[studentNumber]) {
                semesters.push(convertSemID(semester));
            }
        }
        semesters = semesters.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    });

    function parseSemester(id: string) {
        const semComponents = id.split(' ');
        const sem = semComponents.length === 3 ? id.split(' ')[0] + ' ' + id.split(' ')[1] : id.split(' ')[0];
        const yearId = semComponents[semComponents.length - 1].split('-');
        const startYear = yearId[0].slice(2, 4);
        const endYear = yearId[1].slice(2, 4);
        let semId = startYear + endYear;
        if (sem === '1st Semester') semId += 'A';
        else if (sem === '2nd Semester') semId += 'B';
        else semId += 'M';

        return semId;
    }

    let semID: string;
    let subjects: any[] = [];
    let subjectsLoaded: boolean = false;

    async function loadSubjects() {
        semID = parseSemester(comboboxValue);
        subjects = [];
        const snapshot = await get(semesterDataRef);
        const data = snapshot.val();

        let subjectsMap = new Map();

        for (let studentNumber in data) {
            if (data[studentNumber][semID]) {
                let courses = data[studentNumber][semID]['subjects'];
                for (let course in courses) {
                    let className = courses[course].className;
                    if (!subjectsMap.has(className)) {
                        subjectsMap.set(className, { className: className, passRate: 0, totalTakers: 0 });
                    }
                }
            }
        }

        subjects = Array.from(subjectsMap.values());
        subjectsLoaded = true;
    }

    async function calculatePassRates() {
        const snapshot = await get(semesterDataRef);
        const data = snapshot.val();

        let tempSubjects = [...subjects];

        for (let studentNumber in data) {
            if (data[studentNumber][semID]) {
                let courses = data[studentNumber][semID]['subjects'];
                for (let course in courses) {
                    let courseData = courses[course];
                    let subject = tempSubjects.find((s) => s.className === courseData.className);
                    if (subject) {
                        subject.totalTakers += 1;
                        if (courseData.grade <= 3.0) {
                            subject.passRate += 1;
                        }
                    }
                }
            }
        }

        tempSubjects.forEach((subject) => {
            subject.passRate =
                subject.totalTakers > 0 ? ((subject.passRate / subject.totalTakers) * 100).toFixed(2) + '%' : '0%';
        });

        subjects = tempSubjects;
        subjectsLoaded = false;
        await tick();
    }

    $: if (comboboxValue) {
        loadSubjects().then(() => {
            calculatePassRates();
        });
    }

    const popupCombobox: PopupSettings = {
        event: 'click',
        target: 'popupCombobox',
        placement: 'bottom-start',
        closeQuery: '.listbox-item',
    };

    function getTable(subjects: any[]): TableSource {
        if (!Array.isArray(subjects)) {
            return {
                head: [],
                body: [],
                meta: [],
            };
        }
        return {
            head: ['Class', 'Total Takers', 'Passing Rate'],
            body: tableMapperValues(subjects, ['className', 'totalTakers', 'passRate']),
            meta: tableMapperValues(subjects, ['className', 'totalTakers', 'passRate']),
        };
    }

    function update(_: string[]) {
        const table = getTable(subjects.slice(1));
        return { table };
    }

    $: ({ table } = update(subjects));
</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div class="title-default-faculty">Passing Rates</div>

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
    {:else if !comboboxValue}
        <div class="subtitle-default-faculty text-center">
            Please select a semester to see the passing rate of each subject.
        </div>
    {:else}
        <div class="subtitle-default-faculty text-center font-bold">No data available.</div>
    {/if}
</div>
