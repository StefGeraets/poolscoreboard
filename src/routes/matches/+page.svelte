<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { Match } from '@prisma/client';
	import { slide } from 'svelte/transition';

	let matchData: Match[];
</script>

<PageHeader title="Matches" />

<!-- {#each matchData.slice(0, 10) as match, index}
	<div
		transition:slide
		class="relative grid items-center w-full grid-cols-2 py-2 overflow-hidden border-gray-800 group"
		class:border-b={index + 1 !== matchData.length}
	>
		<div class:text-green-500={match.winnerId === match.player1Id}>
			{#if match.winnerId === match.player1Id}
				🎉
			{/if}
			<span class="font-bold">{findPlayer(match.player1Id)?.name}</span>
		</div>
		<div class:text-green-500={match.winnerId === match.player2Id}>
			{#if match.winnerId === match.player2Id}
				🎉
			{/if}
			<span class="font-bold">{findPlayer(match.player2Id)?.name}</span>
		</div>
	</div>
{/each} -->
