import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get as getData, set as setData } from 'firebase/database';
import { studentId } from '$lib/stores/CurriculumStores';

const SEMESTER = Symbol('semester');

let studentnumber = '';
studentId.subscribe((value) => {
    studentnumber = value;
});

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
const reference = ref(db, `semesterData/${studentnumber}`);

function parseSemester(sem : string, year : string){
    const yearId = year.split('-');
    const startYear = yearId[0].slice(2, 3);
    const endYear = yearId[1].slice(2, 3);
    let semId = startYear + endYear;
    if (sem === '1st Semester') semId += 'A';
    else if (sem === '2nd Semester') semId += 'B';
    else semId += 'M';

    return semId;
}

function initStore() {
    const store = writable<Semester[]>([]);
    const { subscribe, set, update } = store;

    getData(reference).then(snapshot => {
        const data : any[] = [];
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            data.push(childData);
        });
        console.log(data);
        set(data);
    });

    function addSem({ sem, year }: AddSem) {
        const obg = {
            id: `${sem} ${year}`,
            details: {
                sem,
                year,
                gwa: null,
                units: null,
            },
            subjects: [],
        } satisfies Semester;
        update((store) => [...store, obg]);

        // Update database
        const semId = parseSemester(sem, year);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then(snapshot => {
            if (snapshot.exists()){
                console.log('Semester already exists');
            }
            else {
                setData(reference, obg);
            }
        });
    }

    function getSem(id: string) {
        return getStore(store).find((s) => s.id === id);
    }

    function computeGWA(subjects: Subject[]) {
        let totalUnits = 0;
        let totalGrade = 0;
        for (const subj of subjects) {
            totalUnits += subj.units;
            totalGrade += subj.grade * subj.units;
        }
        if (totalUnits === 0) return 0;
        const gwa = totalGrade / totalUnits;
        return gwa ?? 0;
    }

    function computeUnits(subjects: Subject[]) {
        let totalUnits = 0;
        for (const subj of subjects) totalUnits += subj.units;
        return totalUnits ?? 0;
    }

    function addSubject({ className, grade, units }: Subject, id: string) {
        update((store) => {
            const sem = store.find((s) => s.id === id);
            if (typeof sem === 'undefined') throw new Error('Semester not found');

            // check if subject already exists
            // const subj = sem.subjects.find((s) => s.className.toLowerCase === className.toLowerCase);
            // if (typeof subj !== 'undefined') throw new Error('Subject already exists');

            sem.subjects.push({ className, grade, units });
            sem.details.gwa = computeGWA(sem.subjects);
            sem.details.units = computeUnits(sem.subjects);
            return store;
        });
    }

    return {
        subscribe,
        set,
        update,
        addSem,
        addSubject,
        getSem,
        computeGWA,
        computeUnits,
    };
}

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(SEMESTER, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(SEMESTER)) throw new Error('Editing store not initialized');
    return getContext<Store>(SEMESTER);
}
