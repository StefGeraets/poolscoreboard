<script lang="ts">
  import { enhance } from '$app/forms';
	import Dialog from '../lib/components/Dialog.svelte';

  let teamCreateDialog: HTMLDialogElement;

  export let data;
  export let form;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid grid-cols-7 gap-4">
  <section class="bg-gray-900 rounded-lg border border-gray-800 p-4 col-span-2 tabular-nums">
    <header class="flex justify-between align-middle">
      <h2 class="uppercase text-lg font-bold mb-4">Team Scores</h2>
      <button 
        class="rounded h-7 w-7 flex justify-center items-center bg-gray-800 border border-gray-700 hover:bg-gray-700"
        on:click={() => teamCreateDialog.showModal()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      </button>
    </header>
    <Dialog bind:dialog={teamCreateDialog}>
      <form method="POST" action="?/createTeam" use:enhance class="flex flex-col gap-4">
        <label for="name">
          <div class="text-blue-100">Team Name:</div>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Enter Team Name" 
            data-1p-ignore 
            class="w-full text-gray-900 py-1 px-2">
        </label>
        <button 
          type="submit" 
          class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700">Save</button>
      </form>
    </Dialog>
    {#each data.teams as team, index }
      <div 
        class="grid grid-cols-3 items-center w-full border-gray-800 py-2 group"
        class:border-b={index + 1 !== data.teams.length}
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
        <div class="hidden group-hover:block">
          <button>Edit</button>
          <form method="POST" action="?/deleteTeam" use:enhance>
            <input type="hidden" name="id" value={team.id}>
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    {/each}
  </section>
  <p>
    {#each data.players as player }
      <h3 class="uppercase">{ player.name } <span>{player.wins}</span> {player.team.name}</h3>
    {/each}
    
    {#each data.matches as match }
      <h3>{match.player1.name} | {match.player2.name} -> {match.winner.name}</h3>
    {/each}
  </p>
</div>
