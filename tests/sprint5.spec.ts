import { type Page, expect, test } from '@playwright/test';
import { convertSemID } from '$lib/functions/helper';

test('convertSemID', async ({ page }) => {
    expect(convertSemID('2324A')).toBe('1st Semester 2023-2024');
    expect(convertSemID('2324B')).toBe('2nd Semester 2023-2024');
    expect(convertSemID('2324M')).toBe('Midyear 2023-2024');
    expect(convertSemID('2425A')).toBe('1st Semester 2024-2025');
    expect(convertSemID('2425B')).toBe('2nd Semester 2024-2025');
});




