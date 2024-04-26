<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Podium from '$lib/components/Podium.svelte';
	import { filterPlayers, type FilterOptions, type CompareOptions } from '$lib/utils/playerHelpers';
	import { compare } from '$lib/stores';
	import Icon from '$lib/components/Icon.svelte';
	import DialogWrapper from '$lib/components/DialogWrapper.svelte';
	import Info from '$lib/components/Info.svelte';
	import RankCard from '$lib/components/RankCard.svelte';

	export let data: PageData;

	let currentFilter: FilterOptions = 'score';
	let ready: boolean = false;
	let filterOpen: boolean = false;
	let openInfo: boolean = false;

	const filterOptions: FilterOptions[] = ['score', 'wins', 'losses', 'total'];

	$: firstPlayer = playerData.slice(0, 1)[0];
	$: secondPlayer = playerData.slice(1, 2)[0];
	$: thirdPlayer = playerData.slice(2, 3)[0];

	onMount(() => (ready = true));

	const openFilter = (): void => {
		filterOpen = !filterOpen;
	};

	const toggleInfo = (): void => {
		openInfo = !openInfo;
	};

	const setCompare = (type: CompareOptions) => {
		compare.set(type);
	};

	$: playerData = filterPlayers(currentFilter, data.players);
</script>

<DialogWrapper openDialog={openInfo} toggleDialog={toggleInfo}>
	<Info />
</DialogWrapper>

<PageHeader title="Pool Scoreboard">
	<div slot="left">
		<button class="relative text-gray-400" on:click={toggleInfo}>
			<Icon name="info" class="absolute inset-0 text-blue-500 opacity-75 animate-ping" />
			<Icon name="info" />
		</button>
	</div>
	<div class="self-center" slot="right">
		<button
			class="relative flex items-center w-full gap-1 px-2 py-1 text-xs tracking-wide text-gray-300 uppercase bg-gray-900 rounded-t"
			class:rounded-b={!filterOpen}
			on:click|preventDefault={openFilter}
		>
			{currentFilter}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-3 h-3 ml-auto transition-transform"
				class:-rotate-180={filterOpen}
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M6 9l6 6l6 -6" />
			</svg>
			{#if filterOpen}
				<div
					class="absolute right-0 z-20 flex flex-col items-start w-full bg-gray-900 border-t rounded-b top-full border-t-gray-950"
					transition:slide
				>
					{#each filterOptions as filter}
						<button
							class="px-2 py-1.5 flex gap-2 items-center capitalize"
							class:text-gray-500={currentFilter === filter}
							on:click|preventDefault={() => (currentFilter = filter)}
						>
							<span
								class="block w-1 h-1 bg-blue-300 rounded-full opacity-0 indicator"
								class:opacity-100={currentFilter === filter}
							></span>
							{filter}
						</button>
					{/each}
				</div>
			{/if}
		</button>
	</div>
</PageHeader>

<section
	class="grid grid-cols-3 mx-4 mb-10 overflow-hidden text-xs text-gray-500 border rounded bg-gray-900/20 border-gray-800/30"
>
	<button
		on:click={() => setCompare('daily')}
		class="py-1 uppercase"
		class:bg-gray-900={$compare === 'daily'}
		class:text-blue-400={$compare === 'daily'}
	>
		daily
	</button>
	<button
		on:click={() => setCompare('weekly')}
		class="py-1 uppercase"
		class:bg-gray-900={$compare === 'weekly'}
		class:text-blue-400={$compare === 'weekly'}
	>
		weekly
	</button>
	<button
		on:click={() => setCompare('monthly')}
		class="py-1 uppercase"
		class:bg-gray-900={$compare === 'monthly'}
		class:text-blue-400={$compare === 'monthly'}
	>
		monthly
	</button>
</section>

<div class="grid grid-cols-3 items-end gap-2 px-4 h-[180px] lg:max-w-2xl mx-auto">
	{#if ready}
		<Podium player={secondPlayer} place={2} />
		<Podium player={firstPlayer} place={1} />
		<Podium player={thirdPlayer} place={3} />
	{/if}
</div>

{#each playerData.slice(3, -1) as player, index}
	<RankCard {player} {index} />
{/each}

<div class="pb-2"></div>

<style lang="postcss">
	.indicator {
		box-shadow: 0 0 6px 0 rgb(147 197 253);
	}
</style>
