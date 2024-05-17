<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { isPositive } from '../../../lib/utils/playerHelpers';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeader title={data.player.name} />

<div class="container px-1 mx-auto">
	<div class="flex justify-center">
		<h1 class="text-3xl font-bold text-gray-500">
			Score: <span class="font-black text-gray-50">{data.player.s1_score}</span>
		</h1>
	</div>
	<div class="container grid grid-cols-3 gap-1 px-1 mx-auto mt-4 md:gap-4 justify-items-stretch">
		<div class="flex flex-col items-center self-start gap-1 md:col-span-1 tabular-nums">
			<h2 class="text-[10px] font-bold text-gray-500 uppercase">yesterday</h2>
			<p class="flex gap-1 text-xl font-black">
				<span
					class="text-[10px] font-normal"
					class:text-green-600={isPositive(data.player.s1_score - data.player.s1_dayScore)}
					class:text-red-600={!isPositive(data.player.s1_score - data.player.s1_dayScore)}
				>
					{isPositive(data.player.s1_score - data.player.s1_dayScore) ? '+' : ''}{data.player
						.s1_score - data.player.s1_dayScore}
				</span>
				{data.player.s1_dayScore}
			</p>
		</div>
		<div class="flex flex-col items-center self-start gap-1 md:col-span-1 tabular-nums">
			<h2 class="text-[10px] font-bold text-gray-500 uppercase">prev week</h2>
			<p class="flex gap-1 text-xl font-black">
				<span
					class="text-[10px] font-normal"
					class:text-green-600={isPositive(data.player.s1_score - data.player.s1_weekScore)}
					class:text-red-600={!isPositive(data.player.s1_score - data.player.s1_weekScore)}
				>
					{isPositive(data.player.s1_score - data.player.s1_weekScore) ? '+' : ''}{data.player
						.s1_score - data.player.s1_weekScore}
				</span>
				{data.player.s1_weekScore}
			</p>
		</div>
		<div class="flex flex-col items-center self-start gap-1 md:col-span-1 tabular-nums">
			<h2 class="text-[10px] font-bold text-gray-500 uppercase">prev month</h2>
			<p class="flex gap-1 text-xl font-black">
				<span
					class="text-[10px] font-normal"
					class:text-green-600={isPositive(data.player.s1_score - data.player.s1_monthScore)}
					class:text-red-600={!isPositive(data.player.s1_score - data.player.s1_monthScore)}
				>
					{isPositive(data.player.s1_score - data.player.s1_monthScore) ? '+' : ''}{data.player
						.s1_score - data.player.s1_monthScore}
				</span>
				{data.player.s1_monthScore}
			</p>
		</div>
	</div>
	<div class="grid items-center self-start grid-cols-3 gap-1 px-1 mx-auto mt-4">
		<div class="flex flex-col items-center self-start gap-1 px-2 py-4 md:col-span-1 tabular-nums">
			<h2 class="text-sm font-bold text-gray-500 uppercase">Wins</h2>
			<p class="text-2xl font-black text-green-400">{data.player.s1_wins}</p>
		</div>
		<div class="flex flex-col items-center self-start gap-1 px-2 py-4 md:col-span-1 tabular-nums">
			<h2 class="text-sm font-bold text-gray-500 uppercase">Losses</h2>
			<p class="text-2xl font-black text-red-500">{data.player.s1_lossess}</p>
		</div>
		<div class="flex flex-col items-center self-start gap-1 px-2 py-4 md:col-span-1 tabular-nums">
			<h2 class="text-sm font-bold text-gray-500 uppercase">Total</h2>
			<p class="text-2xl font-black">{data.player.s1_totalGames}</p>
		</div>
	</div>

	<div class="grid items-center self-start w-full grid-cols-3 grid-rows-3 gap-1 px-1 mx-auto mt-2">
		<div>&nbsp;</div>
		<div class="place-self-center text-[10px] text-gray-400 uppercase font-semibold">current</div>
		<div class="place-self-center text-[10px] text-gray-400 uppercase font-semibold">highest</div>

		<div class="place-self-center">🔥</div>
		<div class="place-self-center">
			{data.player.s1_currentStreak}
		</div>
		<div class="place-self-center">
			{data.player.s1_longestStreak}
		</div>

		<div class="place-self-center">💩</div>
		<div class="place-self-center">
			{data.player.s1_currentLoseStreak}
		</div>
		<div class="place-self-center">
			{data.player.s1_longestLoseStreak}
		</div>
	</div>
</div>

<div class="py-5 text-2xl text-center text-blue-100 bg-gray-950">
	<h3 class="text-2xl font-black">Played Games</h3>
</div>

<div
	class="container grid grid-cols-1 gap-2 px-1 mx-auto md:grid-cols-3 lg:grid-cols-4 md:px-2 lg:px-4"
>
	{#each data.matches as match}
		<div class="grid grid-cols-4 gap-2 px-4 py-2 bg-gray-900 rounded-lg">
			<div class="flex flex-col self-center">
				<a class="text-xl font-black" href={`/players/${match.opponent.name}`}>
					{match.opponent.name}
				</a>
			</div>
			<div class="flex flex-col items-center">
				<span class="text-[10px] text-gray-400 uppercase">Games</span>
				<span class="text-xl font-black text-gray-300">
					<span class="text-green-400">{match.player.wins}</span> :
					<span class="text-red-500">{match.opponent.wins}</span>
				</span>
			</div>
			<div class="flex flex-col items-center">
				<span class="text-[10px] text-gray-400 uppercase">Points Gained</span>
				<span class="text-xl font-black text-green-400">+ {match.player.gained}</span>
			</div>
			<div class="flex flex-col items-center">
				<span class="text-[10px] text-gray-400 uppercase">Points Lost</span>
				<span class="text-xl font-black text-red-500">{match.player.lost}</span>
			</div>
		</div>
	{/each}
</div>
