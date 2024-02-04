<script lang="ts">
  export let data;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container">
<section>
  <h2 class="uppercase">Team Scores</h2>
  {#each data.teams as team }
    <div>
      <h3>{team.name}, {team.score}, {team.players.length}</h3>
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