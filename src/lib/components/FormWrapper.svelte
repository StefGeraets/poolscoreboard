<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let formOpen: boolean = false;
	export let toggleForm: () => void;
</script>

{#if formOpen}
	<div class="fixed z-10 grid w-screen h-screen grid-cols-1 grid-rows-1 px-4 overscroll-none">
		<button
			class="absolute inset-0 bg-black/60 backdrop-blur"
			on:click={toggleForm}
			in:fade={{ duration: 200 }}
			out:fade={{ delay: 100 }}
		>
		</button>
		<button
			class="absolute right-6 top-6"
			on:click={toggleForm}
			in:fly={{ y: -50, delay: 250 }}
			out:fly={{ y: -50, delay: 100 }}
		>
			<Icon size={32} name="x" />
		</button>

		<slot />
	</div>
{/if}
