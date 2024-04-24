<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { quadIn, quadOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import FormWrapper from './FormWrapper.svelte';
	import Icon from './Icon.svelte';

	export let formOpen: boolean = true;
	export let toggleForm: () => void;

	let working: Boolean = false;

	const handleSubmit = () => {
		working = true;
	};

	const enhanceFormSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				working = false;
				toggleForm();
				update();
			}
		};
	};
</script>

<FormWrapper {formOpen} {toggleForm}>
	<!-- <form
		method="POST"
		action="/?/addMatch"
		on:submit|preventDefault={handleSubmit}
		use:enhance={enhanceFormSubmit}
		in:scale={{ start: 0.9, duration: 200, delay: 150, easing: quadOut }}
		out:scale={{ start: 0.9, duration: 200, easing: quadIn }}
		class="z-20 flex flex-col self-center gap-4 text-blue-100"
	> -->
	<form
		method="POST"
		action="/?/addPlayer"
		on:submit|preventDefault={handleSubmit}
		use:enhance={enhanceFormSubmit}
		in:scale={{ start: 0.9, duration: 200, delay: 150, easing: quadOut }}
		out:scale={{ start: 0.9, duration: 200, easing: quadIn }}
		class="z-20 flex flex-col self-center gap-4 text-blue-100"
	>
		<label for="name">
			<div class="text-blue-100">Player Name:</div>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Enter Player Name"
				value={$page.form?.name ?? ''}
				data-1p-ignore
				class="w-full px-2 py-1 text-gray-900 border rounded"
				class:border-red-400={$page.form?.missing}
			/>
			{#if $page.form?.missing}<p class="text-red-500">The name field is required</p>{/if}
		</label>
		<!-- <label for="team">
			<div class="text-blue-100">Select Team:</div>
			<select name="team" id="team" class="w-full px-2 py-1 text-gray-900 border rounded">
				{#each teamData as team}
					<option value={team.id}>{team.name}</option>
				{/each}
			</select>
		</label> -->
		<button
			type="submit"
			disabled={!!working}
			class="block px-2 py-2 font-medium text-center text-blue-100 uppercase bg-green-800 border border-green-700 rounded hover:bg-gray-700 hover:text-blue-400 disabled:bg-gray-700 disabled:cursor-wait"
		>
			{#if !working}
				Save
			{:else}
				<Icon name="loader" class="mx-auto animate-spin" />
			{/if}
		</button>
	</form>
</FormWrapper>
