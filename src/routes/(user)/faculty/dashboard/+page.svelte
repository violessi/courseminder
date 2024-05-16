<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import graph from '$lib/assets/samplegraph.png';

    import { initFirebase, db } from '$lib/firebase/client';
    import { ref, get, onValue } from 'firebase/database';
    import { facultyDegree, facultyName } from '$lib/stores/CurriculumStores';
    
    let degree : string;
    facultyDegree.subscribe((value : string) => {
        degree = value.split(' ').slice(2, 4).join(' ');
        console.log(degree);
    });


</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div>
        <div class="title-default-faculty">Welcome, Dr. Masayuki!</div>
        <div class="subtitle-default-faculty pt-2">Department of Computer Science</div>
    </div>
    <!-- Cards (see Skeleton for more information) -->
    <section class="grid grid-cols-1 grid-rows-4 gap-5 h-full">
        <!-- Card for Your Classes -->
        <Card background="bg-primary-300" height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4">
            <div class="font-bold text-error-900 text-xl uppercase">Demand</div>
            <!-- insert graph function here-->
            <img src={graph} alt="yeah" />
        </Card>
    </section>
</div>
