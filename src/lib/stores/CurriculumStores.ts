import { type CourseStatus, type SpecificCourseStatus } from '$lib/models/types';
import { type Writable, writable } from 'svelte/store';

function persist(key: string, initialValue: any) {
    const isBrowser = typeof window !== 'undefined';
    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const initial = storedValue === null ? initialValue : JSON.parse(storedValue);

    const store: Writable<any> = writable(initial, () => {
        if (isBrowser) {
            const unsubscribe = store.subscribe(($value: any) => {
                localStorage.setItem(key, JSON.stringify($value));
            });

            return unsubscribe;
        }
    });

    return { subscribe: store.subscribe, set: store.set, update: store.update };
}

export const studentId = persist('studentId', '');
export const studentDegree = persist('studentDegree', '');
export const statusData = persist('statusData', '');
export const facultyDegree = persist('facultyDegree', '');
export const facultyName = persist('facultyName', '');
export const facultyId = persist('facultyId', '');
