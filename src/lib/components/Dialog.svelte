<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close
	on:click|self={() => dialog.close()}
	class="max-w-xl px-4 py-4 bg-gray-900 border border-gray-800 rounded shadow-lg"
>
	<slot />
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.8);
		animation: fade 0.2s ease-out;
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
