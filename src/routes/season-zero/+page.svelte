<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { slide } from 'svelte/transition';
	import { Prisma } from '@prisma/client';

	type WinLose = {
		id: number;
		name: string;
		amountOfGames: number;
		wins: number;
		losses: number;
		kd: number;
	};

	type SortType = 'byWins' | 'byTotal' | 'byKD' | 'byLosses';

	export let data;

	let playerData = data.players;
	let winsLosses: WinLose[] = data.winsLosses;

	let playerSort: SortType = 'byWins';

	$: sortedPlayersData = (
		playerData: Prisma.PlayerGetPayload<{ include: { team: true } }>[],
		winsLosses: WinLose[],
		sortType: SortType
	): {
		id: number;
		name: string;
		teamName: string;
		kd: number;
		wins: number;
		losses: number;
		totalGames: number;
	}[] => {
		const combinedPlayerData = playerData.map((player) => {
			const playerStats = winsLosses.find((match) => match.id === player.id);

			return {
				id: player.id,
				name: player.name,
				teamName: player.team.name,
				kd: playerStats!.kd,
				wins: player.wins,
				losses: playerStats!.losses,
				totalGames: playerStats!.amountOfGames
			};
		});

		if (sortType === 'byKD') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.kd < p2.kd ? 1 : -1;
			});
		}

		if (sortType === 'byTotal') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.totalGames < p2.totalGames ? 1 : -1;
			});
		}

		if (sortType === 'byLosses') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.losses < p2.losses ? 1 : -1;
			});
		}

		return combinedPlayerData;
	};
</script>

<PageHeader title="Season 0 standings" />

<div class="container p-0.5 mx-auto">
	<section
		class="self-start p-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<header class="flex justify-between align-middle">
			<h2 class="mb-4 text-lg font-bold uppercase">Players</h2>
		</header>
		<div
			class="grid items-center grid-cols-4 mb-2 overflow-hidden text-gray-500 border border-gray-800 rounded bg-gray-950"
		>
			<button
				on:click={() => (playerSort = 'byWins')}
				disabled={playerSort === 'byWins'}
				class="py-1 text-sm tracking-wide uppercase disabled:text-blue-300 disabled:bg-gray-800"
			>
				Wins
			</button>
			<button
				on:click={() => (playerSort = 'byLosses')}
				disabled={playerSort === 'byLosses'}
				class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
			>
				Losses
			</button>
			<button
				on:click={() => (playerSort = 'byKD')}
				disabled={playerSort === 'byKD'}
				class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
			>
				KD
			</button>
			<button
				on:click={() => (playerSort = 'byTotal')}
				disabled={playerSort === 'byTotal'}
				class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
			>
				Total
			</button>
		</div>

		{#each sortedPlayersData(playerData, winsLosses, playerSort) as player, index}
			<div
				transition:slide
				class="relative grid items-center w-full grid-cols-3 py-2 overflow-hidden border-gray-800 group"
				class:border-b={index + 1 !== playerData.length}
			>
				<a href={`/player/${player.name}`}>
					{index + 1}
					.
					{#if index + 1 === 1 && player.wins !== 0}
						🏆
					{/if}
					<span class="font-bold">{player.name}</span>
				</a>
				<div class="text-sm text-center">
					{player.teamName}
				</div>
				<div class="grid items-center grid-cols-2 text-end">
					<span class="text-xs text-gray-400">KD: {player.kd}</span>
					<div class="flex items-center justify-end gap-1">
						<div class="text-xs">
							<span class="text-red-600">{player.losses}</span>
							\
						</div>
						<span class="font-bold text-green-500">{player.wins}</span>
					</div>
				</div>
			</div>
		{/each}
	</section>
</div>
