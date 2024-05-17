import { db, initFirebase } from '$lib/firebase/client';
import { facultyDegree, facultyId, facultyName } from '$lib/stores/CurriculumStores';
import { get, ref } from 'firebase/database';
import { redirect } from '@sveltejs/kit';

initFirebase();

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const password = formData.get('password');

        const reference = ref(db, `faculty/${id}`);
        const snapshot = await get(reference);

        // Store faculty data in global variable
        if (snapshot.child('password').val() === password) {
            cookies.set('access', 'true', { path: '/', sameSite: 'strict' });
            facultyId.set(id);
            facultyDegree.set(snapshot.child('department').val());
            facultyName.set(snapshot.child('name').val());
            throw redirect(302, '/faculty/dashboard');
        }
        console.log('Invalid Password');
        console.log(id);
        return {
            id,
            message: 'Faculty ID or Password is not valid.',
        };
    },
};
