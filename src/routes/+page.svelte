<script lang="ts">
	import TeamsCard from './TeamsCard.svelte';
	import PlayerCard from './PlayerCard.svelte';
	import MatchesCard from './MatchesCard.svelte';
  
  export let data;

  const totalScore = (teams: {score: number}[]) => {
    return teams.reduce((sum, team) => {
      return team.score + sum;
    }, 0)
  }
  $: total = totalScore(data.teams)
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-4">
  <PlayerCard playerData={data.players} teamData={data.teams} class="order-2 md:order-1"/>
  <MatchesCard playerData={data.players} matchData={data.matches} class="order-1 md:order-2"/>
  <TeamsCard teamData={data.teams} playerData={data.players} class="order-3 md:order-3"/>
</div>
<div class="fixed bottom-0 inset-x-0 h-16 flex justify-between items-end">
  {#each data.teams.slice(0, 2) as team, i }
    <div 
      class="flex justify-center items-center"
      class:bg-green-800={i === 0}
      class:bg-red-900={i === 1}
      class:h-16={i === 0}
      class:h-14={i === 1}
      style="width: {(team.score / total) * 100}%">
      <h3 class="font-bold uppercase text-2xl flex gap-2 items-center">{team.name} <span class="text-sm text-gray-200">({team.score})</span></h3>
    </div>
  {/each}
</div>
<footer class="flex justify-end container mx-auto pt-8 pb-32">
  <a href="https://github.com/StefGeraets/poolscoreboard/issues/new" target="_blank" >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <title>Add new issue</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
  </a>
</footer>
