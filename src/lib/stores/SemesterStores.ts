import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get as getData, set as setData } from 'firebase/database';
import { studentId } from '$lib/stores/CurriculumStores';
import assert from '$lib/assert';

function computeSemGWA(subjects: Subject[]): number {
    const totalUnits = subjects.reduce((acc, subj) => acc + subj.units, 0);
    const totalGrade = subjects.reduce((acc, subj) => acc + subj.grade * subj.units, 0);

    if (totalUnits === 0) return 0;
    return totalGrade / totalUnits;
}

function computeSemUnits(subjects: Subject[]) {
    return subjects.reduce((acc, subj) => acc + subj.units, 0);
}

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
    const startYear = yearId[0].slice(2, 4);
    const endYear = yearId[1].slice(2, 4);
    let semId = startYear + endYear;
    if (sem === '1st Semester') semId += 'A';
    else if (sem === '2nd Semester') semId += 'B';
    else semId += 'M';
    console.log(semId)

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
        // console.log(data);
        set(data);
    });
        
    function addSemester({ sem, year }: AddSem) {
        const id = `${sem} ${year}`;
        const details = { sem, year, gwa: null, units: null };
        const newSemester: Semester = { id, details, subjects: [] };

        // Update database and store
        const semId = parseSemester(sem, year);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then(snapshot => {
            if (snapshot.exists()){
                console.log('Semester already exists');
            }
            else {
                update((store) => [...store, newSemester]);
                setData(reference, obg);
            }
        });
    }

    function getSem(id: string): Semester {
        const sem = getStore(store).find((sem) => sem.id === id);
        assert(typeof sem !== 'undefined', 'Semester not found');
        return sem;
    }

    function addSubject(subject: Subject, id: string) {
        update((store) => {
            const sem = store.find((s) => s.id === id);
            assert(typeof sem !== 'undefined', 'Semester not found');
            sem.subjects.push(subject);
            sem.details.gwa = computeSemGWA(sem.subjects);
            sem.details.units = computeSemUnits(sem.subjects);
            return store;
        });
    }

    return {
        subscribe,
        set,
        addSemester,
        addSubject,
        getSem,
    };
}

type Store = ReturnType<typeof initStore>;
const SEMESTER = Symbol('semester');

export function init() {
    setContext(SEMESTER, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(SEMESTER)) throw new Error('Editing store not initialized');
    return getContext<Store>(SEMESTER);
}
