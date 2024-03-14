<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<header class="text-center bg-gray-950 text-blue-100 py-5">
  <h1 class="text-2xl font-black">{data.player.name}</h1>
</header>

<div class="container lg:px-32 px-1 md:px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-items-stretch">
  <div class="flex flex-col items-center gap-1 bg-gray-900 rounded-lg border border-gray-800 py-4 px-8 md:col-span-1 tabular-nums self-start">
    <h2 class="uppercase text-green-400">Wins</h2>
    <p class="text-3xl font-black">{data.stats.wins}</p>
  </div>
  <div class="flex flex-col items-center gap-1 bg-gray-900 rounded-lg border border-gray-800 py-4 px-8 md:col-span-1 tabular-nums self-start">
    <h2 class="uppercase text-red-500">Lossess</h2>
    <p class="text-3xl font-black ">{data.stats.lossess}</p>
  </div>
  <div class="flex flex-col items-center gap-1 bg-gray-900 rounded-lg border border-gray-800 py-4 px-8 md:col-span-1 tabular-nums self-start">
    <h2 class="uppercase text-blue-400">Total</h2>
    <p class="text-3xl font-black">{data.stats.amountOfGames}</p>
  </div>
  <div class="flex flex-col items-center gap-1 bg-gray-900 rounded-lg border border-gray-800 py-4 px-8 md:col-span-1 tabular-nums self-start">
    <h2 class="uppercase">K/D</h2>
    <p class="text-3xl font-black">{data.stats.kd}</p>
  </div>
</div>

<div class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h3 class="text-2xl font-black">Played Games</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 px-1 md:px-2 lg:px-4 container mx-auto">
  {#each data.matches as match }
    <div class="flex gap-2 justify-between bg-gray-900 rounded-lg border border-gray-800 py-2 px-4">
      <div>
        <span class="font-bold">{match.player.name}</span>
        <span>{match.player.wins}</span>
      </div>
      <div>
        <span>{match.opponent.wins}</span>
        <span class="font-bold">{match.opponent.name}</span>
      </div>
    </div>
  {/each}
</div>