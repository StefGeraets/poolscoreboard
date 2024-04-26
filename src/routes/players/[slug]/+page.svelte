<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeader title={data.player.name} />

<h1 class="mb-1 text-3xl font-black text-center">{data.player.s1_score}</h1>

<div
	class="container grid grid-cols-3 gap-1 px-1 mx-auto lg:px-32 md:px-4 md:grid-cols-4 md:gap-4 justify-items-stretch"
>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm text-green-400 uppercase">Wins</h2>
		<p class="text-2xl font-black">{data.player.s1_wins}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm text-red-500 uppercase">Losses</h2>
		<p class="text-2xl font-black">{data.player.s1_lossess}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm text-blue-400 uppercase">Total</h2>
		<p class="text-2xl font-black">{data.player.s1_totalGames}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm uppercase">yesterday</h2>
		<p class="text-2xl font-black">{data.player.s1_dayScore}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm uppercase">prev week</h2>
		<p class="text-2xl font-black">{data.player.s1_weekScore}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-2 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-sm uppercase">prev month</h2>
		<p class="text-2xl font-black">{data.player.s1_monthScore}</p>
	</div>
</div>

<div class="py-5 text-2xl text-center text-blue-100 bg-gray-950">
	<h3 class="text-2xl font-black">Played Games</h3>
</div>
<div
	class="container grid grid-cols-1 gap-2 px-1 mx-auto md:grid-cols-3 lg:grid-cols-5 md:px-2 lg:px-4"
>
	{#each data.matches as match}
		<div class="flex justify-between gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg">
			<div>
				<span class="font-bold">{match.player.name}</span>
				<span>{match.player.wins}</span>
			</div>
			<div>
				<span>{match.opponent.wins}</span>
				<span class="font-bold">{match.opponent.name}</span>
			</div>
		</div>
	{/each}
</div>
