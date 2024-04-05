<script lang="ts">
  import { page } from "$app/stores";
	import type { Player, Team } from "@prisma/client";
	import Dialog from "../lib/components/Dialog.svelte";
	import { enhance } from "$app/forms";

  type WinLose = {
    id: number; 
    name: string; 
    amountOfGames: number; 
    wins: number; 
    lossess: number; 
    kd: number
  }

  type SortType = "byWins" | "byTotal" | "byKD" | "byLossess"

  let playerCreateDialog: HTMLDialogElement
  let playerEditDialog: HTMLDialogElement

  let playerId: number;
  let playerName: string;
  let teamId: number;

  export let playerData: Player[];
  export let teamData: Team[];
  export let winsLossess: WinLose[];

  let playerSort: SortType = "byWins"

  const shouldCloseModal = () => {
    if ($page.form?.success) {
      playerCreateDialog?.close();
      playerEditDialog?.close();
    }
  }
  
  // const createButtonModal = () => playerCreateDialog.showModal();

  $: sortedPlayersData = (
    playerData: Player[], 
    winsLossess: WinLose[],
    sortType: SortType
    ): {
      id: number; 
      name: string; 
      teamId: number; 
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
          teamId: player.teamId,
          kd: playerStats!.kd,
          wins: player.wins,
          lossess: playerStats!.lossess,
          totalGames: playerStats!.amountOfGames,
        }
      })

      if (sortType === "byKD") {
        return combinedPlayerData.sort((p1, p2) => {return p1.kd < p2.kd ? 1 : -1})
      }

      if (sortType === "byTotal") {
        return combinedPlayerData.sort((p1, p2) => {return p1.totalGames < p2.totalGames ? 1 : -1})
      }

      if (sortType === "byLossess") {
        return combinedPlayerData.sort((p1, p2) => {return p1.lossess < p2.lossess ? 1 : -1})
      }

      return combinedPlayerData;
  }
  
  $: {
    $page.form
    shouldCloseModal()
  }
</script>

<div>
  <!-- <div class="grid grid-cols-4 items-center overflow-hidden rounded bg-gray-950 border border-gray-800 text-gray-500 mb-2">
    <button 
      on:click={() => playerSort = "byWins"} 
      disabled={playerSort === "byWins"}
      class="py-1 uppercase tracking-wide text-sm disabled:text-blue-300  disabled:bg-gray-800"
    >
      Wins
    </button>
    <button 
      on:click={() => playerSort = "byLossess"} 
      disabled={playerSort === "byLossess"}
      class="border-l border-l-gray-900 py-1 uppercase tracking-wide text-sm disabled:text-blue-300  disabled:bg-gray-800"
    >
      Lossess
    </button>
    <button 
      on:click={() => playerSort = "byKD"} 
      disabled={playerSort === "byKD"}
      class="border-l border-l-gray-900 py-1 uppercase tracking-wide text-sm disabled:text-blue-300  disabled:bg-gray-800"
    >
      KD
    </button>
    <button 
      on:click={() => playerSort = "byTotal"} 
      disabled={playerSort === "byTotal"}
      class="border-l border-l-gray-900 py-1 uppercase tracking-wide text-sm disabled:text-blue-300  disabled:bg-gray-800"
    >
      Total
    </button>
  </div> -->

  <Dialog bind:dialog={playerCreateDialog}>
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
          class="w-full border rounded text-gray-900 py-1 px-2"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full border rounded text-gray-900 py-1 px-2">
          {#each teamData as team }
            <option value="{team.id}">{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400">Save</button>
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
          class="w-full border rounded text-gray-900 py-1 px-2"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full border rounded text-gray-900 py-1 px-2">
          {#each teamData as team }
            <option value="{team.id}" selected={teamId === team.id}>{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  {#each sortedPlayersData(playerData, winsLossess, playerSort) as player, index }
    <a href={`/player/${player.name}`} 
      class="grid grid-cols-2 items-center w-vw mx-2 mb-2 bg-gray-900 rounded-lg px-4 py-2"
    >
      <div class="flex items-center">
        <div class="w-10">{index + 4}. </div>
        <div class="flex flex-col items-start">
          <span class="font-bold">{player.name}</span>
          <div class="text-sm text-gray-400">{teamData.find((team) => player.teamId === team.id)?.name}</div>
        </div>
      </div>
      <div class="text-end flex flex-col items-end">
        <div class="flex justify-end items-center gap-1">
          <div class="text-sm">
            <span class="text-red-600">{player.lossess}</span>
            \
          </div>
          <span class="text-green-500 font-bold">{player.wins}</span>
        </div>
        <span class="text-xs text-gray-400">KD: {player.kd}</span>
      </div>
      <!-- Remove edit and delete buttons, convert to player page where we can edit or delete the player -->
      <!-- <div 
        class="
          flex right-0 absolute gap-2 bg-transparent translate-x-full
          group-hover:translate-x-0 group-hover:bg-gray-900
          transition-all ease-in-out duration-300
          "
      >
        <button 
          class="hover:text-blue-400"
          on:click={() => {
            playerId = player.id,
            playerName = player.name
            teamId = player.teamId
            playerEditDialog.showModal();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
        </button>
        <form method="POST" action="?/deletePlayer" use:enhance>
          <input type="hidden" name="id" value={player.id}>
          <button type="submit" class="hover:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
        </form>
      </div> -->
    </a>
  {/each}
</div>