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
        for (const subj of sem.subjects) {
            totalUnits += subj.units;
            totalGrade += subj.grade * subj.units;
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
        for (const subj of subjs) {
            totalUnits += subj.units;
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
