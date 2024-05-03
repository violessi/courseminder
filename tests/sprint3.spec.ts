import { type Page, expect, test } from '@playwright/test';
import { computeGWA, computeHonor, computeUnits } from '../src/lib/functions/helper';
import { Semester, SemType} from '../src/lib/models/types';

const sems1: Semester[] = [
    {
        id: '1st Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.first,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 123', units: 3, grade: 1.0 },
            { className: 'CS 124', units: 3, grade: 1.25 },
        ],
    },
    {
        id: '2nd Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.second,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 456', units: 4, grade: 1.5 },
            { className: 'CS 457', units: 3, grade: 1.75 },
        ],
    },
];

const sems2: Semester[] = [
    {
        id: '1st Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.first,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 123', units: 3, grade: 1.0 },
            { className: 'CS 124', units: 3, grade: 1.25 },
        ],
    },
    {
        id: '2nd Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.second,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 456', units: 4, grade: 1.5 },
            { className: 'CS 457', units: 3, grade: 1.75 },
        ],
    },
    {
        id: 'Midyear 2024',
        details: {
            gwa: null,
            sem: SemType.midyear,
            units: null,
            year: '2024',
        },
        subjects: [
            { className: 'CS 789', units: 3, grade: 2.0 },
            { className: 'CS 790', units: 3, grade: 2.25 },
        ],
    },
];

const sems3: Semester[] = [
    {
        id: '1st Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.first,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 123', units: 3, grade: 1.0 },
            { className: 'CS 124', units: 3, grade: 1.25 },
        ],
    },
    {
        id: '2nd Semester 2023-2024',
        details: {
            gwa: null,
            sem: SemType.second,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 456', units: 4, grade: 1.5 },
            { className: 'CS 457', units: 3, grade: 1.75 },
        ],
    },
    {
        id: 'Midyear 2023-2024',
        details: {
            gwa: null,
            sem: SemType.midyear,
            units: null,
            year: '2023-2024',
        },
        subjects: [
            { className: 'CS 789', units: 3, grade: 2.0 },
            { className: 'CS 790', units: 3, grade: 2.25 },
        ],
    },
    {
        id: '1st Semester 2024-2025',
        details: {
            gwa: null,
            sem: SemType.first,
            units: null,
            year: '2024-2025',
        },
        subjects: [
            { className: 'CS 234', units: 4, grade: 1.75 },
            { className: 'CS 235', units: 4, grade: 3.0 },
        ],
    },
];
test('computeGWA', async ({page}) => {
    expect(computeGWA(sems1).toFixed(3)).toBe("1.385");
    expect(computeGWA(sems2).toFixed(3)).toBe("1.618");
    expect(computeGWA(sems3).toFixed(3)).toBe("1.843");
});

test('computeUnits', async ({page}) => {
    expect(computeUnits(sems1)).toBe(13);
    expect(computeUnits(sems2)).toBe(19);
    expect(computeUnits(sems3)).toBe(27);
});

test('computeHonor', async ({page}) => {
    expect(computeHonor(1.0)).toBe('Summa Cum Laude');
    expect(computeHonor(1.25)).toBe('Magna Cum Laude');
    expect(computeHonor(1.5)).toBe('Cum Laude');
    expect(computeHonor(1.75)).toBe('Cum Laude');
    expect(computeHonor(2.0)).toBe('None');
    expect(computeHonor(2.25)).toBe('None');
    expect(computeHonor(0)).toBe('None');
    expect(computeHonor(1.0, 'sem')).toBe('University');
    expect(computeHonor(1.25, 'sem')).toBe('University');
    expect(computeHonor(1.75, 'sem')).toBe('College');
    expect(computeHonor(2.0, 'sem')).toBe('None');
});


