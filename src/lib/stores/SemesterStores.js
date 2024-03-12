import { writable } from 'svelte/store';

export const SemesterStore = writable([{ id: 0, sem: '1st', year: '2020-2021', gwa: 0.0, units: 0 }]);
