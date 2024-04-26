<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from '../$types';
	import PlayerForm from '$lib/components/PlayerForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let data: PageData;

	let playerFormOpen: boolean = false;

	const togglePlayerForm = () => {
		playerFormOpen = !playerFormOpen;
	};
</script>

<PlayerForm openDialog={playerFormOpen} toggleDialog={togglePlayerForm} />

<PageHeader title="Players">
	<div slot="right" class="place-self-end">
		<button
			on:click={togglePlayerForm}
			class="px-6 py-px border rounded bg-green-500/30 border-green-300/10"
		>
			<Icon name="plus" size={20} />
		</button>
	</div>
</PageHeader>

<h1 class="mb-2 text-center">Click on a player to see the stats</h1>

<div class="grid grid-cols-2 gap-2 px-2">
	{#each data.playersList as player}
		<a
			href={`/players/${player.name}`}
			class="px-4 py-2 font-bold text-center border rounded border-gray-700/10 bg-gray-900/50"
		>
			{player.name}
		</a>
	{/each}
</div>
