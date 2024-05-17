<script lang="ts">
    import * as SemStore from '$lib/stores/SemesterStores';
    import { Semester } from '$lib/models/types';
    import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
    import TablerX from '~icons/tabler/x';
    // eslint-disable-next-line init-declarations

    const modalStore = getModalStore();
    const semStore = SemStore.get();
    let ifHover = false;
    let ref = '';

    const removeSemModal: ModalSettings = {
        type: 'confirm',
        // Data
        title: 'Confirm Removal',
        body: 'Are you sure you wish to remove the current semester?',
        modalClasses: '!bg-secondary-400',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => {
            if (r) {
                semStore.removeSemester(id);
                window.location.href = '/student/grades';
            } else {
                window.location.href = '/student/grades';
            }
        },
    };

    export let data: Semester;
    $: ({ details, id, subjects } = data);
    $: ({ gwa, sem, units, year } = details);
</script>

<a
    class="block card p-5 variant-filled-primary shadow-md border border-tertiary-300"
    href="/student/grades/{id}"
    on:mouseenter={() => {
        ifHover = true;
    }}
    on:mouseleave={() => {
        ifHover = false;
    }}
>
    {#if ifHover}
        <button
            class="absolute -top-2 -right-2 p-2 bg-red-400 rounded-2xl"
            on:click={() => {
                modalStore.trigger(removeSemModal);
            }}
        >
            <TablerX />
        </button>
    {/if}
    <div class="">{sem ?? '--'}, AY {year ?? '----'}</div>
    <div class="">{units ?? 0} units</div>
    <div class="font-bold text-xl pt-2">GWA: {gwa?.toFixed(4) ?? 0}</div>
</a>
