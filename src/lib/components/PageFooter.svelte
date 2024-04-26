<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { page } from '$app/stores';
	import { clickOutside } from '../utils/clickOutside';

	export let toggleMatchForm: () => void;

	let extraMenuOpen: boolean = false;

	const extraMenuItems: { url: string; title: string }[] = [
		{
			url: '/season-zero',
			title: 'Previous Season'
		},
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
			title: 'See source code'
		}
	];

	$: path = $page.url.pathname;
</script>

<footer class="fixed bottom-0 w-full rounded-t-2xl bg-gray-950/60 backdrop-blur-md">
	<ul class="flex items-center justify-around">
		<li
			class="relative p-4 menu-item"
			class:text-blue-500={path === '/'}
			class:active={path === '/'}
		>
			<a href="/" class="w-6 h-6 disabled:text-gray-600">
				<Icon name="trophy" />
			</a>
		</li>
		<li
			class="relative p-4 menu-item"
			class:text-blue-500={path === '/matches'}
			class:active={path === '/matches'}
		>
			<a href="/matches" class="w-6 h-6 disabled:text-gray-600">
				<Icon name="8ball" />
			</a>
		</li>
		<li class="relative w-10">
			<button
				class="absolute flex items-center justify-center p-4 text-blue-700 rounded-full bg-gray-950 backdrop-blur-lg -inset-x-4 -top-11"
				on:click={toggleMatchForm}
			>
				<Icon size={40} name="plus" />
			</button>
		</li>
		<li
			class="relative p-4 menu-item"
			class:text-blue-500={path.split('/').includes('players')}
			class:active={path.split('/').includes('players')}
		>
			<a href="/players" class="w-6 h-6 disabled:text-gray-600">
				<Icon name="user" />
			</a>
		</li>
		<li class="relative p-4 menu-item" class:text-blue-500={extraMenuOpen}>
			{#if extraMenuOpen}
				<div
					transition:slide
					class="absolute right-0 flex flex-col gap-1 px-1 py-1 text-xs rounded-t shadow-md text-gray-50 bottom-full w-52 min-w-min max-w-max bg-gray-950"
				>
					{#each extraMenuItems as menuItem, i}
						<a
							href={menuItem.url}
							class="px-4 py-2 text-center uppercase border rounded border-gray-700/20 bg-gray-900/50"
							class:bg-blue-800={menuItem.url.includes('season')}
						>
							{menuItem.title}
						</a>
					{/each}
				</div>
			{/if}
			<button
				on:click={() => (extraMenuOpen = !extraMenuOpen)}
				use:clickOutside
				on:outside={() => (extraMenuOpen = false)}
				class="w-6 h-6 align-middle transition-transform"
				class:-rotate-90={extraMenuOpen}
			>
				<Icon name="dots" />
			</button>
		</li>
	</ul>
</footer>

<style>
	.menu-item:after {
		content: '';
		position: absolute;
		left: 5px;
		bottom: -5%;
		background: radial-gradient(
			at bottom,
			rgba(219, 234, 254, 0.6) 0%,
			rgba(96, 165, 250, 0.4) 25%,
			rgba(0, 0, 0, 0) 65%
		);
		width: 46px;
		height: 35px;
		transition: opacity 300ms ease-out;
		opacity: 1;
		pointer-events: none;
	}
	.menu-item:not(.active):after {
		opacity: 0;
	}
</style>
