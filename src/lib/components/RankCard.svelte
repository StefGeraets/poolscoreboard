<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { compare } from '$lib/stores';
	import { type RankedPlayer, compareScore, isPositive } from '$lib/utils/playerHelpers';

	export let player: RankedPlayer;
	export let index: number;
</script>

<a
	href={`/players/${player.name}`}
	class="relative grid items-center grid-cols-3 py-2 pl-2 pr-4 mx-2 mb-2 overflow-hidden bg-gray-900 rounded-lg w-vw"
	class:opacity-20={!player.s1_ranked}
>
	<div class="flex items-center col-span-2">
		<div class="flex w-12 gap-1">
			<span class="w-5 pt-0.5">{index + 4}.</span>
			{#if player[`${$compare}Rank`] !== 0}
				<div class="-mt-[5px] -mb-[5px] text-[8px] grid grid-rows-3 place-items-center">
					<div class="self-start text-green-600">
						{#if isPositive(player[`${$compare}Rank`])}
							<Icon name="arrowUp" size={12} />
						{/if}
					</div>
					<div
						class:text-green-600={isPositive(player[`${$compare}Rank`])}
						class:text-red-600={!isPositive(player[`${$compare}Rank`])}
					>
						{isPositive(player[`${$compare}Rank`]) ? '+' : ''}{player[`${$compare}Rank`]}
					</div>
					<div class="self-end text-red-600">
						{#if !isPositive(player[`${$compare}Rank`])}
							<Icon name="arrowDown" size={12} />
						{/if}
					</div>
				</div>
			{/if}
		</div>
		<div class="flex flex-col items-start">
			<span class="flex gap-1.5 font-bold">
				{player.name}
				{#if player.s1_onAStreak && player.s1_currentStreak >= 3}
					<div class="grid grid-cols-1 grid-rows-1 place-items-center">
						<span class="col-start-1 row-start-1 opacity-50">🔥</span>
						<span class="z-10 col-start-1 row-start-1 pt-1 text-[10px] font-black text-white">
							{player.s1_currentStreak}
						</span>
					</div>
				{/if}
			</span>
			<div class="text-[9px] uppercase text-gray-400">
				{player.s1_wins} Won | {player.s1_lossess} Lost | {player.s1_totalGames} matches
			</div>
		</div>
	</div>
	<div class="flex items-center justify-end gap-2">
		{#if compareScore(player, $compare) !== 0}
			<div
				class="text-[10px]"
				class:text-green-600={isPositive(compareScore(player, $compare))}
				class:text-red-600={!isPositive(compareScore(player, $compare))}
			>
				{isPositive(compareScore(player, $compare)) ? '+' : ''}{compareScore(player, $compare)}
			</div>
		{/if}
		<div class="text-lg">
			{player.s1_score}
		</div>
	</div>
</a>
