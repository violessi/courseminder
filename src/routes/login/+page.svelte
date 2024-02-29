<script>
    //import { goto } from '$app/navigation';
    let studentnumber = '';
    let password = '';
    let isLoggedIn = false;

    const handleLogin = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.studentnumber === studentnumber && user.password === password) {
            isLoggedIn = true;
        }
    };
</script>

{#if isLoggedIn}
    <p>Welcome back!</p>
{:else}
    <div class = "bg2">
            <div class = "pageicon">
            </div>
            <div class = "loginform">
                <div class = "logo">
                </div>

                <form class="max-w-sm mx-auto" on:submit|preventDefault={handleLogin}>
                    <br>
                    <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                    <input type="text" id="studentnumber" class="bg-white-50 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Number" bind:value={studentnumber}>
                    </div>
                    <br>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-4 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clip-rule="evenodd"/>
                            </svg>                    
                        </div>
                        <input type="text" id="password" class="bg-white-50 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" bind:value={password}>
                    </div>
                </form>
                <br>
                <br>

                <button type="button" class="LoginButton"> LOGIN </button>
            </div>
        </div>
{/if}




<style>
    .bg2 {
    border: 1px solid black;
    background-image: url('./src/lib/assets/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    }
    
    .loginform {
        padding: 1rem;
        background: #9FE3AC;
        height: 350px;
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
        background-image: url('./src/lib/assets/user icon.png');
        background-color: #507858;
        background-size: contain;
        background-repeat: no-repeat;
    }

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
        width: 75%;
        font-size: 40px;
        text-align: center;
        vertical-align: middle;
        display: block;
        margin: 0 auto;

        justify-content: center;
        
    }

    .pageicon {
        width: 100px;
        height: 100px;
        background-image: url('./src/lib/assets/icon.png');
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>