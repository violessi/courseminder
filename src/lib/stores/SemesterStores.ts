import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { initializeApp } from 'firebase/app'
// import { getDatabase, ref, get as getData, set as setData } from 'firebase/database';
import { getDatabase, ref, get as getData, remove, set as setData } from 'firebase/database';
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

function parseSemester(id : string){
    const semComponents = id.split(' ');
    const sem = semComponents.length === 3 ? id.split(' ')[0] + ' ' + id.split(' ')[1] : id.split(' ')[0];
    const yearId = semComponents[semComponents.length - 1].split('-');
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
        console.log(data);
        set(data);
    });
        
    function addSemester({ sem, year }: AddSem) {
        const id = `${sem} ${year}`;
        const details = { gwa: null, sem, units: null, year };
        const newSemester: Semester = { 
            details, 
            id, 
            subjects: [
                { className: 'Sample Subject', grade: 0.0, units: 0},
            ] };

        // Update database and store
        const semId = parseSemester(id);
        const semRef = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(semRef).then(snapshot => {
            if (snapshot.exists()){
                console.log('Semester already exists');
            }
            else {
                update((store) => [...store, newSemester]);
                console.log('setData from addSemester');
                setData(semRef, newSemester);
            }
        });
    }

    // let popupOpen = false;

    // function removeSemester(){
    //     popupOpen = true;
    // }

    // function cancel(){
    //     popupOpen = false;
    // }

    function removeSemester(id: string) {
        const semId = parseSemester(id);
        const semRef = ref(db, `semesterData/${studentnumber}/${semId}`);

        getData(semRef).then((snapshot) => {
            if (snapshot.exists()) {
                remove(semRef)
                    .then(() => {
                        console.log("Semester removed successfully");
                        update((store) => store.filter(semester => semester.id !== id));
                    })
                    .catch(error => {
                        console.error("Error removing semester: ", error);
                    });
            } else {
                console.log("Semester does not exist or already removed");
            }
        }).catch(error => {
            console.error("Error getting semester snapshot: ", error);
        });
    }
 

    function getSem(id: string): Semester {
        const sem = getStore(store).find((sem) => sem.id === id);
        assert(typeof sem !== 'undefined', 'Semester not found');
        return sem;
    }

    function addSubject(subject: Subject, id: string) {
        
        // Update database and store
        const semId = parseSemester(id);
        const reference = ref(db, `semesterData/${studentnumber}/${semId}`);
        getData(reference).then(snapshot => {
            update((store) => {
                const sem = store.find((s) => s.id === id);
                assert(typeof sem !== 'undefined', 'Semester not found');
                sem.subjects.push(subject);
                sem.details.gwa = computeSemGWA(sem.subjects);
                sem.details.units = computeSemUnits(sem.subjects);
                console.log('setData from addSubject');
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
