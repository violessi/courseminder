<script lang="ts">
    import { AppBar, AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import { IconCalendarWeek, IconFileAnalytics, IconLayoutDashboard, IconLogout2 } from '@tabler/icons-svelte';
    import icon from '$lib/assets/icon.png';
    import { page } from '$app/stores';
    import { studentId } from './[studentnumber]/stores';

    const course: string = 'BS Computer Science';
    let studentNumber: string = '';

    studentId.subscribe(value => {
        studentNumber = value;
    });

    let urlDashboard = `/${studentNumber}/dashboard`;
    let urlCurriculum = `/${studentNumber}/curriculum`;
    let urlGrades = `/${studentNumber}/grades`;
</script>

<!-- Refer to the Skeleton Documentation to know what the following components are for. -->
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
        <AppRailAnchor href="{urlDashboard}" selected={$page.url.pathname === urlDashboard}>
            <IconLayoutDashboard slot="lead" size={36} />
            <span class="text-sm">Dashboard</span>
        </AppRailAnchor>
        <AppRailAnchor href="{urlCurriculum}" selected={$page.url.pathname === urlCurriculum}>
            <IconCalendarWeek slot="lead" size={36} />
            <span class="text-sm">Curriculum</span>
        </AppRailAnchor>
        <AppRailAnchor href="{urlGrades}" selected={$page.url.pathname === urlGrades}>
            <IconFileAnalytics slot="lead" size={36} />
            <span class="text-sm">Grades</span>
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
