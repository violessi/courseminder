<script lang="ts">
    import { focusTrap } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { safeParse } from 'valibot';
    import { Subject } from '$lib/models/types';
    import type { SvelteComponent } from 'svelte';

    // eslint-disable-next-line init-declarations
    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    let isFocused: boolean = false;

    // Form Data
    const formData: Subject = {
        className: $modalStore[0].meta.className ?? '',
        grade: $modalStore[0].meta.grade ?? 0,
        units: $modalStore[0].meta.units ?? 0,
    };

    let message = '';
    const gradesArray = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 4.0, 5.0];

    function clickedRemove(e: Event) {
        if ($modalStore[0].response) $modalStore[0].response(['remove', formData]);
        modalStore.close();
    }

    function clickedEdit(e: Event) {
        const res = safeParse(Subject, formData);
        if (!formData.grade || !formData.units) {
            e.preventDefault();
            message = 'Please fill out all fields.';
        } else if (!gradesArray.includes(formData.grade)) {
            e.preventDefault();
            message = 'Invalid grade. Please follow the UP Grading System format.';
        } else if (res.success) {
            if ($modalStore[0].response) $modalStore[0].response(['edit', formData]);
            modalStore.close();
        } else {
            e.preventDefault();
            message = 'Invalid input.';
        }
    }

    // Base Classes
    const cBase =
        ' p-4 w-modal shadow-xl space-y-4 bg-secondary-400 rounded-container-token border border-tertiary-900';
    const cHeader = 'text-2xl font-bold text-center';
    const cForm = 'border border-tertiary-900 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>Edit {$modalStore[0].meta.className}'s Grade</header>
        <!-- Enable for debugging: -->
        <div class={cForm}>
            <form class="modal-form" use:focusTrap={false}>
                <label class="label flex place-items-center gap-5">
                    <div class="w-1/4">Grade:</div>
                    <input
                        class="input text-tertiary-900"
                        type="number"
                        step="0.25"
                        min="1"
                        max="5"
                        bind:value={formData.grade}
                        required
                        placeholder="Enter class grade..."
                    />
                </label>
                <label class="label flex place-items-center gap-5">
                    <div class="w-1/4">Units:</div>
                    <input
                        class="input text-tertiary-900"
                        type="number"
                        min="1"
                        bind:value={formData.units}
                        required
                        placeholder="Enter class units..."
                    />
                </label>
            </form>
        </div>
        {#if message}
            <div class="text-error-400 text-center">{message}</div>
        {/if}

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNegative}" on:click={(e) => clickedRemove(e)}>Remove</button>
			<button class="btn {parent.buttonNeutral}" on:click={modalStore.close}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={(e) => clickedEdit(e)}>Done</button>
		</footer>
    </div>
{/if}
