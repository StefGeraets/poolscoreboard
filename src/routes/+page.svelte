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
<footer class="flex justify-end container mx-auto pt-8">
<a href="https://github.com/StefGeraets/poolscoreboard/issues/new" target="_blank" >
  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <title>Add new issue</title>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
</a>
</footer>
