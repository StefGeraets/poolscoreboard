<script lang="ts">
	import PlayerCard from './PlayerCard.svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { expoInOut, quadOut } from 'svelte/easing';
	import type { Player } from '@prisma/client';

	type FilterOptions = 'score' | 'wins' | 'lossess' | 'winrate' | 'total';
	export let data;
	let currentFilter: FilterOptions = 'score';
	let ready: boolean = false;
	let filterOpen: boolean = false;

	const filterOptions: FilterOptions[] = ['score', 'wins', 'lossess', 'winrate', 'total'];

	type WinLose = {
		id: number;
		name: string;
		amountOfGames: number;
		wins: number;
		lossess: number;
		kd: number;
	};

	const totalScore = (teams: { score: number }[]) => {
		return teams.reduce((sum, team) => {
			return team.score + sum;
		}, 0);
	};
	$: total = totalScore(data.teams);
	$: firstPlayer = combinePlayer(data.players.slice(0, 1)[0]);
	$: secondPlayer = combinePlayer(data.players.slice(1, 2)[0]);
	$: thirdPlayer = combinePlayer(data.players.slice(2, 3)[0]);

	onMount(() => (ready = true));

	const combinePlayer = (player: Player) => {
		const playerStats = data.winsLossess.find((match: WinLose) => match.id === player.id);

		return {
			id: player.id,
			name: player.name,
			teamId: player.teamId,
			kd: playerStats!.kd,
			wins: player.wins,
			lossess: playerStats!.lossess,
			totalGames: playerStats!.amountOfGames
		};
	};

	const openFilter = (): void => {
		filterOpen = !filterOpen;
	};
</script>

<header class="grid grid-cols-4 items-center text-xl bg-gray-950 py-4 mb-4 mx-2">
	<div></div>
	<h1 class="text-center font-black col-span-2 text-gray-600">Pool Scoreboard</h1>
	<div class="self-center">
		<button
			class="flex items-center relative gap-1 uppercase bg-gray-900 text-gray-300 text-xs tracking-wide py-1 px-2 rounded-t w-full"
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
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg
			>
			{#if filterOpen}
				<div
					class="absolute flex flex-col items-start z-20 bg-gray-900 top-full w-full right-0 border-t border-t-gray-950 rounded-b"
					transition:slide
				>
					{#each filterOptions as filter}
						<button
							class="px-2 py-1.5 flex gap-2 items-center capitalize"
							class:text-gray-500={currentFilter === filter}
							on:click|preventDefault={() => (currentFilter = filter)}
						>
							<span
								class="w-1 h-1 bg-blue-300 rounded-full block indicator opacity-0"
								class:opacity-100={currentFilter === filter}
							></span>
							{filter}
						</button>
					{/each}
				</div>
			{/if}
		</button>
	</div>
</header>

<div class="grid grid-cols-3 items-end gap-2 px-4 h-[176px] lg:max-w-2xl mx-auto">
	{#if ready}
		<div>
			<h3
				in:fly={{ delay: 1250, y: 15, opacity: 0, easing: expoInOut }}
				class="text-center font-black flex flex-col leading-none uppercase pb-3"
			>
				<span>{secondPlayer.name}</span>
				<span class="text-gray-50/50 text-sm font-normal normal-case"
					>{data.teams.find((team) => secondPlayer.teamId === team.id)?.name}</span
				>
			</h3>
			<div
				in:slide={{ delay: 600, duration: 750, easing: quadOut }}
				class="h-24 rounded-t-md silver-bar relative"
			>
				<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
					<div class="flex justify-between text-xs">
						<span>W / L:</span><span class="font-bold text-white"
							><span class="text-green-400">{secondPlayer.wins}</span> /
							<span class="text-red-400">{secondPlayer.lossess}</span></span
						>
					</div>
					<div class="flex justify-between text-xs">
						<span>KD:</span><span class="font-bold text-white">{secondPlayer.kd}</span>
					</div>
					<div class="flex justify-between text-xs">
						<span>Matches:</span><span class="font-bold text-white">{secondPlayer.totalGames}</span>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3
				in:fly={{ delay: 1750, y: 15, opacity: 0, easing: expoInOut }}
				class="text-center font-black flex flex-col leading-none uppercase pb-3"
			>
				<span>{firstPlayer.name}</span>
				<span class="text-gray-50/50 text-sm font-normal normal-case"
					>{data.teams.find((team) => firstPlayer.teamId === team.id)?.name}</span
				>
			</h3>
			<div
				in:slide={{ delay: 1100, duration: 750, easing: quadOut }}
				class="h-32 rounded-t-md gold-bar relative"
			>
				<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
					<div class="flex justify-between text-xs">
						<span>W / L:</span><span class="font-bold text-white"
							><span class="text-green-400">{firstPlayer.wins}</span> /
							<span class="text-red-400">{firstPlayer.lossess}</span></span
						>
					</div>
					<div class="flex justify-between text-xs">
						<span>KD:</span><span class="font-bold text-white">{firstPlayer.kd}</span>
					</div>
					<div class="flex justify-between text-xs">
						<span>Matches:</span><span class="font-bold text-white">{firstPlayer.totalGames}</span>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h3
				in:fly={{ delay: 750, y: 15, opacity: 0, easing: expoInOut }}
				class="text-center flex flex-col font-black leading-none uppercase pb-3"
			>
				<span>{thirdPlayer.name}</span>
				<span class="text-gray-50/50 text-sm font-normal normal-case"
					>{data.teams.find((team) => thirdPlayer.teamId === team.id)?.name}</span
				>
			</h3>
			<div
				in:slide={{ delay: 100, duration: 750, easing: quadOut }}
				class="h-16 rounded-t-md copper-bar relative"
			>
				<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
					<div class="flex justify-between text-xs">
						<span>W / L:</span><span class="font-bold text-white"
							><span class="text-green-400">{thirdPlayer.wins}</span> /
							<span class="text-red-400">{thirdPlayer.lossess}</span></span
						>
					</div>
					<div class="flex justify-between text-xs">
						<span>KD:</span><span class="font-bold text-white">{thirdPlayer.kd}</span>
					</div>
					<div class="flex justify-between text-xs">
						<span>Matches:</span><span class="font-bold text-white">{thirdPlayer.totalGames}</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<PlayerCard
	playerData={data.players.slice(3, -1)}
	teamData={data.teams}
	winsLossess={data.winsLossess}
/>

<footer class="flex justify-end container mx-auto pt-8 pb-20"></footer>

<style lang="postcss">
	.gold-bar {
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#fedb37 0%,
				#fdb931 8%,
				#9f7928 30%,
				#8a6e2f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#ffffac 8%,
				#d1b464 25%,
				#5d4a1f 62.5%,
				#5d4a1f 100%
			);
	}
	.gold-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsla(60, 100%, 84%, 15%);
	}

	.silver-bar {
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#b2d5dd 0%,
				#97bfd8 8%,
				#6e92a5 30%,
				#5f808f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#e3f3f6 8%,
				#a1c7d1 25%,
				#4b6e75 62.5%,
				#375964 100%
			);
	}

	.silver-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsla(189, 51%, 93%, 15%);
	}

	.copper-bar {
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#fea437 0%,
				#fd8d31 8%,
				#9f5a28 30%,
				#8a582f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#ffd6ac 8%,
				#d19064 25%,
				#5d3c1f 62.5%,
				#5d3c1f 100%
			);
	}

	.copper-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsl(30, 100%, 84%, 15%);
	}

	.indicator {
		box-shadow: 0 0 6px 0 rgb(147 197 253);
	}
</style>
