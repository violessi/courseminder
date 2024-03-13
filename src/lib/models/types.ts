import { type Output, array, number, object, safeInteger, string } from 'valibot';

export const Semester = array(
    object({
        id: number([safeInteger()]),
        sem: string(),
        year: string(),
        gwa: number(),
        units: number(),
    }),
);
export type Semester = Output<typeof Semester>;

export const Grade = array(
    object({
        className: string(),
        grade: number(),
        units: number(),
    }),
);
export type Grade = Output<typeof Grade>;
