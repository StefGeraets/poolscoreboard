<script lang="ts">
  type SpanOptions = 1 | 2 | 3;

  let className: string = '';
  export { className as class };

  export let span: SpanOptions = 1
  export let showModal: (() => void) | undefined = undefined;

  const setColSpan = (span: SpanOptions) => {
    switch (span) {
      case 1: return "lg:col-span-1"
      case 2: return "lg:col-span-2"
      case 3: return "lg:col-span-3"
      default:
        return "col-span-1"
    }
  }
  $: colSpan = setColSpan(span)
</script>

<section 
  class="bg-gray-900 rounded-lg border border-gray-800 p-4 {colSpan} md:col-span-1 tabular-nums self-start {className || ''}"
>
  <header class="flex justify-between align-middle">
    <h2 class="uppercase text-lg font-bold mb-4">
      <slot name="title">Default card title</slot>
    </h2>
    {#if showModal}
      <button 
        class="rounded h-7 w-7 flex justify-center items-center bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400"
        on:click={showModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      </button>
    {/if}
  </header>
  <slot />
</section>