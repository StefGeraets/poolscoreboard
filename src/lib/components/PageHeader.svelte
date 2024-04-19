<script lang="ts">
	export let title: string = 'Pool Scoreboard';
</script>

<header class="grid items-center grid-cols-4 py-4 mx-2 text-xl bg-gray-950">
	<slot name="left"><div></div></slot>
	<h1 class="col-span-2 font-black text-center text-gray-600">{title}</h1>
	<slot name="right"><div></div></slot>
</header>
