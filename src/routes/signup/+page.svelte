<script>

</script>

<div class = "background">
  <div class = "pageicon">
  </div>
  <div class = "SignUpContainer">
    <form class="max-w-sm mx-auto">
      <div class = "CreateAccountShape">
        <p class = "TTCommons-Regular-14">
          CREATE ACCOUNT
        </p>
      </div>
      <br>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.4l1.4.7a7.7 7.7 0 0 0 .7.3 21 21 0 0 0 16.4-.3l1.5-.7V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.4 7.9.6-.3V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.4l.6.3a10 10 0 0 0 .7.3 23 23 0 0 0 18-.3h.1L21 13l.4.9ZM12 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd"/>
              </svg>
          </div>
          <select id="degree" class="bg-green-50 text-green-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-green dark:focus:ring-green-500 dark:focus:border-green-500" placeholder ="Degree Program">
            <option>Computer Science</option>
            <option>Civil Engineering</option>
          </select>
          </div>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
              </svg>
              
          </div>
          <input type="name" id="name" class="bg-green-50 text-green-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-green dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Full Name">
        </div>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg class="w-4 h-4 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 5.6V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V5.6l-.9.7-7.9 6a2 2 0 0 1-2.4 0l-8-6-.8-.7Z"/>
                  <path d="M20.7 4.1A2 2 0 0 0 20 4H4a2 2 0 0 0-.6.1l.7.6 7.9 6 7.9-6 .8-.6Z"/>
                </svg>
                
            </div>
            <input type="studentnumber" id="studentnumber" class="bg-green-50 text-green-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-green dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Student Number">
          </div>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clip-rule="evenodd"/>
              </svg>
          </div>
          <input type="password" id="password" class="bg-green-50 text-green-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:bg-green-100 dark:border-green-600 dark:placeholder-gray-400 dark:text-green dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Password">
        </div>
          
        <p class="TTCommons-Regular-14">
        <br>
        Already have an account? <a class="hyperlink" href="/login"
            >Login here.</a>
        </p>
        <br>
        <div class = "SignupButtonShape">
          <button type="submit" class="SignupButton"> SIGN UP </button>
        </div>
        
        
      </form>
      <div class = "SignUpRightContainer" >
        <p class = "TTCommons-Regular-14">
            <br>
          WELCOME TO COURSEMINDER!
        </p>
      </div>
  </div>
</div>


  
<style>
  .background {
    border: 1px solid black;
    background-image: url('./src/lib/assets/bg2.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
  }

  .hyperlink {
    color: #226004;
  }

  .TTCommons-Regular-14 {
        font-family: Arial;
        font-size: 14px;
        color: black;
        letter-spacing: -0.04em;
    }
  
  .SignUpContainer {
    border: 4px solid #284C3B;
    border-radius: 25px;
    background: linear-gradient(to right, #FFFFFF 50%, rgba(177,226,197,0.4) 0%);
    display: flex;
    align-items: center;
    text-align: center;
    left: 0px;
    margin-top: 10px;
    margin-left: 180px;
    margin-right: 270px;
  }

  .SignUpRightContainer {
    width: 325px;
    height: 400px;
    display: flex;
    margin: 0 auto;
    align-items: top;
    text-align: center;
    background-image: url('./src/lib/assets/girl.png');
    background-position: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    justify-content: center;

  }

  .SignupButton {
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
        font-size: 25px;
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

  .CreateAccountShape {
    background-color: #86D295;
    border-radius: 25px;
    height: 50px;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 12px 0;
  }
  
</style>
