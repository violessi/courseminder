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
</style>

<body class="background">
    <img src={icon2} alt="Icon" class="w-20 h-11 ml-4 mt-4 mb-0" />
    <p class="font-michroma mt-0 text-[9px] ml-4">CourseMinder</p>
    <div class= "flex flex-col items-center justify-center h-screen">
        <p class="text-6xl font-moul">Are you a</p> 
        <div class="grid grid-cols gap-4">
            <button type="button" class="btn btn-xl variant-filled">Student</button>
            <button type="button" class="btn btn-xl variant-filled">Faculty</button>
        </div>
    </div>
</body>




