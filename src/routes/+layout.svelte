<script lang="ts">
	import '../satoshi.css';
	import '../app.css';
	import MatchForm from '$lib/components/MatchForm.svelte';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import PageFooter from '$lib/components/PageFooter.svelte';

	injectSpeedInsights();

	let matchFormOpen: boolean = false;

	const toggleMatchForm = () => {
		matchFormOpen = !matchFormOpen;
	};
</script>

<main class="antialiased bg-gray-950">
	<MatchForm openDialog={matchFormOpen} toggleDialog={toggleMatchForm} />

	<section class="pb-28">
		<slot />
	</section>

	<PageFooter {toggleMatchForm} />
</main>
