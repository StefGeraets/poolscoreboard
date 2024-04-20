<script lang="ts">
	import { page } from '$app/stores';
	import Icon from './Icon.svelte';

	export let title: string = 'Pool Scoreboard';

	$: isHome = $page.url.pathname === '/';
	$: isPlayer =
		$page.url.pathname.split('/').length > 2 && $page.url.pathname.split('/').includes('players');
</script>

<header class="grid items-center grid-cols-4 py-4 mx-2 text-xl bg-gray-950">
	<slot name="left">
		{#if !isHome && !isPlayer}
			<a href="/">
				<Icon name="home" />
			</a>
		{:else if isPlayer}
			<a href="/players">
				<Icon name="chevronLeft" />
			</a>
		{:else}
			<div></div>
		{/if}
	</slot>
	<h1 class="col-span-2 font-black text-center text-gray-600">{title}</h1>
	<slot name="right"><div></div></slot>
</header>
