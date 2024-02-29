<script>
    export let form;
    console.log(form);
</script>

<div class = "container-fluid">
    <div class = "pageicon">
    </div>
    <div class = "loginform">
        <div class = "logo">
        </div>
        <br>
            {#if form?.message}
            <p class = "red"> {form.message}</p>
            <br>
            {/if}
            <form method = "POST" class = "inputform">
                <div>
            
                <input class = "form" type = "email" name = "email" placeholder = "Student Number" value = {form?.email || ""}>
                </div>
                <br>
                <div>
            
                <input class = "form" type = "password" name = "password" placeholder = "Password" />
                </div>
                <br>
                <br>
                <button class = "LoginButton">Login</button>
            </form>
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
        width: 75%;
        font-size: 40px;
        text-align: center;
        vertical-align: middle;
        display: block;
        margin: 0 auto;

        justify-content: center;
        
    }

    .container-fluid {
        border: 2px solid black;
        background-image: url('./src/lib/assets/bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
    }

    .pageicon {
        width: 100px;
        height: 100px;
        background-image: url('./src/lib/assets/icon.png');
        background-size: contain;
        background-repeat: no-repeat;
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

    .inputform {
        text-align: center;
        justify-content: center;
    }

    .form {
        font-family: Arial;
        color: black;
    }

    .red {
        color: red;
        text-align: center;
    }
</style>