<script lang="ts">
	import TeamsCard from './TeamsCard.svelte';
	import PlayerCard from './PlayerCard.svelte';
	import MatchesCard from './MatchesCard.svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { expoInOut, quadOut } from 'svelte/easing';
  
  export let data;

  const totalScore = (teams: {score: number}[]) => {
    return teams.reduce((sum, team) => {
      return team.score + sum;
    }, 0)
  }
  $: total = totalScore(data.teams)
  $: firstPlayer = data.players.slice(0, 1)[0]
  $: secondPlayer = data.players.slice(1, 2)[0]
  $: thirdPlayer = data.players.slice(2, 3)[0]

  let ready: boolean = false;

  onMount(() => ready = true)
</script>

<header class="text-center text-xl bg-gray-950 text-gray-600 py-4">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="grid grid-cols-3 items-end gap-2 px-4 h-[164px]">
  {#if ready}
    <div>
      <h3 in:fly={{ delay: 1250, y: 15, opacity: 0, easing: expoInOut }} class="text-center font-black uppercase pb-3">{secondPlayer.name}</h3>
      <div in:slide={{ delay: 600, duration: 750, easing: quadOut }} class="h-24 rounded-t-md silver-bar relative">
        <div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2">Stats</div>
      </div>  
    </div>
    <div>
      <h3 in:fly={{ delay: 1750, y: 15, opacity: 0, easing: expoInOut }} class="text-center font-black uppercase pb-3">{firstPlayer.name}</h3>
      <div in:slide={{ delay: 1100, duration: 750, easing: quadOut }} class="h-32 rounded-t-md gold-bar relative">
        <div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2">Stats</div>
      </div>
    </div>
    <div>
      <h3 in:fly={{ delay: 750, y: 15, opacity: 0, easing: expoInOut }} class="text-center font-black uppercase pb-3">{thirdPlayer.name}</h3>
      <div in:slide={{ delay: 100, duration: 750, easing: quadOut }} class="h-16 rounded-t-md copper-bar relative">
        <div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2">Stats</div>
      </div>
    </div>
  {/if}
</div>

<div class="container mx-auto grid lg:grid-cols-7 md:grid-cols-3 grid-cols-1 gap-4">
  <PlayerCard playerData={data.players.slice(3, -1)} teamData={data.teams} winsLossess={data.winsLossess} class="order-1 md:order-1"/>
  <MatchesCard playerData={data.players} matchData={data.matches} class="order-2 md:order-2"/>
  <TeamsCard teamData={data.teams} playerData={data.players} class="order-3 md:order-3"/>
</div>
<!-- <div class="fixed bottom-0 inset-x-0 h-16 flex justify-between items-end">
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
</div> -->

<footer class="flex justify-end container mx-auto pt-8 pb-32">
  <a href="https://github.com/StefGeraets/poolscoreboard/issues/new" target="_blank" >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <title>Add new issue</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
  </a>
</footer>

<style lang="postcss">
  .gold-bar {
    background:radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
    
  }            
  .gold-bar:after {
    content: '';
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    background: transparent;
    border-radius: 10px;
    box-shadow: 0 0 15px 10px hsla(60, 100%, 84%, 15%);
  }

  .silver-bar {
    background:radial-gradient(ellipse farthest-corner at right bottom, #b2d5dd 0%, #97bfd8 8%, #6e92a5 30%, #5f808f 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #e3f3f6 8%, #a1c7d1 25%, #4b6e75 62.5%, #375964 100%);
  }

  .silver-bar:after {
    content: '';
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    background: transparent;
    border-radius: 10px;
    box-shadow: 0 0 15px 10px hsla(189, 51%, 93%, 15%);
  }

  .copper-bar {
    background:radial-gradient(ellipse farthest-corner at right bottom, #fea437 0%, #fd8d31 8%, #9f5a28 30%, #8a582f 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #ffd6ac 8%, #d19064 25%, #5d3c1f 62.5%, #5d3c1f 100%);
  }

  .copper-bar:after {
    content: '';
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    background: transparent;
    border-radius: 10px;
    box-shadow: 0 0 15px 10px hsl(30, 100%, 84%, 15%);
  }
</style>