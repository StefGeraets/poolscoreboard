<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<PageHeader title="Players" />

<h1 class="mb-2 text-center">Click on a player to see the stats</h1>

<div class="grid grid-cols-2 gap-2 px-2">
	{#each data.playersList as player}
		<a
			href={`/players/${player.name}`}
			class="px-4 py-2 text-center uppercase border rounded border-gray-700/20 bg-gray-900/50"
		>
			{player.name}
		</a>
	{/each}
</div>
