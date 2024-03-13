import { type Output, array, enum_, nullable, number, object, safeInteger, string, toUpperCase } from 'valibot';

export enum SemType {
    first = '1st Semester',
    second = '2nd Semester',
    midyear = 'Midyear',
}

export const SemDetails = object({
    sem: enum_(SemType),
    year: string(),
    gwa: nullable(number()),
    units: nullable(number([safeInteger()])),
});
export type SemDetails = Output<typeof SemDetails>;

export const Subjects = array(
    object({
        className: string([toUpperCase()]),
        grade: number(),
        units: number([safeInteger()]),
    }),
);
export type Subjects = Output<typeof Subjects>;

export const Semester = object({
    id: string(),
    details: SemDetails,
    subjects: Subjects,
});

export type Semester = Output<typeof Semester>;
