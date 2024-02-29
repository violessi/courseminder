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
        background-image: url('./src/lib/assets/bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    .black-film {
    background: rgba(0, 0, 0, 0.5);
    }
</style>

<body class="background">
    <div class="black-film">
        <p>&nbsp</p>
        <img src={icon2} alt="Icon" class="w-20 h-11 ml-4 mb-0" />
        <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
        <div class= "flex flex-col items-center justify-center h-screen">
            <p class="text-6xl font-moul">Are you a</p> 
            <div class="grid grid-cols gap-4">
                <a href="/student/login" class="btn variant-filled">Student</a>
                <a href="/faculty/login" class="btn variant-filled">Faculty</a>
            </div>
        </div>
    </div>
</body>




