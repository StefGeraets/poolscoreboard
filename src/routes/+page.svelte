<script lang="ts">
	import { slide } from 'svelte/transition';
	import Card from '../lib/components/Card.svelte';
import type { ActionData } from './$types.js';
	import TeamsCard from './TeamsCard.svelte';
	import { enhance } from '$app/forms';

  export let data;
  export let form: ActionData;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid grid-cols-7 gap-4">
  <TeamsCard teamData="{data.teams}" {form} />

  <Card span={2}>
    {#each data.players as player, index }
      <div 
        transition:slide
        class="grid grid-cols-3 items-center w-full border-gray-800 py-2 group relative overflow-hidden"
        class:border-b={index + 1 !== data.players.length}
      >
        <div>
          {index + 1}
          .
          {#if index + 1 === 1}
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
          <button class="hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
          </button>
          <form method="POST" action="?/deleteTeam" use:enhance>
            <input type="hidden" name="id" value={player.id}>
            <button type="submit" class="hover:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
          </form>
        </div>
      </div>
    {/each}
  </Card>
  <p>
    {#each data.matches as match }
      <h3>{match.player1.name} | {match.player2.name} -> {match.winner.name}</h3>
    {/each}
  </p>
</div>
