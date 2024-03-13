import { Semester } from '$lib/models/types';
import { writable } from 'svelte/store';

export const SemesterStore = writable<Semester>([]);
