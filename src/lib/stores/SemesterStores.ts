import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
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

function initStore() {
    const store = writable<Semester[]>([]);
    const { subscribe, set, update } = store;

    function addSemester({ sem, year }: AddSem) {
        const id = `${sem} ${year}`;
        const details = { sem, year, gwa: null, units: null };
        const newSemester: Semester = { id, details, subjects: [] };
        update((store) => [...store, newSemester]);
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
