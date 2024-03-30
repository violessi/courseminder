import {
    type Output,
    array,
    enum_,
    nullable,
    number,
    object,
    optional,
    pick,
    safeInteger,
    string,
    toUpperCase,
} from 'valibot';

// Types of academic semesters.
export enum SemType {
    first = '1st Semester',
    second = '2nd Semester',
    midyear = 'Midyear',
}

// Types of semester summary.
export const SemDetails = object({
    sem: enum_(SemType),
    year: string(),
    gwa: nullable(number()),
    units: nullable(number([safeInteger()])),
});
export type SemDetails = Output<typeof SemDetails>;

// Types of subject.
export const Subject = object({
    className: string([toUpperCase()]),
    grade: number(),
    units: number([safeInteger()]),
});
export type Subject = Output<typeof Subject>;

// Types of full semester detail
export const Semester = object({
    id: string(),
    details: SemDetails,
    subjects: array(Subject),
});
export type Semester = Output<typeof Semester>;

// Form type for adding a new semester.
export const AddSem = pick(SemDetails, ['sem', 'year']);
export type AddSem = Output<typeof AddSem>;

// Types for course data.
export const Course = object({
    course: string(),
    title: optional(string(), 'n/a'),
    desc: optional(string(), 'n/a'),
    numUnits: optional(string(), 'n/a'),
    prereq: optional(string(), 'n/a'),
    coreq: optional(string(), 'n/a'),
});
export type Course = Output<typeof Course>;
