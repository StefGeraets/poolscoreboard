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

  let teamCreateDialog: HTMLDialogElement
  let teamEditDialog: HTMLDialogElement

  let teamId: number;
  let teamName: string;

  export let teamData: TeamWithPlayers[];
  export let form: ActionData;

  const shouldCloseModal = () => {
    if (form?.success) {
      teamCreateDialog.close();
      teamEditDialog.close();
    }
  }

  const createButtonModal = () => teamCreateDialog.showModal()
  
  $: {
    form
    shouldCloseModal()
  }
</script>

<Card span="{2}" showModal={createButtonModal}>
  <svelte:fragment slot="title">Team Scores</svelte:fragment>

  <Dialog bind:dialog={teamCreateDialog}>
    <form method="POST" action="?/addTeam" use:enhance class="flex flex-col gap-4">
      <label for="name">
        <div class="text-blue-100">Team Name:</div>
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
      <button 
        type="submit" 
        class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  <Dialog bind:dialog={teamEditDialog}>
    <form method="POST" action="?/editTeam" use:enhance class="flex flex-col gap-4">
      {#if teamId}
        <input type="hidden" name="id" value={teamId}>
      {/if}

      <label for="name">
        <div class="text-blue-100">Team Name:</div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter Team Name" 
          value={form?.name ?? teamName}
          data-1p-ignore 
          class="w-full border rounded text-gray-900 py-1 px-2"
          class:border-red-400={form?.missing}
        >
        {#if form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <button 
        type="submit" 
        class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  {#each teamData as team, index }
    <div 
      transition:slide
      class="grid grid-cols-3 items-center w-full border-gray-800 py-2 group relative overflow-hidden"
      class:border-b={index + 1 !== teamData.length}
    >
      <div>
        {index + 1}
        .
        {#if index + 1 === 1}
          🏆
        {/if}
        <span class="font-bold">{team.name}</span>
      </div>
      <div class="text-center text-sm">{team.players.length} players</div>
      <div class="text-end">{team.score}</div>
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
            teamId = team.id,
            teamName = team.name
            teamEditDialog.showModal();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
        </button>
        <form method="POST" action="?/deleteTeam" use:enhance>
          <input type="hidden" name="id" value={team.id}>
          <button type="submit" class="hover:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
        </form>
      </div>
    </div>
  {/each}
</Card>