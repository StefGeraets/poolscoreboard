<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from '../$types';

	export let data: PageData;

	console.log('data', data.page, data.pages, data.count);
</script>

<PageHeader title="Matches" />

<section class="px-2">
	{#each data.matches as match, index}
		<div
			transition:slide
			class="relative grid items-center w-full grid-cols-2 py-2 pl-2 pr-4 mb-2 overflow-hidden bg-gray-900 rounded-lg"
		>
			<div class:text-green-500={match.winnerId === match.player1Id}>
				{#if match.winnerId === match.player1Id}
					🎉
				{/if}
				<span class="font-bold">{match.player1.name}</span>
				{#if match.winnerId === match.player1Id}
					<span class="text-xs">+{match.s1_pointsWon}</span>
				{:else}
					<span class="text-xs" class:text-red-600={match.s1_pointsLost < 0}>
						{match.s1_pointsLost}
					</span>
				{/if}
			</div>
			<div class:text-green-500={match.winnerId === match.player2Id} class="text-end">
				{#if match.winnerId === match.player2Id}
					<span class="text-xs">+{match.s1_pointsWon}</span>
				{:else}
					<span class="text-xs" class:text-red-600={match.s1_pointsLost < 0}>
						{match.s1_pointsLost}
					</span>
				{/if}
				<span class="font-bold">{match.player2.name}</span>
				{#if match.winnerId === match.player2Id}
					🎉
				{/if}
			</div>
		</div>
	{/each}
</section>

<footer></footer>
