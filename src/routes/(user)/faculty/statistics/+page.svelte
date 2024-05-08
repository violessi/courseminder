<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import table from '$lib/assets/sampletable.png';

</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div class="text-error-900">
        <div class="font-bold text-4xl">Semester</div>
        <div class="relative">
            <div class="absolute inset-y-11 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
            </div>
        <br>
            <select
            id="degree"
            class="bg-pink-50 text-black-900 text-sm w-72 rounded-lg block dark:bg-pink-100 dark:border-pink-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
        >
            <option disabled selected value="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2023-2024 2nd Semester</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2023-2024 1st Semester</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2022-2023 2nd Semester</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2022-2023 1sd Semester</option>
            </select>
        </div>
        
    </div>
    <!-- Cards (see Skeleton for more information) -->
    <section class="grid grid-cols-1 grid-rows-4 gap-5 h-full">
        <!-- Card for Your Classes -->
        <Card background= bg-primary-300 height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4" >
            <div class="font-bold text-error-900 text-xl uppercase">Classes</div>
            <!-- insert table function here-->
            <img src={table} alt='yeah'>
        </Card>
    </section>
</div>