<script lang="ts">
    import { get, getDatabase, ref } from 'firebase/database';
    import { studentDegree, studentId } from '$lib/stores/CurriculumStores';
    import { goto } from '$app/navigation';
    import icon2 from '$lib/assets/icon2.webp';
    import { initializeApp } from 'firebase/app';

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

    let studentnumber = '';
    let password = '';
    let errorMessage = '';

    async function checkLogin(studentnumber: string, password: string) {
        const reference = ref(db, `students/${studentnumber}`);
        const snapshot = await get(reference);

        // Store student data in global variable
        studentId.set(studentnumber);
        studentDegree.set(snapshot.child('degree').val());
        if (snapshot.child('password').val() === password) {
            goto(`../../student/dashboard`);
        } else {
            errorMessage = 'Student Number or Password is not valid.';
            console.log(password);
        }
    }
    function handleSubmit() {
        checkLogin(studentnumber, password);
    }
</script>

<div class="container-fluid">
    <div class="black-film h-full">
        <p>&nbsp</p>
        <a href="/">
            <img src={icon2} alt="Icon" class="w-20 h-11 ml-4 mb-0" />
        </a>        
        <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
        <div class="loginform">
            <div class="logo"></div>
            <br />
            <form method="POST" class="flex flex-col items-center" on:submit|preventDefault={handleSubmit}>
                <div>
                    <input
                        class="form1 bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
                        type="text"
                        placeholder="Student Number"
                        bind:value={studentnumber}
                    />
                </div>
                <br />
                <div>
                    <input
                        class="form2 bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
                        type="password"
                        placeholder="Password"
                        bind:value={password}
                    />
                </div>
                <div class="error">{errorMessage}</div>
                <br />
                <p class="TTCommons-Regular-14">
                    Don't have an account? <a class="hyperlink" href="./signup">Sign Up</a>
                </p>
                <br />
                <button class="LoginButton">LOGIN</button>
            </form>
        </div>
    </div>
</div>

<style>
    .LoginButton {
        background-color: #507858;

        cursor: pointer;

        font-family: Arial Bold;
        font-weight: 600;
        border-radius: 5px;
        box-shadow: none;
        color: #f8fafc;
        line-height: 20px;
        height: 54px;

        border: 1px solid transparent;
        width: 50%;
        font-size: 25px;
        text-align: center;
        display: block;
        margin: 0 auto;

        justify-content: center;
    }

    .black-film {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .container-fluid {
        background-image: url('$lib/assets/bg.webp');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
    }

    .font-michroma {
        font-family: 'Michroma', sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .loginform {
        padding: 1rem;
        border: 4px solid #284c3b;
        border-radius: 25px;
        background: #ffffff 50%;

        height: 425px;
        width: 600px;
        margin-top: 50px;
        margin-right: auto;
        margin-left: auto;
        align-items: center;
        justify-content: center;
    }

    .logo {
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0px;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        background-image: url('$lib/assets/user-icon.webp');
        background-color: #86d295;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .form1 {
        background: url('$lib/assets/user-icon.webp');
        background-color: gray;
        background-size: contain;
        background-repeat: no-repeat;
        padding-left: 45px;
    }

    .form2 {
        background: url('$lib/assets/lock-icon.webp');
        background-color: gray;
        background-size: contain;
        background-repeat: no-repeat;
        padding-left: 45px;
    }

    .error {
        color: red;
        text-align: center;
    }

    .TTCommons-Regular-14 {
        font-family: Arial;
        font-size: 14px;
        color: black;
        letter-spacing: -0.04em;
    }

    .hyperlink {
        color: #226004;
    }
</style>
