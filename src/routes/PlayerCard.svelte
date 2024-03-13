<script lang="ts">
  import { page } from "$app/stores";
	import type { Player, Team } from "@prisma/client";
	import Dialog from "../lib/components/Dialog.svelte";
	import { enhance } from "$app/forms";
	import { slide } from "svelte/transition";
	import Card from "../lib/components/Card.svelte";

  let playerCreateDialog: HTMLDialogElement
  let playerEditDialog: HTMLDialogElement

  let playerId: number;
  let playerName: string;
  let teamId: number;

  let className: string = '';
  export { className as class };

  export let playerData: Player[];
  export let teamData: Team[];

  const shouldCloseModal = () => {
    if ($page.form?.success) {
      playerCreateDialog?.close();
      playerEditDialog?.close();
    }
  }

  const playersWinsLossess = (playerId: number) => {
    const { wins, lossess } = $page.data.winsLossess.find((match) => match.id === playerId);
    
    return {
      wins,
      lossess,
    }
  }
  
  const createButtonModal = () => playerCreateDialog.showModal()
  
  $: {
    $page.form
    shouldCloseModal()
  }
</script>

<Card span="{2}" showModal={createButtonModal} class={className || ''}>
  <svelte:fragment slot="title">Players</svelte:fragment>

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

  {#each playerData as player, index }
    <div 
      transition:slide
      class="grid grid-cols-3 items-center w-full border-gray-800 py-2 group relative overflow-hidden"
      class:border-b={index + 1 !== playerData.length}
    >
      <div>
        {index + 1}
        .
        {#if index + 1 === 1 && player.wins !== 0}
          🏆
        {/if}
        <span class="font-bold">{player.name}</span>
      </div>
      <div class="text-center text-sm">{teamData.find((team) => player.teamId === team.id)?.name}</div>
      <div class="text-end flex gap-2 justify-end items-center">
        <div class="text-xs">
          <span class="text-red-600">{playersWinsLossess(player.id).wins}</span>
          /
          <span class="text-green-600">{playersWinsLossess(player.id).lossess}</span>
        </div>
        {player.wins}
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
    </div>
  {/each}
</Card>