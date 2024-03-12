<script lang="ts">
    import type { SvelteComponent } from 'svelte';

    // Stores
    import { getModalStore } from '@skeletonlabs/skeleton';

    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    // Props
    /** Exposes parent props to this component. */
    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    // Form Data
    const formData = {
        semester: '',
        year: '',
    };

    let message = '';
    let regex = /[0-9]+-[0-9]+/i;

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(formData);
        modalStore.close();
    }

    const handleSubmit = (e: Event) => {
        if (!formData.semester || !formData.year) {
            e.preventDefault();
            message = 'Please fill out all fields.';
        } else if (!regex.test(formData.year)) {
            e.preventDefault();
            message = 'Invalid academic year. Please use the format "YYYY-YYYY".';
        } else {
            onFormSubmit();
        }
    };

    // Base Classes
    const cBase =
        ' p-4 w-modal shadow-xl space-y-4 bg-secondary-400 rounded-container-token border border-tertiary-900';
    const cHeader = 'text-2xl font-bold text-center';
    const cForm = 'border border-tertiary-900 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <!-- Enable for debugging: -->
        <div class={cForm}>
            <div class="flex place-items-center">
                <div class="w-1/4">Semester:</div>
                <ListBox
                    class="flex items-center justify-self-start"
                    background=""
                    spacing="space-y-0"
                    regionDefault="text-center"
                >
                    <ListBoxItem bind:group={formData.semester} name="1st" value="1st">1st</ListBoxItem>
                    <ListBoxItem bind:group={formData.semester} name="2nd" value="2nd">2nd</ListBoxItem>
                    <ListBoxItem bind:group={formData.semester} name="Midyear" value="Midyear">Midyear</ListBoxItem>
                </ListBox>
            </div>

            <form class="modal-form">
                <label class="label flex place-items-center gap-5">
                    <div class="w-1/4">Academic Year:</div>
                    <input class="input" type="text" bind:value={formData.year} required placeholder="YYYY-YYYY" />
                </label>
            </form>
        </div>
        {#if message}
            <div class="text-error-200 text-center">{message}</div>
        {/if}

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={modalStore.close}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={handleSubmit}>Done</button>
		</footer>
    </div>
{/if}
