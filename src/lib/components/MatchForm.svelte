<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { quadIn, quadOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import FormWrapper from './FormWrapper.svelte';
	import Icon from './Icon.svelte';

	export let formOpen: boolean = false;
	export let toggleForm: () => void;

	let working: Boolean = false;
	let selectedPlayer1: number = 0;
	let selectedPlayer2: number = 0;
	// let winMethod: 'fair' | '8-ball' = 'fair';
	let playerData = $page.data.playersList;

	const selectedPlayers = (id1: number, id2: number) => {
		const player1 = playerData.find((pl) => pl.id === id1);
		const player2 = playerData.find((pl) => pl.id === id2);

		return [player1, player2];
	};

	const handleSubmit = () => {
		working = true;
	};

	const enhanceFormSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				working = false;
				toggleForm();
				update();
			}
		};
	};

	$: winnerPool = selectedPlayers(selectedPlayer1, selectedPlayer2);
</script>

<FormWrapper {formOpen} {toggleForm}>
	<form
		method="POST"
		action="/?/addMatch"
		on:submit|preventDefault={handleSubmit}
		use:enhance={enhanceFormSubmit}
		in:scale={{ start: 0.9, duration: 200, delay: 150, easing: quadOut }}
		out:scale={{ start: 0.9, duration: 200, easing: quadIn }}
		class="z-20 flex flex-col self-center gap-4 text-blue-100"
	>
		<div class="grid w-full grid-cols-2 gap-4">
			<label for="player1" class="text-left">
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
			<label for="player2" class="text-left">
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

		<label for="winner" class="w-full text-left">
			<div class="mb-1 text-lg font-bold text-blue-100">Who won?</div>
			<select
				name="winner"
				id="winner"
				class="w-full px-2 py-1 text-gray-900 border rounded"
				disabled={selectedPlayer1 === 0 || selectedPlayer2 === 0}
			>
				{#if winnerPool}
					{#each winnerPool as player}
						{#if player}
							<option value={player.id}>{player.name}</option>
						{/if}
					{/each}
				{/if}
			</select>
		</label>
		<!-- <label for="method" class="w-full mb-4">
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
		</label> -->
		<button
			type="submit"
			disabled={!!working}
			class="block px-2 py-2 font-medium text-center text-blue-100 uppercase bg-green-800 border border-green-700 rounded hover:bg-gray-700 hover:text-blue-400 disabled:bg-gray-700 disabled:cursor-wait"
		>
			{#if !working}
				Save
			{:else}
				<Icon name="loader" />
			{/if}
		</button>
	</form>
</FormWrapper>
