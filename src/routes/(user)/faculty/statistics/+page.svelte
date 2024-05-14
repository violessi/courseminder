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
    import { Subject } from '$lib/models/types';

    initFirebase();

    let comboboxValue: string;

    function convertSemID(semester: string): string {
        const startYear : string = '20' + semester.slice(0, 2);
        const endYear : string = '20' + semester.slice(2, 4);
        if (semester.slice(4, 5) === 'A'){
            return `1st Semester ${startYear}-${endYear}`;
        } else if (semester.slice(4, 5) === 'B'){
            return `2nd Semester ${startYear}-${endYear}`;
        } else {
            return `Midyear ${startYear}-${endYear}`;
        
        }
    }

    // update with list of semesters present in database
    // let semesters: string[] = ['1st Semester, AY 2021-2022', '2nd Semester, AY 2021-2022', 'Midyear, AY 2021-2022'];
    let semesters : string[] = [];
    const semesterDataRef = ref(db, `semesterData/`);
    onValue(semesterDataRef, (snapshot : any) => {
        const data = snapshot.val();
        for (let studentNumber in data) {
            // console.log(`Student Number: ${studentNumber}`);
            for (let semester in data[studentNumber]) {
                semesters.push(convertSemID(semester));
            }
        }
        semesters = semesters.filter((value, index, self) => {
            return self.indexOf(value) === index;
        }); // remove duplicates
    });
    $: console.log(semesters);
    
    // update with list of subjects present in a semester

    function parseSemester(id: string) {
        console.log(id);
        const semComponents = id.split(' ');
        // eslint-disable-next-line prefer-template
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
    let semID : string;
    let subjects : any[] = [];
    let subjectsLoaded : boolean = false;
    $: if (comboboxValue){
        semID = parseSemester(comboboxValue);
        subjects = [];
        get(semesterDataRef).then((snapshot : any) => {
            const data = snapshot.val();
            // get all subjects in a semester
            for (let studentNumber in data) {
                if (data[studentNumber][semID]) {
                    let courses = data[studentNumber][semID]["subjects"];
                    for (let course in courses) {
                        console.log(courses[course].className);
                        let data = {
                            className: courses[course].className,
                            passRate: 0,
                            totalTakers: 0,
                        }
                        if (!subjects.some(subject => subject.className === data.className)) {
                            subjects.push(data);
                        }                    
                    }
                    // console.log(`Student Number: ${studentNumber}`);
                    // console.log(`Semester: ${semID}`);
                    // console.log(courses);
                }
            }
            // console.log(subjects);
            subjectsLoaded = true;
        });
    }
    $: if (subjectsLoaded && subjects) {
        // input passRate and totalTakers to subjects
        console.log(subjects);
        let tempSubjects = [...subjects];
        console.log(tempSubjects);
        get(semesterDataRef).then((snapshot : any) => {
            const data = snapshot.val();
            for (let studentNumber in data) {
                if (data[studentNumber][semID]) {
                    let courses = data[studentNumber][semID]["subjects"];
                    for (let course in courses) {
                        for (let subject in tempSubjects) {
                            if (tempSubjects[subject].className === courses[course].className) {
                                tempSubjects[subject].totalTakers += 1;
                                if (courses[course].grade <= 3.0) {
                                    tempSubjects[subject].passRate += 1;
                                }
                            }
                        }
                    }
                }
            }
            for (let subject in tempSubjects) {
                console.log(subjects[subject].passRate);
                console.log(subjects[subject].totalTakers);
                tempSubjects[subject].passRate = (subjects[subject].passRate / subjects[subject].totalTakers) * 100;
                console.log(tempSubjects[subject].passRate);
            }
        });
        
        subjects = tempSubjects;
        console.log(subjects);
        subjectsLoaded = false;
    }
    
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
