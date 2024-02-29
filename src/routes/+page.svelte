<script>
    import icon2 from '$lib/assets/icon2.png';
    // import icon from '$lib/assets/icon.png';
    
</script>

<body class="background">
    <div class= "flex flex-col items-center justify-center h-screen">
        <img src={icon2} alt="CourseMinder Logo" class="w-80 h-48 me-6" />
        <h1 class="text-2xl font-michroma">CourseMinder</h1>
        <h2 class="text-lg mb-6 font-noto">"Stay Ahead. &nbsp Stay Focused."</h2>
        <div class="flex space-x-4">
            <a href="/choice/login" class="text-white text-xl font-noto">Login</a>
            <div class="border border-white ml-4 mt-3"></div>
            <a href="/choice/signup" class="text-white text-xl font-noto">Sign Up</a>
        </div>
        <!-- <a href="/student/dashboard" class="btn text-black variant-filled-primary">Student Dashboard</a> -->
    </div>  
</body>

<style>
    .font-michroma {
    font-family: "Michroma", sans-serif;
    font-weight: 400;
    font-style: normal;
    }
    .font-noto {
    font-family: "Noto Nastaliq Urdu", serif;
    font-optical-sizing: auto;
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