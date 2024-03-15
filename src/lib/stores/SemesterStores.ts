import { AddSem, Semester, Subject } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';

const SEMESTER = Symbol('semester');

function initStore() {
    const store = writable<Semester[]>([]);
    const { subscribe, set, update } = store;

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
