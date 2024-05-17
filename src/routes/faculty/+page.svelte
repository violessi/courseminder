<script lang="ts">
    import icon2 from '$lib/assets/icon2.webp';
    import { initFirebase, db } from '$lib/firebase/client';
    import { facultyDegree, facultyName, facultyId } from '$lib/stores/CurriculumStores';
    import { goto } from '$app/navigation';
    import { ref, get } from 'firebase/database';

    initFirebase();

    let errorMessage = '';
    let id = '';
    let password = '';

    async function checkLogin(id: string, password: string) {
        const reference = ref(db, `faculty/${id}`);
        const snapshot = await get(reference);

        // Store student data in global variable
        facultyId.set(id);
        facultyDegree.set(snapshot.child('department').val());
        facultyName.set(snapshot.child('name').val());
        if (snapshot.child('password').val() === password) {
            goto(`../../../../faculty/dashboard`);
        } else {
            errorMessage = 'Faculty ID or Password is not valid.';
            console.log(password)
        }
    }
    function handleSubmit() {
        checkLogin(id, password);
    }

</script>

<body class="container-fluid">
    <div class="black-film h-full">
        <p>&nbsp</p>
        <a href="/">
            <img src={icon2} alt="Icon" class="w-20 h-11 ml-4" />
        </a>
        <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
        <div class="loginform">
            <div class="logo"></div>
            <br />
            {#if errorMessage}
                <p class="white">{errorMessage}</p>
                <br />
            {/if}
            <form method="POST" class="inputform" on:submit|preventDefault={handleSubmit}>
                <div>
                    <input class="form1" type="text" name="id" placeholder="Faculty ID" bind:value={id}/>
                </div>
                <br />
                <div>
                    <input class="form2" type="password" name="password" placeholder="Password" bind:value={password}/>
                </div>
                <br />
                <p class="TTCommons-Regular-14">
                    Don't have an account? <a class="hyperlink" href="/facultysignup">Sign Up</a>
                </p>
                <br />
                <button class="LoginButton">LOGIN</button>
            </form>
        </div>
    </div>
</body>

<style>
    ::placeholder{
        color: rgb(151, 149, 149);
    }
    
    .LoginButton {
        background-color: #861933;

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

        /* margin-top: 50px; */
    }

    .black-film {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .container-fluid {
        background-image: url('$lib/assets/bg-faculty.jpg');
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
        background: #f16889;
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
        background-color: #861933;
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
        background-color:#eba5cc;
        background-size: contain;
        background-repeat: no-repeat;
        padding-left: 45px;
        border-color: #DB2777;
        border-radius: 8px;
    }
    .form2 {
        font-family: Arial;
        color: black;
        background: url('$lib/assets/lock-icon.png');
        background-color:#eba5cc;
        background-size: contain;
        background-repeat: no-repeat;
        padding-left: 45px;
        border-color: #DB2777;
        border-radius: 8px;
    }
    .white {
        color: white;
        text-align: center;
    }
    .TTCommons-Regular-14 {
        font-family: Arial;
        font-size: 14px;
        color: black;
        letter-spacing: -0.04em;
    }

    .hyperlink {
        color: #861933;
    }
</style>
