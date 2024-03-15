<script lang="ts">
    import { AppBar, AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import { IconChartBar, IconLayoutDashboard, IconLogout2 } from '@tabler/icons-svelte';
    import icon from '$lib/assets/icon.png';
    import { page } from '$app/stores';

    const course: string = 'BS Computer Science';
    const studentNumber: string = '2020-12345';
</script>


<!-- Refer to the Skeleton Documentation to know what the following components are for. -->
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
            <IconLayoutDashboard slot="lead" size={36} />
            <span class="text-sm">Dashboard</span>
        </AppRailAnchor>
        <AppRailAnchor href="/faculty/statistics" selected={$page.url.pathname === '/faculty/statistics'}>
            <IconChartBar slot="lead" size={36} />
            <span class="text-sm">Statistics</span>
        </AppRailAnchor>

        <AppRailAnchor href="../../" slot="trail">
            <IconLogout2 slot="lead" size={36} />
            <span class="text-sm">Log-out</span>
        </AppRailAnchor>
    </AppRail>

    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
</AppShell>
