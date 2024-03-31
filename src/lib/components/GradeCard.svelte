<script lang="ts">
    import { Semester } from '$lib/models/types';
    // eslint-disable-next-line init-declarations
    export let data: Semester;
    $: ({ details, id, subjects } = data);
    $: ({ gwa, sem, units, year } = details);
    console.log(data);
    console.log(gwa);
    console.log(sem);
    console.log(units);
    console.log(year);
</script>

<a
    class="block card card-hover p-5 variant-filled-primary shadow-md border border-tertiary-300"
    href="/student/grades/{id}"
>
    <div class="">{sem ?? '--'}, AY {year ?? '----'}</div>
    <div class="">{units ?? 0} units</div>
    <div class="font-bold text-xl pt-2">GWA: {gwa?.toFixed(4) ?? 0}</div>
</a>
