<script lang="ts">
	import PlayerCard from './PlayerCard.svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { expoInOut, quadOut } from 'svelte/easing';
	import type { Player, Team } from '@prisma/client';

	type FilterOptions = 'score' | 'wins' | 'lossess' | 'total';
	export let data;
	let currentFilter: FilterOptions = 'score';
	let ready: boolean = false;
	let filterOpen: boolean = false;

	const filterOptions: FilterOptions[] = ['score', 'wins', 'lossess', 'total'];

	type WinLose = {
		id: number;
		name: string;
		amountOfGames: number;
		wins: number;
		lossess: number;
		kd: number;
	};

	$: firstPlayer = combinePlayer(data.players.slice(0, 1)[0]);
	$: secondPlayer = combinePlayer(data.players.slice(1, 2)[0]);
	$: thirdPlayer = combinePlayer(data.players.slice(2, 3)[0]);

	onMount(() => (ready = true));

	const combinePlayer = (player: Player) => {
		const playerStats = data.winsLossess.find((match: WinLose) => match.id === player.id);

		return {
			id: player.id,
			name: player.name,
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

<header class="grid items-center grid-cols-4 py-4 mx-2 mb-4 text-xl bg-gray-950">
	<div></div>
	<h1 class="col-span-2 font-black text-center text-gray-600">Pool Scoreboard</h1>
	<div class="self-center">
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
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg
			>
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
</header>

<div class="grid grid-cols-3 items-end gap-2 px-4 h-[176px] lg:max-w-2xl mx-auto">
	{#if ready}
		<div>
			<h3
				in:fly={{ delay: 1250, y: 15, opacity: 0, easing: expoInOut }}
				class="flex flex-col pb-3 font-black leading-none text-center uppercase"
			>
				<span>{secondPlayer.name}</span>
				<!-- <span class="text-sm font-normal normal-case text-gray-50/50">
					{secondPlayer.team}
				</span> -->
			</h3>
			<div
				in:slide={{ delay: 600, duration: 750, easing: quadOut }}
				class="relative h-24 rounded-t-md silver-bar"
			>
				<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
					<div class="flex justify-between text-xs">
						<span>W / L:</span>
						<span class="font-bold text-white">
							<span class="text-green-400">{secondPlayer.wins}</span> /
							<span class="text-red-400">{secondPlayer.lossess}</span>
						</span>
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
				class="flex flex-col pb-3 font-black leading-none text-center uppercase"
			>
				<span>{firstPlayer.name}</span>
				<!-- <span class="text-sm font-normal normal-case text-gray-50/50">
					{firstPlayer.team}
				</span> -->
			</h3>
			<div
				in:slide={{ delay: 1100, duration: 750, easing: quadOut }}
				class="relative h-32 rounded-t-md gold-bar"
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
				class="flex flex-col pb-3 font-black leading-none text-center uppercase"
			>
				<span>{thirdPlayer.name}</span>
				<!-- <span class="text-sm font-normal normal-case text-gray-50/50">
					{thirdPlayer.team}
				</span> -->
			</h3>
			<div
				in:slide={{ delay: 100, duration: 750, easing: quadOut }}
				class="relative h-16 rounded-t-md copper-bar"
			>
				<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
					<div class="flex justify-between text-xs">
						<span>W / L:</span>
						<span class="font-bold text-white">
							<span class="text-green-400">{thirdPlayer.wins}</span> /
							<span class="text-red-400">{thirdPlayer.lossess}</span>
						</span>
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

<PlayerCard playerData={data.players.slice(3, -1)} winsLossess={data.winsLossess} />

<footer class="container flex justify-end pt-8 pb-20 mx-auto"></footer>

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
