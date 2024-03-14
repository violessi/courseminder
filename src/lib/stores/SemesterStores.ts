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

    function addSubject({ className, grade, units }: Subject, id: string) {
        update((store) => {
            const sem = store.find((s) => s.id === id);
            if (typeof sem === 'undefined') throw new Error('Semester not found');

            // check if subject already exists

            sem.subjects.push({ className, grade, units });
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
