import { equalTo, get, orderByValue, query, ref } from 'firebase/database';
import { Course } from '$lib/models/types';
import assert from '$lib/assert';
import { db } from '$lib/firebase/client';
import { safeParse } from 'valibot';

/**
 * Retrieves the key corresponding to the given course from the database.
 * @param {string} course - The name of the course to retrieve the key for.
 * @returns {Promise<string>} A Promise resolving to the key of the specified course.
 * @throws {Error} Throws an error if the course is not found or its key is not found.
 */
export async function getCourseKey(course: string): Promise<string> {
    // get course from database
    const q = query(ref(db, 'courseMap'), orderByValue(), equalTo(course));
    const snapshot = await get(q);

    // throw error if course not found
    assert(snapshot.exists(), 'course');

    // get course key
    const [key] = Object.keys(snapshot.val());

    // throw error if course key not found
    assert(typeof key !== 'undefined', 'course key not found');

    // return course key
    return key;
}

/**
 * Retrieves the data of a course corresponding to the given course key from the database.
 * @param {string} courseKey - The key of the course to retrieve data for.
 * @returns {Promise<Course>} A Promise resolving to the data of the specified course.
 * @throws {Error} Throws an error if the course data is not found or is invalid.
 */
export async function getCourseData(courseKey: string): Promise<Course> {
    // get course data from database
    const snapshot = await get(ref(db, `courses/${courseKey}`));

    // throw error if course not found
    assert(snapshot.exists(), 'course data not found');

    // parse course data
    const res = safeParse(Course, snapshot.val());

    // throw error if course data is invalid
    assert(res.success, 'invalid course data');

    // return course data
    return res.output;
}
