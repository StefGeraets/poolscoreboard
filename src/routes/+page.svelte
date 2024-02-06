<script lang="ts">
  import { enhance } from '$app/forms';
  let showTeamForm: boolean = false;
  let dialog: HTMLDialogElement;
  let showModal: boolean = false;

  const toggleTeamForm = () => {
    showTeamForm = !showTeamForm;
  }

  export let data;
  export let form;
</script>

<header class="text-center text-2xl bg-gray-950 text-blue-100 py-5">
  <h1 class="font-black">Pool Scoreboard</h1>
</header>

<div class="container mx-auto grid grid-cols-7 gap-4">
  <section class="bg-gray-900 rounded-lg border border-gray-800 p-4 col-span-2 tabular-nums">
    <header class="flex justify-between align-middle">
      <h2 class="uppercase text-lg font-bold mb-4">Team Scores</h2>
      <button 
        class="rounded h-7 w-7 flex justify-center items-center bg-gray-800 border border-gray-700 hover:bg-gray-700"
        on:click={() => dialog.showModal()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      </button>
    </header>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog
      bind:this={dialog}
      on:close={() => (showModal = false)}
      on:click|self={() => dialog.close()}
    >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click|stopPropagation>
          <form method="POST" action="?/createTeam" use:enhance>
            <input type="text" name="name" id="name" data-1p-ignore>
            <button type="submit">Save</button>
          </form>
        </div>
      </dialog>
    {#each data.teams as team, index }
      <div 
        class="grid grid-cols-3 items-center w-full border-gray-800 py-2 group"
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
        <div class="hidden group-hover:block">
          <button>Edit</button>
          <form method="POST" action="?/deleteTeam" use:enhance>
            <input type="hidden" name="id" value={team.id}>
            <button type="submit">Delete</button>
          </form>
        </div>
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

<style>
  	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>