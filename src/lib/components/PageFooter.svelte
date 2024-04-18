<script lang="ts">
	import {
		IconDotsVertical,
		IconPlus,
		IconSportBillard,
		IconTrophy,
		IconUser
	} from '@tabler/icons-svelte';
	import { slide } from 'svelte/transition';

	export let toggleMatchForm: () => void;

	let extraMenuOpen: boolean = false;

	const extraMenuItems: { url: string; title: string }[] = [
		{
			url: 'https://github.com/StefGeraets/poolscoreboard/issues/new?labels=enhancement&template=feature_request.md&title=I%20want%20to%20be%20able%20to',
			title: 'Suggest a new feature'
		},
		{
			url: 'https://github.com/StefGeraets/poolscoreboard/issues/new?labels=bug&template=bug_report.md&title=Issue:',
			title: 'Report a bug'
		},
		{
			url: 'https://github.com/StefGeraets/poolscoreboard',
			title: 'Want to contribute?'
		},
		{
			url: 'https://github.com/StefGeraets/poolscoreboard',
			title: 'See sourcecode'
		}
	];
</script>

<footer class="fixed bottom-0 w-full rounded-t-2xl bg-gray-950/60 backdrop-blur-md">
	<ul class="flex items-center justify-around">
		<li class="p-4">
			<a href="/" class="w-6 h-6 disabled:text-gray-600">
				<IconTrophy />
			</a>
		</li>
		<li class="p-4">
			<a href="/matches" class="w-6 h-6 disabled:text-gray-600">
				<IconSportBillard />
			</a>
		</li>
		<li class="relative w-10">
			<button
				class="absolute flex items-center justify-center p-4 text-blue-700 rounded-full bg-gray-950 backdrop-blur-lg -inset-x-4 -top-11"
				on:click={toggleMatchForm}
			>
				<IconPlus size={40} />
			</button>
		</li>
		<li class="p-4">
			<a href="/players" class="w-6 h-6 disabled:text-gray-600">
				<IconUser />
			</a>
		</li>
		<li class="relative p-4">
			{#if extraMenuOpen}
				<div
					transition:slide
					class="absolute right-0 flex flex-col gap-1 px-1 py-1 text-xs rounded-t shadow-md bottom-full w-52 min-w-min max-w-max bg-gray-950"
				>
					{#each extraMenuItems as menuItem}
						<a
							href={menuItem.url}
							class="px-4 py-2 text-center uppercase border rounded border-gray-700/20 bg-gray-900/50"
						>
							{menuItem.title}
						</a>
					{/each}
				</div>
			{/if}
			<button
				on:click={() => (extraMenuOpen = !extraMenuOpen)}
				class="w-6 h-6 transition-transform"
				class:text-blue-800={extraMenuOpen}
			>
				<IconDotsVertical />
			</button>
		</li>
	</ul>
</footer>
