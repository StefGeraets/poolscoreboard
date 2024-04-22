<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from '../$types';
	import Icon from '../../lib/components/Icon.svelte';
	import { getRelativeTimeString } from '../../lib/utils/dates';

	export let data: PageData;

	$: currentPage = data.page;
	$: totalPages = data.pages;
	$: from = data.page * data.size;
	$: to = (data.page + 1) * data.size;
</script>

<PageHeader title="Matches" />

<footer class="flex items-center justify-between grid-cols-3 px-2 pb-4">
	<div class="w-20">
		{#if currentPage !== 0 && data.count !== 0}
			<a
				href="/matches?page={currentPage - 1}"
				class="flex items-center justify-center px-2 py-2 text-sm uppercase border rounded border-gray-700/20 bg-gray-900/50"
			>
				<Icon name="chevronLeft" size={16} />
				Prev
			</a>
		{/if}
	</div>
	<header class="text-sm text-center text-gray-400">
		Viewing matches {from} to {to}
	</header>

	<div class="w-20">
		{#if currentPage !== totalPages - 1 && data.count !== 0}
			<a
				href="/matches?page={currentPage + 1}"
				class="flex items-center justify-center px-2 py-2 text-sm uppercase border rounded border-gray-700/20 bg-gray-900/50"
			>
				Next
				<Icon name="chevronRight" size={16} />
			</a>
		{/if}
	</div>
</footer>

<section class="px-2">
	{#each data.matches as match}
		<div class="relative w-full pt-1 pb-2 pl-4 pr-4 mb-2 overflow-hidden bg-gray-900 rounded-lg">
			<span class="text-gray-500 text-[10px]">
				Match played: {getRelativeTimeString(match.createdAt, 'en')}
			</span>
			<div transition:slide class="grid items-center grid-cols-2">
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
		</div>
	{/each}
</section>

<footer class="flex justify-between px-2 pt-2">
	<div>
		{#if currentPage !== 0 && data.count !== 0}
			<a
				href="/matches?page={currentPage - 1}"
				class="flex items-center px-2 py-2 text-sm uppercase border rounded border-gray-700/20 bg-gray-900/50"
			>
				<Icon name="chevronLeft" size={16} />
				Prev
			</a>
		{/if}
	</div>
	<div>
		{#if currentPage !== totalPages - 1 && data.count !== 0}
			<a
				href="/matches?page={currentPage + 1}"
				class="flex items-center px-2 py-2 text-sm uppercase border rounded border-gray-700/20 bg-gray-900/50"
			>
				Next
				<Icon name="chevronRight" size={16} />
			</a>
		{/if}
	</div>
</footer>
