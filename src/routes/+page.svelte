<script lang="ts">
	import PlayerCard from './PlayerCard.svelte';
	import { onMount } from 'svelte';
	import PageHeader from '../lib/components/PageHeader.svelte';
	import type { Player } from '@prisma/client';
	import Podium from '../lib/components/Podium.svelte';
	import { slide } from 'svelte/transition';

	type FilterOptions = 'score' | 'wins' | 'losses' | 'total';
	type CompareOptions = 'daily' | 'weekly' | 'monthly';

	export let data;

	let currentFilter: FilterOptions = 'score';
	let ready: boolean = false;
	let filterOpen: boolean = false;
	let compareOption: CompareOptions = 'weekly';

	const filterOptions: FilterOptions[] = ['score', 'wins', 'losses', 'total'];

	$: firstPlayer = playerData.slice(0, 1)[0];
	$: secondPlayer = playerData.slice(1, 2)[0];
	$: thirdPlayer = playerData.slice(2, 3)[0];

	onMount(() => (ready = true));

	const openFilter = (): void => {
		filterOpen = !filterOpen;
	};

	const sortedPlayersData = (sortType: FilterOptions, players: Player[]): Player[] => {
		if (sortType === 'wins') {
			return players.sort((p1, p2) => {
				if (p1.s1_wins < p2.s1_wins) return 1;
				if (p1.s1_wins > p2.s1_wins) return -1;

				if (p1.s1_score < p2.s1_score) return 1;
				if (p1.s1_score > p2.s1_score) return -1;

				return 0;
			});
		}

		if (sortType === 'total') {
			return players.sort((p1, p2) => {
				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				if (p1.s1_score < p2.s1_score) return 1;
				if (p1.s1_score > p2.s1_score) return -1;

				return 0;
			});
		}

		if (sortType === 'losses') {
			return players.sort((p1, p2) => {
				if (p1.s1_lossess < p2.s1_lossess) return 1;
				if (p1.s1_lossess > p2.s1_lossess) return -1;

				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				return 0;
			});
		}

		if (sortType === 'score') {
			return players.sort((p1, p2) => {
				if (p1.s1_score < p2.s1_score) return 1;
				if (p1.s1_score > p2.s1_score) return -1;

				if (p1.s1_wins < p2.s1_wins) return 1;
				if (p1.s1_wins > p2.s1_wins) return -1;

				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				return 0;
			});
		}

		return players;
	};

	$: playerData = sortedPlayersData(currentFilter, data.players);
</script>

<PageHeader title="Pool Scoreboard">
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
	class="grid grid-cols-3 mx-4 mb-8 overflow-hidden text-xs text-gray-500 border rounded bg-gray-900/20 border-gray-800/30"
>
	<button
		on:click={() => (compareOption = 'daily')}
		class="py-1 uppercase"
		class:bg-gray-900={compareOption === 'daily'}
		class:text-blue-400={compareOption === 'daily'}>daily</button
	>
	<button
		on:click={() => (compareOption = 'weekly')}
		class="py-1 uppercase"
		class:bg-gray-900={compareOption === 'weekly'}
		class:text-blue-400={compareOption === 'weekly'}>weekly</button
	>
	<button
		on:click={() => (compareOption = 'monthly')}
		class="py-1 uppercase"
		class:bg-gray-900={compareOption === 'monthly'}
		class:text-blue-400={compareOption === 'monthly'}>monthly</button
	>
</section>

<div class="grid grid-cols-3 items-end gap-2 px-4 h-[180px] lg:max-w-2xl mx-auto">
	{#if ready}
		<Podium player={secondPlayer} place={2} />
		<Podium player={firstPlayer} place={1} />
		<Podium player={thirdPlayer} place={3} />
	{/if}
</div>

<PlayerCard playerData={playerData.slice(3, -1)} />

<div class="pb-2"></div>

<style lang="postcss">
	.indicator {
		box-shadow: 0 0 6px 0 rgb(147 197 253);
	}
</style>
