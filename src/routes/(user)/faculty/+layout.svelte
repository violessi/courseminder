<script lang="ts">
    import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import Dashboard from '~icons/tabler/layout-dashboard';
    import Stats from '~icons/tabler/square-rounded-percentage';
    import Logout from '~icons/tabler/logout-2';
    import icon from '$lib/assets/icon.webp';
    import { page } from '$app/stores';
    import { facultyDegree, facultyId } from '$lib/stores/CurriculumStores';
    import { navigate } from 'svelte-routing';

    function logout() {
        facultyId.set('');
        facultyDegree.set('');
        navigate('../../');
    }   

    // const course: string = 'BS Computer Science';
    // const studentNumber: string = '2020-12345';

</script>

<AppShell class="bg-primary-100">
    <AppRail
        slot="sidebarLeft"
        width="w-28"
        gap="gap-5"
        regionLead="flex justify-center items-center p-2"
        background="bg-primary-50 text-slate-400/45"
        active="bg-primary-200/50 text-white"
    >
        <img src={icon} alt="Icon" slot="lead" class="size-24" />
        <AppRailAnchor href="/faculty/dashboard" selected={$page.url.pathname === '/faculty/dashboard'}>
            <Dashboard slot="lead" class="size-10" />
            <span class="text-sm">Demand</span>
        </AppRailAnchor>
        <AppRailAnchor href="/faculty/statistics" selected={$page.url.pathname === '/faculty/statistics'}>
            <Stats slot="lead" class="size-10" />
            <span class="text-sm">Rate</span>
        </AppRailAnchor>

        <AppRailAnchor on:click={logout} href="../../" slot="trail">
            <Logout slot="lead" class="size-10" />
            <span class="text-sm">Log-out</span>
        </AppRailAnchor>
    </AppRail>

    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
</AppShell>
