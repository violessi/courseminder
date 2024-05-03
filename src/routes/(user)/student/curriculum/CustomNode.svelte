<script lang="ts">
    import { writable } from 'svelte/store';
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
    import { statusData } from '$lib/stores/CurriculumStores';
    import { type SpecificCourseStatus } from '$lib/models/types';
    type $$Props = NodeProps;
    export let data: $$Props['data'];
    console.log(data.name)

    let status : SpecificCourseStatus;
    statusData.subscribe((value : any) => {
        console.log(value);
        status = value;
    });

</script>

<div class="node shadow-md rounded-md border border-stone-400
    {status[data.name] === 'Taken' ? 'bg-secondary-500' : 
        status[data.name] === 'Not Taken' ? 'bg-primary-900' : 
        status[data.name] === 'Taking' ? 'bg-secondary-700' : 
        status[data.name] === 'To Take' ? 'bg-primary-50' : 'bg-secondary-500'}"
    style="height: {data.height}px; width: {data.width}px;">
        <div class="text-fsize font-bold">{data.name}</div>
    {#if data.isSource}
        <Handle type="source" position={Position.Bottom} />
        <!-- style= "background: green" -->
    {/if}
    {#if data.isTarget}
        <Handle type="target" position={Position.Top} />
    {/if}
</div>


<style>
    .text-fsize{
        font-size: 18px;
    }

    .node{
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding: 10px; */
    }
</style>