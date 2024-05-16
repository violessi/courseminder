<script lang="ts">
    import '../app.postcss';
    import { Modal, type ModalComponent, initializeStores } from '@skeletonlabs/skeleton';
    import AddGrade from '$lib/components/AddGrade.svelte';
    import AddSem from '$lib/components/AddSem.svelte';
    import EditGrade from '$lib/components/EditGrade.svelte';

    initializeStores();

    const modalRegistry: Record<string, ModalComponent> = {
        addsem: { ref: AddSem },
        addgrade: { ref: AddGrade },
        editgrade: { ref: EditGrade },
    };
</script>

<Modal components={modalRegistry} />
<slot />
