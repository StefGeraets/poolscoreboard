<script lang="ts">
	import type { Prisma } from "@prisma/client";
	import Dialog from "../lib/components/Dialog.svelte";
	import { enhance } from "$app/forms";
  import type { ActionData } from './$types.js';
	import { slide } from "svelte/transition";
	import Card from "../lib/components/Card.svelte";

  type TeamWithPlayers = Prisma.TeamGetPayload<{
    include: {
			players: true
		}
  }>
  type PlayerWithTeams = Prisma.PlayerGetPayload<{
    include: {
			team: true
		}
  }>

  let playerCreateDialog: HTMLDialogElement
  let playerEditDialog: HTMLDialogElement

  let playerId: number;
  let playerName: string;
  let teamId: number;

  export let playerData: PlayerWithTeams[];
  export let teamData: TeamWithPlayers[];
  export let form: ActionData;

  const shouldCloseModal = () => {
    if (form?.success) {
      playerCreateDialog.close();
      playerEditDialog.close();
    }
  }

  const createButtonModal = () => playerCreateDialog.showModal()
  
  $: {
    form
    shouldCloseModal()
  }
</script>

<Card span="{2}" showModal={createButtonModal}>
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
          value={form?.name ?? ''}
          data-1p-ignore 
          class="w-full border rounded text-gray-900 py-1 px-2"
          class:border-red-400={form?.missing}
        >
        {#if form?.missing}<p class="text-red-500">The name field is required</p>{/if}
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
          value={form?.name ?? playerName}
          data-1p-ignore 
          class="w-full border rounded text-gray-900 py-1 px-2"
          class:border-red-400={form?.missing}
        >
        {#if form?.missing}<p class="text-red-500">The name field is required</p>{/if}
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
      <div class="text-center text-sm">{player.team.name}</div>
      <div class="text-end">{player.wins}</div>
      <div 
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
            teamId = player.team.id
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
      </div>
    </div>
  {/each}
</Card>