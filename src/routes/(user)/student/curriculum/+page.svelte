<script lang="ts">
    import { initializeApp } from 'firebase/app';
    import { getDatabase, ref, set, get } from 'firebase/database';
    import { studentId, studentDegree } from '../stores';

    const firebaseConfig = {
        apiKey: 'AIzaSyCmwpRzGyoeD-Xuh6Cuh1Agbsxw31Uekhk',
        authDomain: 'courseminder-dev.firebaseapp.com',
        databaseURL: 'https://courseminder-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'courseminder-dev',
        storageBucket: 'courseminder-dev.appspot.com',
        messagingSenderId: '274860730108',
        appId: '1:274860730108:web:b7f706a51ee7a79dbd1979',
        measurementId: 'G-1T6H3BFHRR',
    };

    // Initialize Firebase and get database
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    let studentnumber;
    studentId.subscribe((value) => {
        studentnumber = value;
    });

    let degree;
    studentDegree.subscribe((value) => {
        degree = value;
    });

    let courses: string[] = [];
    if (degree === 'Computer Science') {
        courses = [
            'CS 10',
            'CS 11',
            'CS 12',
            'CS 30',
            'CS 31',
            'CS 32',
            'CS 33',
            'CS 20',
            'CS 21',
            'CS 140',
            'CS 145',
            ' CS 165',
            'CS 132',
            'CS 136',
            'CS 138',
            'CS 150',
            'CS 153',
            'CS 155',
            'CS 191',
            'CS 192',
            'CS 133',
            'CS 180',
            'CS Elective',
            'CS 194',
            'CS 195',
            'CS 196',
            'CS 198',
            'CS 199',
            'Math 21',
            'Math 22',
            'Math 23',
            'Math 40',
            'Physics 71',
            'Physics 72',
            'Kas 1',
            'Philo 1',
            'Soc Sci 1/2',
            'Eng 13',
            'Eng 30',
            'Speech 30',
            'Fil 40',
            'Engg 150',
            'Free Elective',
            'GE Elective',
            'STS 1/DRMAPS',
            'PI 100',
            'Arts 1',
            'NSTP 1',
            'NSTP 2',
        ];
    } else if (degree === 'Civil Engineering') {
        courses = [
            'Physics 71',
            'Physics 71.1',
            'Chem 16',
            'Chem 16.1',
            'Math 21',
            'Eng 13',
            'Speech 30',
            'Physics 72',
            'Physics 72.1',
            'ES 1',
            'CE 29',
            'Math 22',
            'GE 10',
            'CE 1',
            'CE 41',
            'CE 11',
            'Math 23',
            'CE 24',
            'GE 12',
            'ES 101',
            'NSTP 1',
            'CE 22',
            'CE 31',
            'CE 130',
            'CE 17',
            'CE 25',
            'ES 102',
            'NSTP 2',
            'CE 123',
            'CE 115',
            'CE 141',
            'CE 18',
            'CE 151',
            'CE 162',
            'CE 124',
            'CE 132',
            'CE 116',
            'CE 142',
            'CE 152',
            'CE 163',
            'CE 190',
            'CE 195',
            'CE 199',
            'CE Elective 1',
            'Kas 1',
            'Fil 40',
            'DRMAPS',
            'GE Elective',
            'CE 196',
            'CE Elective 2',
            'Arts 1',
            'Philo 1',
            'Soc Sci 2',
            'PI 100',
        ];
    }
</script>

<div>
    <div>
        {#each courses as course (course)}
            <button class="bg-secondary-500 rounded-lg flex-row grid-cols-5 p-1">{course}</button>
        {/each}
    </div>
</div>
