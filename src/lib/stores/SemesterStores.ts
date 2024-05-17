/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, get as getData, set as setData } from 'firebase/database';
import { get as getData, getDatabase, ref, remove, set as setData } from 'firebase/database';
import assert from '$lib/assert';
import { studentId } from '$lib/stores/CurriculumStores';
import { parseSemester } from '$lib/functions/helper';

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

function initStore() {
    const store = writable<Semester[]>([]);
    const { subscribe, set, update } = store;

    getData(reference).then((snapshot) => {
        const data: any[] = [];
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            data.push(childData);
        });
        set(data);
    });

    function addSemester({ sem, year }: AddSem) {
        const id = `${sem} ${year}`;
        const details = { gwa: null, sem, units: null, year };
        const newSemester: Semester = {
            details,
            id,
            subjects: [{ className: 'Sample Subject', grade: 0.0, units: 0 }],
        };

        // Update database and store
        const semId = parseSemester(id);
        const semRef = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(semRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Semester already exists');
            } else {
                update((store) => [...store, newSemester]);
                console.log('setData from addSemester');
                setData(semRef, newSemester);
            }
        });
    }

    function removeSemester(id: string) {
        // Update database and store
        const semId = parseSemester(id);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then((snapshot) => {
            update((store) => {
                const sem = store.find((s) => s.id === id);
                assert(typeof sem !== 'undefined', 'Semester not found');
                const index = store.indexOf(sem);
                store.splice(index, 1);
                console.log('remove from database');
                remove(reference);
                return store;
            });
        });
    }

    function getSem(id: string): Semester {
        const sem = getStore(store).find((sem) => sem.id === id);
        assert(typeof sem !== 'undefined', 'Semester not found');
        return sem;
    }

    // iterate through database to get the list of semesters and corresponding subjects

    function addSubject(subject: Subject, id: string) {
        // Update database and store
        const semId = parseSemester(id);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then((snapshot) => {
            update((store) => {
                const sem = store.find((s) => s.id === id);
                assert(typeof sem !== 'undefined', 'Semester not found');
                // if subject already exists, do not add
                if (sem.subjects.find((subj) => subj.className === subject.className)) {
                    console.log('Subject already exists');
                    return store;
                }
                sem.subjects.push(subject);
                sem.details.gwa = computeSemGWA(sem.subjects);
                sem.details.units = computeSemUnits(sem.subjects);
                console.log('setData from addSubject');
                setData(reference, sem);
                return store;
            });
        });
    }

    function editSubject(subject: Subject, id: string) {
        // Update database and store
        const semId = parseSemester(id);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then((snapshot) => {
            update((store) => {
                const sem = store.find((s) => s.id === id);
                assert(typeof sem !== 'undefined', 'Semester not found');
                const index = sem.subjects.findIndex((subj) => subj.className === subject.className);
                sem.subjects[index] = subject;
                sem.details.gwa = computeSemGWA(sem.subjects);
                sem.details.units = computeSemUnits(sem.subjects);
                console.log('setData from editSubject');
                setData(reference, sem);
                return store;
            });
        });
    }

    function removeSubject(subject: Subject, id: string) {
        // Update database and store
        const semId = parseSemester(id);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then((snapshot) => {
            update((store) => {
                const sem = store.find((s) => s.id === id);
                assert(typeof sem !== 'undefined', 'Semester not found');
                const index = sem.subjects.findIndex((subj) => subj.className === subject.className);
                sem.subjects.splice(index, 1);
                sem.details.gwa = computeSemGWA(sem.subjects);
                sem.details.units = computeSemUnits(sem.subjects);
                console.log('setData from removeSubject');
                setData(reference, sem);
                return store;
            });
        });
    }

    return {
        subscribe,
        set,
        addSemester,
        addSubject,
        getSem,
        removeSemester,
        editSubject,
        removeSubject,
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
