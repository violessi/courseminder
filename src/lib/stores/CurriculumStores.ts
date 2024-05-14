import { type Writable, writable } from 'svelte/store';

function persist(key: string, initialValue: any) {
    const isBrowser = typeof window !== 'undefined';
    console.log('isBrowser:', isBrowser);

    let storedValue = null;
    if (isBrowser) {
        storedValue = localStorage.getItem(key);
        console.log('storedValue:', storedValue);

        // Handle case where storedValue is null (key not present) or invalid JSON
        if (storedValue === null) {
            storedValue = initialValue;
        } else {
            try {
                storedValue = JSON.parse(storedValue);
            } catch (e) {
                console.error('Error parsing stored value for key ' + key + ' ' + e);
                storedValue = initialValue;
            }
        }
    } else {
        storedValue = initialValue;
    }
    console.log('initial:', storedValue);

    const store: Writable<any> = writable(storedValue, () => {
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