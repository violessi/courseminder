<script>
    import icon2 from '$lib/assets/icon2.png';
</script>

<style>
.font-michroma {
    font-family: "Michroma", sans-serif;
    font-weight: 400;
    font-style: normal;
}
.font-moul {
font-family: "Moul", serif;
font-weight: 400;
font-style: normal;
}

.background{
    background-image: url('$lib/assets/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
.black-film {
background: rgba(0, 0, 0, 0.5);
}

.button-student{
    background-color:#E7F8E9 ;
    border: none;
    color: #284C3B;
    padding: 10px 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    border-radius: 94px;
    cursor: pointer;
    width: 310px;
    height: 115px;
}

.button-faculty{
    background-color:#E7F8E9 ;
    border: none;
    color: #EF2152;
    padding: 10px 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    border-radius: 94px;
    cursor: pointer;
    width: 310px;
    height: 115px;
}
</style>

<body class="background">
<div class="black-film">
    <p>&nbsp</p>
    <img src={icon2} alt="Icon" class="w-20 h-11 ml-4 mb-0" />
    <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
    <div class= "flex flex-col items-center justify-center h-screen">
        <p class="text-6xl font-moul mb-10">Are you a</p> 
        <div class="flex space-x-4 mt-4 mb-28">
            <a href="/student/signup" class="button-student font-moul ">Student</a>
            <span class="font-moul text-6xl mt-7">or</span>
            <a href="/faculty/signup" class="button-faculty font-moul ">Faculty</a>
        </div>
    </div>
</div>
</body>




