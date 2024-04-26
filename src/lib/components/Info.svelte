<script lang="ts">
	import { quadIn, quadOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<!-- svelte-ignore missing-declaration -->
<div
	in:scale={{ start: 0.9, duration: 200, delay: 150, easing: quadOut }}
	out:scale={{ start: 0.9, duration: 200, easing: quadIn }}
	class="z-20 flex flex-col self-start gap-4 mt-16 overflow-y-auto text-blue-100 max-h-dvh pb-28"
>
	<h2 class="h2">Welcome to Season 1</h2>
	<p>
		Welcome to the new season. This is dubbed season 1 because we gonna work with a complete new
		score system, design and new features. You can find the <a href="/season-zero"
			>season 0 results</a
		> in the bottom right menu.
	</p>
	<h3 class="h3">Score system</h3>
	<p>
		For winning a match you earn <span class="positive">10 points</span> by default. This score is
		altered by the difference in ranking between you and your opponent. When your opponent is above
		you in the ranking, you wil earn more point equal to the difference in standing. Up to a maximum
		of <span class="positive">15 points</span>. When the opponent is below you in rank, you will
		earn less points. Up to a minimum of <span class="positive">5 points</span>.
	</p>
	<p>
		When losing a match you can lose points. You lose points when you lose from an opponent that is
		below you in the ranking. The points are determined by the difference in rank. Up to a maximum
		of <span class="negative">5 points</span>. You will lose 0 points if you lose when your opponent
		is above you in ranking.
	</p>
	<h3 class="h3">Ranking</h3>
	<p>
		The ranking can be viewed by comparing to previous day, week or month. The day scores are saved
		nightly, the week scores are saved every sunday night and the month score is saved in the early
		morning on the first day of the month.
	</p>
	<p>
		The ranking is determined (ordered) by Score, Wins, Total Matches, Player Name. The comparison
		by period is occurring in the same order, but with the relative score. So Day Score, Wins, Total
		Matches, Player Name.
	</p>
	<h3 class="h3">Features</h3>
	<p>
		<strong>Streak: </strong> When you manage to win 3 games in a row, you wil get a flame behind your
		name. You can see on the player stats page your highest achieved win streak.
	</p>
	<p>
		<strong>Match History: </strong>Click the eight-ball in the bottom navigation to see the match
		history. You can also get insights in how many points you gained or lost by a match.
	</p>
	<p>
		<strong>Stats: </strong>Click on a name on the leaderboard screen to view the player stats. Or
		use the player icon in the bottom bar. And find out their nemesis, highest win streak and other
		stats of the player.
	</p>
	<p>
		<strong>Teams: </strong>Teams are no longer a thing in this season. Rivalry is between the
		players, not between the teams.
	</p>
	<p>
		<strong>Ideas: </strong>When you think of some awesome feature to add to this app
		<small>(for example achievements...)</small>, please submit a
		<a
			href="https://github.com/StefGeraets/poolscoreboard/issues/new?labels=enhancement&template=feature_request.md&title=I%20want%20to%20be%20able%20to"
			>feature request</a
		>. Or ask Stef on Slack
	</p>
</div>

<style lang="postcss">
	.h2 {
		@apply text-2xl font-bold;
	}

	.h3 {
		@apply text-lg font-medium;
	}

	a {
		@apply text-blue-400;
	}

	.positive {
		@apply text-green-600;
	}

	.negative {
		@apply text-red-600;
	}
</style>
