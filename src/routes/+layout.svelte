<script lang="ts">
	import '../satoshi.css';
	import '../app.css';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<main class="bg-gray-950">
	<slot />
</main>
