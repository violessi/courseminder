<script lang="ts">
    import '../app.postcss';

    import { initializeStores } from '@skeletonlabs/skeleton';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

    import AddSem from '$lib/components/AddSem.svelte';
    import AddGrade from '$lib/components/AddGrade.svelte';

    initializeStores();
    const modalStore = getModalStore();

    const modalRegistry: Record<string, ModalComponent> = {
        // Set a unique modal ID, then pass the component reference
        addsem: { ref: AddSem },
        addgrade: { ref: AddGrade },
        // ...
    };
</script>

<Modal components={modalRegistry} />
<slot />
