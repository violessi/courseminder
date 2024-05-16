<script lang="ts">
    import { get, getDatabase, ref } from 'firebase/database';
    import { studentDegree, studentId } from '$lib/stores/CurriculumStores';
    import { goto } from '$app/navigation';
    import icon2 from '$lib/assets/icon2.png';
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
            goto(`../student/dashboard`);
        } else {
            errorMessage = 'Student Number or Password is not valid.';
            console.log(password)
        }
    }
    function handleSubmit() {
        checkLogin(studentnumber, password);
    }
</script>

<div class="container-fluid">
    <div class="black-film h-full">
        <p>&nbsp</p>
        <img src={icon2} alt="Icon" class="w-20 h-11 ml-4" />
        <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
        <div class="loginform">
            <div class="logo"></div>
            <br />
            <form method="POST" class="inputform" on:submit|preventDefault={handleSubmit}>
                <div>
                    <input class="form1" type="text" placeholder="Student Number" bind:value={studentnumber} />
                </div>
                <br />
                <div>
                    <input class="form2" type="password" placeholder="Password" bind:value={password} />
                </div>
                <div class="error">{errorMessage}</div>
                <br />
                <p class="TTCommons-Regular-14">
                    Don't have an account? <a class="hyperlink" href="/signup">Sign Up</a>
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

        font-family: 'Russo One', sans-serif;
        font-weight: 600;
        border-radius: 5px;
        box-shadow: none;
        color: #f8fafc;
        line-height: 20px;
        height: 54px;

        border: 1px solid transparent;
        width: 75%;
        font-size: 40px;
        text-align: center;
        display: block;
        margin: 0 auto;

        justify-content: center;
    }

    .black-film {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .container-fluid {
        background-image: url('$lib/assets/bg.png');
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
        background: #9fe3ac;
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
        background-image: url('$lib/assets/user-icon.png');
        background-color: #507858;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .inputform {
        text-align: center;
        justify-content: center;
    }

    .form1 {
        font-family: Arial;
        color: black;
        background: url('$lib/assets/user-icon.png');
        background-color: gray;
        background-size: contain;
        background-repeat: no-repeat;
        padding-left: 45px;
    }

    .form2 {
        font-family: Arial;
        color: black;
        background: url('$lib/assets/lock-icon.png');
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
