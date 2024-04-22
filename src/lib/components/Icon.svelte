<script lang="ts">
	import iconPaths from '../utils/iconPaths';

	export let name: keyof typeof iconPaths;
	export let size: number = 24;
	let className: string = '';
	export { className as class };

	$: paths = iconPaths[name] || [];
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className || ''}
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	{#each paths as path}
		<path d={path} />
	{/each}
</svg>
