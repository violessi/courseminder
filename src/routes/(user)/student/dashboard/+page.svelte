<script>
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    let value = 10; // %
</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div class="text-emerald-950">
        <div class="font-bold text-4xl">Welcome, Bea!</div>
        <div class="text-2xl">A.Y. 2022-2023, First Semester</div>
    </div>
    <!-- Cards (see Skeleton for more information) -->
    <section class="grid grid-cols-2 grid-rows-4 gap-5 h-full">
        <!-- Card for Your Classes -->
        <div class="card row-span-4 flex flex-col items-center p-4 shadow variant-filled-primary">
            <div class="font-bold text-xl uppercase">Your Classes</div>
            <div class="flex flex-col pt-5 gap-3 text-lg">
                <div>CS 140</div>
                <div>CS 150</div>
                <div>CS 180</div>
            </div>
        </div>
        <!-- Card for Your Progress -->
        <div class="card row-span-3 flex flex-col items-center gap-10 p-4 shadow variant-filled-primary">
            <div class="font-bold uppercase text-xl">Your Course Progress</div>
            <div class="relative w-72 h-72 mx-auto">
                <ProgressRadial
                    {value}
                    stroke={100}
                    meter="stroke-secondary-500"
                    track="stroke-surface-800/30"
                    fill="fill-secondary-900"
                    font={100}
                    width="w-full h-full"
                ></ProgressRadial>
                <div class="absolute inset-0 flex items-center justify-center flex-col">
                    <div class="text-5xl text-center text-secondary-900 font-semibold">
                        {value}%
                    </div>
                    <div class="text-xl text-center">
                        complete
                    </div>
                </div>
            </div>
        </div>
        <!-- Card for Current Standing -->
        <div class="card row-span-1 flex flex-col items-center gap-5 pt-3 shadow variant-filled-primary">
            <div class="font-bold uppercase text-xl">Your Current Standing</div>
            <div class="text-4xl">Cum Laude</div>
        </div>
    </section>
</div>
