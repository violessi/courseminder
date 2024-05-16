<script lang="ts">
    import '../app.postcss';
    import { Modal, type ModalComponent, initializeStores } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import AddGrade from '$lib/components/AddGrade.svelte';
    import AddSem from '$lib/components/AddSem.svelte';
    import EditGrade from '$lib/components/EditGrade.svelte';
    import { storePopup } from '@skeletonlabs/skeleton';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    initializeStores();

    const modalRegistry: Record<string, ModalComponent> = {
        addsem: { ref: AddSem },
        addgrade: { ref: AddGrade },
        editgrade: { ref: EditGrade },
    };
</script>

<Modal components={modalRegistry} />
<slot />
