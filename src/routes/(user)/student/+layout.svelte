<script lang="ts">
    import * as SemStore from '$lib/stores/SemesterStores';
    import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import icon from '$lib/assets/icon.webp';
    import { page } from '$app/stores';
    import DashboardIcon from '~icons/tabler/layout-dashboard';
    import CurriculumIcon from '~icons/tabler/calendar-user';
    import GradesIcon from '~icons/tabler/report-analytics';
    import LogoutIcon from '~icons/tabler/logout-2';
    import { studentId, studentDegree } from '$lib/stores/CurriculumStores';
    import { navigate } from 'svelte-routing';

    function logout() {
        studentId.set('');
        studentDegree.set('');
        navigate('../../');
    }   

    SemStore.init();
</script>

<AppShell class="bg-surface-500">
    <AppRail
        slot="sidebarLeft"
        width="w-28"
        gap="gap-5"
        regionLead="flex justify-center items-center p-2"
        background="bg-secondary-500 text-slate-400/45"
        active="bg-tertiary-500/50 text-white"
    >
        <img src={icon} alt="Icon" slot="lead" class="size-24" />
        <AppRailAnchor href="/student/dashboard" selected={$page.url.pathname === '/student/dashboard'}>
            <DashboardIcon slot="lead" class="size-10" />
            <span class="text-base">Dashboard</span>
        </AppRailAnchor>
        <AppRailAnchor href="/student/curriculum" selected={$page.url.pathname === '/student/curriculum'}>
            <CurriculumIcon slot="lead" class="size-10" />
            <span class="text-base">Curriculum</span>
        </AppRailAnchor>
        <AppRailAnchor href="/student/grades" selected={$page.url.pathname === '/student/grades'}>
            <GradesIcon slot="lead" class="size-10" />
            <span class="text-base">Grades</span>
        </AppRailAnchor>

        <AppRailAnchor on:click={logout} href="../../" slot="trail">
            <LogoutIcon slot="lead" class="size-10" />
            <span class="text-base">Log-out</span>
        </AppRailAnchor>
    </AppRail>

    <slot />
</AppShell>
