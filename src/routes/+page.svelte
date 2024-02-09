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
  {#await data.teams}
    Loading
  {:then teams} 
    <TeamsCard teamData={teams} {form} class="order-3 md:order-1"/>
  {/await}
  {#await Promise.all([data.players, data.teams])}
    Loading
  {:then [players, teams]} 
    <PlayerCard playerData={players} teamData={teams} {form} class="order-2 md:order-2"/>
  {/await}
  {#await Promise.all([data.players, data.matches])}
    Loading
  {:then [players, matches]} 
    <MatchesCard playerData={players} matchData={matches} {form} class="order-1 md:order-3"/>
  {/await}
</div>
