<script lang="ts">
	import TeamsCard from './TeamsCard.svelte';
	import PlayerCard from './PlayerCard.svelte';
	import MatchesCard from './MatchesCard.svelte';

	export let data;

	const totalScore = (teams: { score: number }[]) => {
		return teams.reduce((sum, team) => {
			return team.score + sum;
		}, 0);
	};
	$: total = totalScore(data.teams);
</script>

<header class="flex flex-col justify-center py-5 text-center text-blue-100 bg-gray-950">
	<h1 class="text-2xl font-black">Pool Scoreboard</h1>
	<h2 class="mt-1 text-lg uppercase text-amber-500 animate-bounce">Final Day before new season</h2>
	<h3 class="text-sm text-gray-400">
		Current ranking will be preserved, <br /> but not used in new season
	</h3>
</header>

<div class="container grid grid-cols-1 gap-4 mx-auto lg:grid-cols-7 md:grid-cols-3">
	<PlayerCard
		playerData={data.players}
		teamData={data.teams}
		winsLossess={data.winsLossess}
		class="order-2 md:order-1"
	/>
	<MatchesCard playerData={data.players} matchData={data.matches} class="order-1 md:order-2" />
	<TeamsCard teamData={data.teams} playerData={data.players} class="order-3 md:order-3" />
</div>
<div class="fixed inset-x-0 bottom-0 flex items-end justify-between h-16">
	{#each data.teams.slice(0, 2) as team, i}
		<div
			class="flex items-center justify-center"
			class:bg-green-800={i === 0}
			class:bg-red-900={i === 1}
			class:h-16={i === 0}
			class:h-14={i === 1}
			style="width: {(team.score / total) * 100}%"
		>
			<h3 class="flex items-center gap-2 text-2xl font-bold uppercase">
				{team.name} <span class="text-sm text-gray-200">({team.score})</span>
			</h3>
		</div>
	{/each}
</div>
<footer class="container flex justify-end pt-8 pb-32 mx-auto">
	<a href="https://github.com/StefGeraets/poolscoreboard/issues/new" target="_blank">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-10 h-10 text-blue-800"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<title>Add new issue</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
			/></svg
		>
	</a>
</footer>
