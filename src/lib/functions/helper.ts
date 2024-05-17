import { Semester } from '$lib/models/types';

/**
 * Computes the GWA based across all subjects in the provided semesters.
 * @param {Semester[]} sems - An array of semesters containing subjects.
 * @returns {number} The computed GWA.
 */
export function computeGWA(sems: Semester[]): number {
    let totalUnits = 0;
    let totalGrade = 0;

    for (const sem of sems) {
        const subjs = sem.subjects;
        if (Array.isArray(subjs)) {
            for (const subj of sem.subjects) {
                totalUnits += subj.units;
                totalGrade += subj.grade * subj.units;
            }
        }
    }

    if (totalUnits === 0) return 0;
    return totalGrade / totalUnits;
}

/**
 * Computes the total number of units across all subjects in the provided semesters.
 * @param {Semester[]} sems - An array of semesters containing subjects.
 * @returns {number} The total number of units.
 */
export function computeUnits(sems: Semester[]): number {
    let totalUnits = 0;

    for (const sem of sems) {
        const subjs = sem.subjects;
        if (Array.isArray(subjs)) {
            for (const subj of subjs) {
                totalUnits += subj.units;
            }
        }
    }
    return totalUnits;
}

/**
 * Computes the academic honor based on the Grade Weighted Average (GWA).
 * @param {number} gwa - The Grade Weighted Average (GWA).
 * @returns {string} The academic honor.
 */
export function computeHonor(gwa: number, string = ''): string {
    if (gwa === 0) return 'None';

    if (string === 'sem') {
        if (gwa <= 1.45) return 'University';
        else if (gwa <= 1.75) return 'College';
        return 'None';
    }

    if (gwa <= 1.2) return 'Summa Cum Laude';
    else if (gwa <= 1.45) return 'Magna Cum Laude';
    else if (gwa <= 1.75) return 'Cum Laude';
    return 'None';
}

export function parseEmail(email : string): string {
    return email.split(".")[0]
}

export function convertSemID(semester: string): string {
    const startYear: string = '20' + semester.slice(0, 2);
    const endYear: string = '20' + semester.slice(2, 4);
    if (semester.slice(4, 5) === 'A') {
        return `1st Semester ${startYear}-${endYear}`;
    } else if (semester.slice(4, 5) === 'B') {
        return `2nd Semester ${startYear}-${endYear}`;
    } else {
        return `Midyear ${startYear}-${endYear}`;
    }
}

export function parseSemester(id: string) {
    console.log(id);
    const semComponents = id.split(' ');
    // eslint-disable-next-line prefer-template
    const sem = semComponents.length === 3 ? id.split(' ')[0] + ' ' + id.split(' ')[1] : id.split(' ')[0];
    const yearId = semComponents[semComponents.length - 1].split('-');
    const startYear = yearId[0].slice(2, 4);
    const endYear = yearId[1].slice(2, 4);
    let semId = startYear + endYear;
    if (sem === '1st Semester') semId += 'A';
    else if (sem === '2nd Semester') semId += 'B';
    else semId += 'M';

    return semId;
}
