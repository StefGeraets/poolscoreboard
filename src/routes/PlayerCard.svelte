<script lang="ts">
	import { page } from '$app/stores';
	import type { Player, Team } from '@prisma/client';
	import Dialog from '../lib/components/Dialog.svelte';
	import { enhance } from '$app/forms';

	type WinLose = {
		id: number;
		name: string;
		amountOfGames: number;
		wins: number;
		lossess: number;
		kd: number;
	};

	type SortType = 'byWins' | 'byTotal' | 'byKD' | 'byLossess';

	let playerCreateDialog: HTMLDialogElement;
	let playerEditDialog: HTMLDialogElement;

	let playerId: number;
	let playerName: string;
	let teamId: number;

	export let playerData: Player[];
	export let winsLossess: WinLose[];

	let playerSort: SortType = 'byWins';

	const shouldCloseModal = () => {
		if ($page.form?.success) {
			playerCreateDialog?.close();
			playerEditDialog?.close();
		}
	};

	// const createButtonModal = () => playerCreateDialog.showModal();

	$: sortedPlayersData = (
		playerData: Player[],
		winsLossess: WinLose[],
		sortType: SortType
	): {
		id: number;
		name: string;
		// team: number;
		kd: number;
		wins: number;
		lossess: number;
		totalGames: number;
	}[] => {
		const combinedPlayerData = playerData.map((player) => {
			const playerStats = winsLossess.find((match) => match.id === player.id);

			return {
				id: player.id,
				name: player.name,
				// team: player.team.name,
				kd: playerStats!.kd,
				wins: player.wins,
				lossess: playerStats!.lossess,
				totalGames: playerStats!.amountOfGames
			};
		});

		if (sortType === 'byKD') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.kd < p2.kd ? 1 : -1;
			});
		}

		if (sortType === 'byTotal') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.totalGames < p2.totalGames ? 1 : -1;
			});
		}

		if (sortType === 'byLossess') {
			return combinedPlayerData.sort((p1, p2) => {
				return p1.lossess < p2.lossess ? 1 : -1;
			});
		}

		return combinedPlayerData;
	};

	$: {
		$page.form;
		shouldCloseModal();
	}
</script>

<div>
	<!-- <div class="grid items-center grid-cols-4 mb-2 overflow-hidden text-gray-500 border border-gray-800 rounded bg-gray-950">
    <button 
      on:click={() => playerSort = "byWins"} 
      disabled={playerSort === "byWins"}
      class="py-1 text-sm tracking-wide uppercase disabled:text-blue-300 disabled:bg-gray-800"
    >
      Wins
    </button>
    <button 
      on:click={() => playerSort = "byLossess"} 
      disabled={playerSort === "byLossess"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      Lossess
    </button>
    <button 
      on:click={() => playerSort = "byKD"} 
      disabled={playerSort === "byKD"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      KD
    </button>
    <button 
      on:click={() => playerSort = "byTotal"} 
      disabled={playerSort === "byTotal"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      Total
    </button>
  </div> -->

	<!-- <Dialog bind:dialog={playerCreateDialog}>
    <form method="POST" action="?/addPlayer" use:enhance class="flex flex-col gap-4">
      <label for="name">
        <div class="text-blue-100">Player Name:</div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter Team Name" 
          value={$page.form?.name ?? ''}
          data-1p-ignore 
          class="w-full px-2 py-1 text-gray-900 border rounded"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full px-2 py-1 text-gray-900 border rounded">
          {#each teamData as team }
            <option value="{team.id}">{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block px-2 py-1 font-medium text-blue-100 uppercase bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  <Dialog bind:dialog={playerEditDialog}>
    <form method="POST" action="?/editPlayer" use:enhance class="flex flex-col gap-4">
      {#if playerId}
        <input type="hidden" name="id" value={playerId}>
      {/if}

      <label for="name">
        <div class="text-blue-100">Player Name:</div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter Player Name" 
          value={$page.form?.name ?? playerName}
          data-1p-ignore 
          class="w-full px-2 py-1 text-gray-900 border rounded"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full px-2 py-1 text-gray-900 border rounded">
          {#each teamData as team }
            <option value="{team.id}" selected={teamId === team.id}>{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block px-2 py-1 font-medium text-blue-100 uppercase bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog> -->

	{#each sortedPlayersData(playerData, winsLossess, playerSort) as player, index}
		<a
			href={`/player/${player.name}`}
			class="grid items-center grid-cols-2 px-4 py-2 mx-2 mb-2 bg-gray-900 rounded-lg w-vw"
		>
			<div class="flex items-center">
				<div class="w-10">{index + 4}.</div>
				<div class="flex flex-col items-start">
					<span class="font-bold">{player.name}</span>
					<div class="text-sm text-gray-400">
						<!-- {player.team} -->
					</div>
				</div>
			</div>
			<div class="flex flex-col items-end text-end">
				<div class="flex items-center justify-end gap-1">
					<div class="text-sm">
						<span class="text-red-600">{player.lossess}</span>
						\
					</div>
					<span class="font-bold text-green-500">{player.wins}</span>
				</div>
				<span class="text-xs text-gray-400">KD: {player.kd}</span>
			</div>
		</a>
	{/each}
</div>
