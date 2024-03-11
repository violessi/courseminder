<script>
    import Card from '$lib/components/Card.svelte';
    import { fade } from 'svelte/transition';
    import { isOverlayOpen } from '$lib/stores/OverlayStore.js';
</script>

<div
    class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50 z-10"
    transition:fade={{ duration: 200 }}
>
    <Card
        width="w-1/3 rounded-lg"
        padding="p-4 gap-3"
        flex="flex flex-col"
        text="text-tertiary-700"
        items="items-center"
    >
        <div class="font-bold text-2xl">Add Semester</div>
        <div class="flex flex-col gap-3 w-full">
            <input type="text" class="input" placeholder="Semester" />
            <input type="text" class="input" placeholder="Year" />
            <div class="flex justify-center gap-10">
                <button
                    type="button"
                    class="btn bg-secondary-400 text-white text-lg py-2 px-4 gap-1 rounded-md"
                    on:click={() => {
                        isOverlayOpen.set(false);
                    }}>Done</button
                >
                <button
                    type="button"
                    class="btn bg-secondary-400 text-white text-lg py-2 px-4 gap-1 rounded-md"
                    on:click={() => {
                        isOverlayOpen.set(false);
                    }}>Cancel</button
                >
            </div>
        </div>
    </Card>
</div>
