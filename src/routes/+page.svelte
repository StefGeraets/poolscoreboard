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
  <TeamsCard teamData={data.teams} {form} class="order-3 md:order-1"/>
  <PlayerCard playerData={data.players} teamData={data.teams} {form} class="order-2 md:order-2"/>
  <MatchesCard playerData={data.players} matchData={data.matches} {form} class="order-1 md:order-3"/>
</div>
