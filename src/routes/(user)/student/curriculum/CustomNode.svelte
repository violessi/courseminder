<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
    export let data: $$Props['data'];
  </script>

<div class="node shadow-md rounded-md bg-secondary-500 border border-stone-400"
    style="height: {data.height}px; width: {data.width}px;">
        <div class="text-2xs font-bold">{data.name}</div>
    {#if data.isSource}
        <Handle type="source" position={Position.Bottom} />
        <!-- style= "background: green" -->
    {/if}
    {#if data.isTarget}
        <Handle type="target" position={Position.Top} />
    {/if}
</div>


<style>
    .text-2xs{
        font-size: 13px;
    }

    .node{
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding: 10px; */
    }
</style>