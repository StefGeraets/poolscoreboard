<script lang="ts">
	import '../satoshi.css';
	import '../app.css';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<main class="bg-gray-950">
	<slot />

	<footer class="fixed bottom-0 w-full rounded-t-2xl bg-gray-950/60 backdrop-blur-md">
		<ul class="flex items-center justify-around">
			<li class="p-4">
				<a href="/" class="w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 21l8 0" /><path
							d="M12 17l0 4"
						/><path d="M7 4l10 0" /><path d="M17 4v8a5 5 0 0 1 -10 0v-8" /><path
							d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
						/><path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg
					>
				</a>
			</li>
			<li class="p-4">
				<a href="#" class="w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
							d="M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
						/><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path
							d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"
						/></svg
					>
				</a>
			</li>
			<li class="relative w-10">
				<a
					href="#"
					class="absolute flex items-center justify-center p-4 text-blue-700 rounded-full bg-gray-950 backdrop-blur-lg -inset-x-4 -top-11"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="w-10 h-10"
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path
							d="M5 12l14 0"
						/></svg
					>
				</a>
			</li>
			<li class="p-4">
				<a href="#" class="w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
							d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
						/><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path
							d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
						/><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path
							d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
						/><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg
					>
				</a>
			</li>
			<li class="p-4">
				<a href="#" class="w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class=""
						><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
							d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
						/><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path
							d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
						/></svg
					>
				</a>
			</li>
		</ul>
	</footer>
</main>
