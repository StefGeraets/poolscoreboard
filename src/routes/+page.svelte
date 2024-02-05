<script lang="ts">
  export let data;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid grid-cols-7 gap-4">
  <section class="bg-gray-900 rounded-lg border border-gray-800 p-4 col-span-2 tabular-nums">
    <h2 class="uppercase text-lg font-bold mb-4">Team Scores</h2>
    {#each data.teams as team, index }
      <div 
        class="grid grid-cols-3 items-center w-full border-gray-800 py-2"
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