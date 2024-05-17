<script>
    import { goto } from '$app/navigation';
    import icon2 from '$lib/assets/icon2.png';

    let department = '';
    let name = '';
    let email = '';
    let password = '';
    let errorMessage = '';

    function handleSubmit() {
        // Check if all fields are filled
        if (department && name && id && password) {
            // Check if the faculty ID is valid
            const isValid = await checkFacultyID(id);
            if (isValid) {
                const facultyuser = {
                    department,
                    name,
                    id,
                    password,
                };
                // localStorage.setItem('facultyuser', JSON.stringify(facultyuser));
                writeFacultyData(department, name, id, password);
                goto(`../../../../faculty/dashboard`);
            }
        } else {
            // Handle the case when not all fields are filled
            // You can show an error message or do something else
            errorMessage = 'Please fill-up all fields.';
        }
    }
</script>

<body class="background">
    <div class="black-film h-full">
        <p>&nbsp</p>
        <a href="/">
            <img src={icon2} alt="Icon" class="w-20 h-11 ml-4" />
        </a>
        <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
        <div class="SignUpContainer">
            <form class="max-w-sm mx-auto" on:submit|preventDefault={handleSubmit}>
                <div class="CreateAccountShape">
                    <p class="TTCommons-Regular-14">CREATE ACCOUNT</p>
                </div>
                <br />
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                            class="w-5 h-5 text-gray-800 dark:text-gray"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.4l1.4.7a7.7 7.7 0 0 0 .7.3 21 21 0 0 0 16.4-.3l1.5-.7V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.4 7.9.6-.3V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.4l.6.3a10 10 0 0 0 .7.3 23 23 0 0 0 18-.3h.1L21 13l.4.9ZM12 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <select
                        id="degree"
                        class="bg-pink-50 text-black-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-pink-100 dark:border-pink-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        bind:value={department}
                    >
                        <option disabled selected value="">Department</option>
                        <option>Department of Computer Science</option>
                        <option>Institute of Civil Engineering</option>
                    </select>
                </div>
                <br />
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                            class="w-5 h-5 text-gray-800 dark:text-gray"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="email-address-icon"
                        class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 dark:bg-pink-100 dark:border-pink-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Full Name"
                        bind:value={name}
                    />
                </div>
                <br />
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                            class="w-5 h-5 text-gray-800 dark:text-gray"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M2 5.6V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V5.6l-.9.7-7.9 6a2 2 0 0 1-2.4 0l-8-6-.8-.7Z"
                            />
                            <path d="M20.7 4.1A2 2 0 0 0 20 4H4a2 2 0 0 0-.6.1l.7.6 7.9 6 7.9-6 .8-.6Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="email-address-icon"
                        class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 dark:bg-pink-100 dark:border-pink-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Email"
                        bind:value={email}
                    />
                </div>
                <br />
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                            class="w-5 h-5 text-gray-800 dark:text-gray"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="password"
                        id="email-address-icon"
                        class="bg-pink-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2.5 dark:bg-pink-100 dark:border-pink-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Password"
                        bind:value={password}
                    />
                </div>
                <div class="error">{errorMessage}</div>

                <p class="TTCommons-Regular-14">
                    <br />
                    Already have an account? <a class="hyperlink" href="/faculty">Login here.</a>
                </p>
                <br />
                <div class="SignupButtonShape">
                    <button type="submit" class="SignupButton"> SIGN UP </button>
                </div>
            </form>
            <div class="SignUpRightContainer">
                <p class="TTCommons-Regular-14">
                    <br />
                    WELCOME TO COURSEMINDER!
                </p>
            </div>
        </div>
    </div>
</body>

<style>
    .background {
        background-image: url('$lib/assets/bg-faculty.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
    }

    .black-film {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .hyperlink {
        color: #f495ac;
    }

    .error {
        color: red;
    }

    .font-michroma {
        font-family: 'Michroma', sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .TTCommons-Regular-14 {
        font-family: Arial;
        font-size: 14px;
        color: black;
        letter-spacing: -0.04em;
    }

    .SignUpContainer {
        width: 1000px;
        border: 4px solid #861933;
        border-radius: 25px;
        background: linear-gradient(to right, #ffffff 50%, rgba(248, 193, 206, 0.4) 0%);
        display: flex;
        align-items: center;
        text-align: center;
        left: 0px;
        margin-top: 10px;
        margin-left: 180px;
        margin-right: 270px;
    }

    .SignUpRightContainer {
        width: 500px;
        height: 500px;
        display: flex;
        float: right;
        align-items: top;
        text-align: center;
        background-image: url('$lib/assets/girlf.png');
        background-position: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        justify-content: center;

    }

    .SignupButton {
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
        font-size: 25px;
        text-align: center;
        display: block;
        margin: 0 auto;

        justify-content: center;
    }

    .CreateAccountShape {
        background-color: #f16e8e;
        border-radius: 25px;
        height: 50px;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 12px 0;
    }
</style>
