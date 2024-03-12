<script>
    import { SemesterStore } from '$lib/stores/SemesterStores';

    let num = $SemesterStore[0];
    console.log(num);
</script>

<a
    class="block card card-hover p-5 variant-filled-primary shadow-md border border-tertiary-300"
    href="/student/grades/edit"
>
    <slot />
</a>
