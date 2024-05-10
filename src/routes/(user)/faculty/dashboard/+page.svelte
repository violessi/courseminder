<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import graph from '$lib/assets/samplegraph.png';
</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div class="text-error-900">
        <div class="font-bold text-4xl">Welcome, Dr. Masayuki!</div>
        <div class="text-2xl pt-2">A.Y. 2023-2024, First Semester</div>
    </div>
    <!-- Cards (see Skeleton for more information) -->
    <section class="grid grid-cols-1 grid-rows-4 gap-5 h-full">
        <!-- Card for Your Classes -->
        <Card background= bg-primary-300 height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4" >
            <div class="font-bold text-error-900 text-xl uppercase">Demand</div>
            <!-- insert graph function here-->
            <img src={graph} alt="yeah"/>
        </Card>
    </section>
</div>
