<script lang="ts">
	import { enhance } from "$app/forms";
	import Card from "$lib/components/Card.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import type { Match, Player } from "@prisma/client";
	import type { ActionData } from "./$types";
	import { slide } from "svelte/transition";
  
  export let matchData: Match[];
  export let playerData: Player[];
  export let form: ActionData;
  let className: string = '';
  export { className as class };

  let matchCreateDialog: HTMLDialogElement
  let selectedPlayer1: number = 0;
  let selectedPlayer2: number = 0;
  
  const createButtonModal = () => matchCreateDialog.showModal()
  const shouldCloseModal = () => {
    if (form?.success) {
      matchCreateDialog?.close();
    }
  }
  const selectedPlayers = (id1: number, id2: number) => {
    const player1 = playerData.find(pl => pl.id === id1)
    const player2 = playerData.find(pl => pl.id === id2)

    return [player1, player2]
  }

  const findPlayer = (id: number) => {
    return playerData.find((p) => p.id === id);
  }

  $: {
    form
    shouldCloseModal()
  }
  $: winnerPool = selectedPlayers(selectedPlayer1, selectedPlayer2)

</script>

<Card span={3} showModal={createButtonModal} class={className || ''}>
  <svelte:fragment slot="title">Matches</svelte:fragment>

  <Dialog bind:dialog={matchCreateDialog}>
    <form method="POST" action="?/addMatch" use:enhance class="flex flex-col gap-4 text-blue-100">
      <div class="grid grid-cols-2 gap-4 w-full">
        <label for="player1">
          <div class="text-blue-100">Select Challenger:</div>
          <select 
            name="player1" 
            id="player1" 
            class="w-full border rounded text-gray-900 py-1 px-2" 
            bind:value={selectedPlayer1}
          >
            {#each playerData as player }
              {#if player.id !== selectedPlayer2}
                <option value="{player.id}">{player.name}</option>
              {/if}
            {/each}
          </select>
        </label>
        <label for="player2">
          <div class="text-blue-100">Select Opponent:</div>
          <select
            name="player2" 
            id="player2" 
            class="w-full border rounded text-gray-900 py-1 px-2" 
            bind:value={selectedPlayer2}
          >
            {#each playerData as player }
              {#if player.id !== selectedPlayer1}
                <option value="{player.id}">{player.name}</option>
              {/if}
            {/each}
          </select>
        </label>
      </div>

      <label for="winner" class="w-full">
        <div class="text-blue-100 text-lg font-bold">Who won?</div>
        <select 
          name="winner" 
          id="winner" 
          class="w-full border rounded text-gray-900 py-1 px-2"
          disabled={selectedPlayer1 === 0 || selectedPlayer2 === 0}
        >
          {#each winnerPool as player }
            {#if player}
              <option value="{player.id}">{player.name}</option>
            {/if}
          {/each}
        </select>
      </label>
      <button 
        type="submit" 
        class="block text-blue-100 font-medium uppercase py-1 px-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-blue-400">Save</button>
    </form>
  </Dialog>

  {#each matchData as match, index }
    <div 
      transition:slide
      class="grid grid-cols-2 items-center w-full border-gray-800 py-2 group relative overflow-hidden"
      class:border-b={index + 1 !== matchData.length}
    >
      <div>
        {#if match.winnerId === match.player1Id}
          🎉
        {/if}
        <span class="font-bold">{findPlayer(match.player1Id)?.name}</span>
      </div>
      <div>
        {#if match.winnerId === match.player2Id}
          🎉
        {/if}
        <span class="font-bold">{findPlayer(match.player2Id)?.name}</span>
      </div>
    </div>
  {/each}
</Card>