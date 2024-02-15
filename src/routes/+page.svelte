<script lang="ts">
  import type { ActionData } from './$types.js';
	import TeamsCard from './TeamsCard.svelte';
	import PlayerCard from './PlayerCard.svelte';
	import MatchesCard from './MatchesCard.svelte';
  
  export let data;
  export let form: ActionData;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-4">
  {#await Promise.all([data.teams, data.players, data.matches])}
  <div class="lg:col-span-7 md:col-span-3">
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      class="animate-spin w-20 h-20 mx-auto" 
      viewBox="0 0 24 24" 
      stroke-width="1.25" 
      stroke="currentColor" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
    </svg>
  </div>
  {:then [teams, players, matches]} 
    <TeamsCard teamData={teams} playerData={players} {form} class="order-3 md:order-1"/>
    <PlayerCard playerData={players} teamData={teams} {form} class="order-2 md:order-2"/>
    <MatchesCard playerData={players} matchData={matches} {form} class="order-1 md:order-3"/>
  {/await}
</div>
