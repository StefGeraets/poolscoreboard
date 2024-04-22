<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeader title={data.player.name} />
<header class="py-5 text-center text-blue-100 bg-gray-950">
	<h1 class="text-2xl font-black">{data.player.name}</h1>
</header>

<div
	class="container grid grid-cols-2 gap-1 px-1 mx-auto lg:px-32 md:px-4 md:grid-cols-4 md:gap-4 justify-items-stretch"
>
	<div
		class="flex flex-col items-center self-start gap-1 px-8 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-green-400 uppercase">Wins</h2>
		<p class="text-3xl font-black">{data.stats.wins}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-8 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-red-500 uppercase">Losses</h2>
		<p class="text-3xl font-black">{data.stats.lossess}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-8 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="text-blue-400 uppercase">Total</h2>
		<p class="text-3xl font-black">{data.stats.amountOfGames}</p>
	</div>
	<div
		class="flex flex-col items-center self-start gap-1 px-8 py-4 bg-gray-900 border border-gray-800 rounded-lg md:col-span-1 tabular-nums"
	>
		<h2 class="uppercase">K/D</h2>
		<p class="text-3xl font-black">{data.stats.kd}</p>
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
