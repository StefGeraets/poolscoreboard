<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Card from '$lib/components/Card.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { Match, Player } from '@prisma/client';
	import { slide } from 'svelte/transition';

	export let matchData: Match[];
	export let playerData: Player[];
	let className: string = '';
	let working: boolean = false;
	export { className as class };

	let matchCreateDialog: HTMLDialogElement;
	let selectedPlayer1: number = 0;
	let selectedPlayer2: number = 0;

	const createButtonModal = () => matchCreateDialog.showModal();

	const selectedPlayers = (id1: number, id2: number) => {
		const player1 = playerData.find((pl) => pl.id === id1);
		const player2 = playerData.find((pl) => pl.id === id2);

		return [player1, player2];
	};

	const findPlayer = (id: number) => {
		return playerData.find((p) => p.id === id);
	};

	const handleSubmit = () => {
		working = true;
	};

	const enhanceFormSubmit = () => {
		return async ({ result, update }) => {
			if (result.data.success) {
				working = false;
				matchCreateDialog?.close();
				update();
			}
		};
	};

	let winMethod: 'fair' | '8-ball' = 'fair';

	$: winnerPool = selectedPlayers(selectedPlayer1, selectedPlayer2);
</script>

<Card span={3} showModal={createButtonModal} class={className || ''}>
	<svelte:fragment slot="title">Matches</svelte:fragment>

	<Dialog bind:dialog={matchCreateDialog}>
		<form
			method="POST"
			action="?/addMatch"
			on:submit|preventDefault={handleSubmit}
			use:enhance={enhanceFormSubmit}
			class="flex flex-col gap-4 text-blue-100"
		>
			<div class="grid w-full grid-cols-2 gap-4">
				<label for="player1">
					<div class="mb-1 text-blue-100">Select Challenger:</div>
					<select
						name="player1"
						id="player1"
						class="w-full px-2 py-1 text-gray-900 border rounded"
						bind:value={selectedPlayer1}
					>
						{#each playerData as player}
							{#if player.id !== selectedPlayer2}
								<option value={player.id}>{player.name}</option>
							{/if}
						{/each}
					</select>
				</label>
				<label for="player2">
					<div class="mb-1 text-blue-100">Select Opponent:</div>
					<select
						name="player2"
						id="player2"
						class="w-full px-2 py-1 text-gray-900 border rounded"
						bind:value={selectedPlayer2}
					>
						{#each playerData as player}
							{#if player.id !== selectedPlayer1}
								<option value={player.id}>{player.name}</option>
							{/if}
						{/each}
					</select>
				</label>
			</div>

			<label for="winner" class="w-full">
				<div class="mb-1 text-lg font-bold text-blue-100">Who won?</div>
				<select
					name="winner"
					id="winner"
					class="w-full px-2 py-1 text-gray-900 border rounded"
					disabled={selectedPlayer1 === 0 || selectedPlayer2 === 0}
				>
					{#each winnerPool as player}
						{#if player}
							<option value={player.id}>{player.name}</option>
						{/if}
					{/each}
				</select>
			</label>
			<label for="method" class="w-full mb-4">
				<div class="mb-1 text-lg font-bold text-blue-100">Which method did you win?</div>
				<input type="hidden" name="method" id="method" value={winMethod} />
				<div class="grid grid-cols-2 gap-4">
					<button
						on:click={() => (winMethod = 'fair')}
						disabled={winMethod === 'fair'}
						class="text-lg bg-gray-800 border border-gray-700 disabled:bg-blue-800">⚔️</button
					>
					<button
						on:click={() => (winMethod = '8-ball')}
						disabled={winMethod === '8-ball'}
						class="text-lg bg-gray-800 border border-gray-700 disabled:bg-blue-800">🎱</button
					>
				</div>
			</label>
			<button
				type="submit"
				disabled={working}
				class="block px-2 py-2 font-medium text-center text-blue-100 uppercase bg-green-800 border border-green-700 rounded hover:bg-gray-700 hover:text-blue-400 disabled:bg-gray-700 disabled:cursor-wait"
			>
				{#if !working}
					Save
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mx-auto animate-spin"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
							d="M12 3a9 9 0 1 0 9 9"
						/></svg
					>
				{/if}
			</button>
		</form>
	</Dialog>

	{#each matchData.slice(0, 10) as match, index}
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
	{/each}
</Card>
