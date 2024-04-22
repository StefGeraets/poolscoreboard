<script lang="ts">
	import type { Player } from '@prisma/client';
	import Icon from '$lib/components/Icon.svelte';

	export let playerData: Player[];
</script>

<div>
	<!-- <div class="grid items-center grid-cols-4 mb-2 overflow-hidden text-gray-500 border border-gray-800 rounded bg-gray-950">
    <button 
      on:click={() => playerSort = "byWins"} 
      disabled={playerSort === "byWins"}
      class="py-1 text-sm tracking-wide uppercase disabled:text-blue-300 disabled:bg-gray-800"
    >
      Wins
    </button>
    <button 
      on:click={() => playerSort = "byLossess"} 
      disabled={playerSort === "byLossess"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      Lossess
    </button>
    <button 
      on:click={() => playerSort = "byKD"} 
      disabled={playerSort === "byKD"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      KD
    </button>
    <button 
      on:click={() => playerSort = "byTotal"} 
      disabled={playerSort === "byTotal"}
      class="py-1 text-sm tracking-wide uppercase border-l border-l-gray-900 disabled:text-blue-300 disabled:bg-gray-800"
    >
      Total
    </button>
  </div> -->

	<!-- <Dialog bind:dialog={playerCreateDialog}>
    <form method="POST" action="?/addPlayer" use:enhance class="flex flex-col gap-4">
      <label for="name">
        <div class="text-blue-100">Player Name:</div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter Team Name" 
          value={$page.form?.name ?? ''}
          data-1p-ignore 
          class="w-full px-2 py-1 text-gray-900 border rounded"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full px-2 py-1 text-gray-900 border rounded">
          {#each teamData as team }
            <option value="{team.id}">{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block px-2 py-1 font-medium text-blue-100 uppercase bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  <Dialog bind:dialog={playerEditDialog}>
    <form method="POST" action="?/editPlayer" use:enhance class="flex flex-col gap-4">
      {#if playerId}
        <input type="hidden" name="id" value={playerId}>
      {/if}

      <label for="name">
        <div class="text-blue-100">Player Name:</div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Enter Player Name" 
          value={$page.form?.name ?? playerName}
          data-1p-ignore 
          class="w-full px-2 py-1 text-gray-900 border rounded"
          class:border-red-400={$page.form?.missing}
        >
        {#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
      </label>
      <label for="team">
        <div class="text-blue-100">Select Team:</div>
        <select name="team" id="team" class="w-full px-2 py-1 text-gray-900 border rounded">
          {#each teamData as team }
            <option value="{team.id}" selected={teamId === team.id}>{team.name}</option>
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block px-2 py-1 font-medium text-blue-100 uppercase bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog> -->

	{#each playerData as player, index}
		<a
			href={`/players/${player.name}`}
			class="relative grid items-center grid-cols-3 py-2 pl-2 pr-4 mx-2 mb-2 overflow-hidden bg-gray-900 rounded-lg w-vw"
			class:opacity-20={!player.s1_ranked}
		>
			<div class="flex items-center col-span-2">
				<div class="flex w-12 gap-1">
					<span class="w-5 pt-0.5">{index + 4}.</span>
					<div class="-mt-1 -mb-1 text-[8px] grid grid-rows-3 place-items-center">
						<div class="self-start text-green-600">
							<Icon name="arrowUp" size={12} />
						</div>
						<div class="text-green-600">+2</div>
						<div class="self-end text-red-600">
							<!-- <Icon name="arrowDown" size={12} /> -->
						</div>
					</div>
				</div>
				<div class="flex flex-col items-start">
					<span class="flex gap-1.5 font-bold">
						{player.name}
						{#if player.s1_onAStreak && player.s1_currentStreak >= 3}
							<div class="grid grid-cols-1 grid-rows-1 place-items-center">
								<span class="col-start-1 row-start-1 opacity-50">🔥</span>
								<span class="z-10 col-start-1 row-start-1 pt-1 text-[10px] font-black text-white">
									{player.s1_currentStreak}
								</span>
							</div>
						{/if}
					</span>
					<div class="text-[9px] uppercase text-gray-400">
						{player.s1_wins} Won | {player.s1_lossess} Lost | {player.s1_totalGames} matches
					</div>
				</div>
			</div>
			<div class="flex items-center justify-end gap-2">
				<div class="text-[10px] text-green-600">+12</div>
				<div class="text-lg">
					{player.s1_score}
				</div>
			</div>
		</a>
	{/each}
</div>
