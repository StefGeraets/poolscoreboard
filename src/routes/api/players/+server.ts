import DB from '$lib/prisma.js';
import type { Player } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import type { RankedPlayer } from '$lib/utils/playerHelpers';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const players = await DB.player.findMany({
			orderBy: [
				{
					s1_score: 'desc'
				},
				{
					s1_wins: 'desc'
				},
				{
					s1_totalGames: 'desc'
				},
				{
					name: 'asc'
				}
			]
		});

		const dailyRankedPlayers = players
			.filter((p) => p.s1_ranked)
			.toSorted((p1, p2) => {
				if (p1.s1_dayScore < p2.s1_dayScore) return 1;
				if (p1.s1_dayScore > p2.s1_dayScore) return -1;

				if (p1.s1_wins < p2.s1_wins) return 1;
				if (p1.s1_wins > p2.s1_wins) return -1;

				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				if (p1.name > p2.name) return 1;
				if (p1.name < p2.name) return -1;

				return 0;
			});

		const weeklyRankedPlayers = players
			.filter((p) => p.s1_ranked)
			.toSorted((p1, p2) => {
				if (p1.s1_weekScore < p2.s1_weekScore) return 1;
				if (p1.s1_weekScore > p2.s1_weekScore) return -1;

				if (p1.s1_wins < p2.s1_wins) return 1;
				if (p1.s1_wins > p2.s1_wins) return -1;

				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				if (p1.name > p2.name) return 1;
				if (p1.name < p2.name) return -1;

				return 0;
			});
		const monthlyRankedPlayers = players
			.filter((p) => p.s1_ranked)
			.toSorted((p1, p2) => {
				if (p1.s1_monthScore < p2.s1_monthScore) return 1;
				if (p1.s1_monthScore > p2.s1_monthScore) return -1;

				if (p1.s1_wins < p2.s1_wins) return 1;
				if (p1.s1_wins > p2.s1_wins) return -1;

				if (p1.s1_totalGames < p2.s1_totalGames) return 1;
				if (p1.s1_totalGames > p2.s1_totalGames) return -1;

				if (p1.name > p2.name) return 1;
				if (p1.name < p2.name) return -1;

				return 0;
			});

		const playersWithRanking: RankedPlayer[] = players.map((player, i) => {
			const currRank = player.s1_ranked ? i + 1 : 0;
			const dailyRanking = dailyRankedPlayers.findIndex((p) => p.id === player.id) + 1;
			const weeklyRanking = weeklyRankedPlayers.findIndex((p) => p.id === player.id) + 1;
			const monthlyRanking = monthlyRankedPlayers.findIndex((p) => p.id === player.id) + 1;

			return {
				...player,
				dailyRank: dailyRanking - currRank,
				weeklyRank: weeklyRanking - currRank,
				monthlyRank: monthlyRanking - currRank
			};
		});

		let result: Partial<Player>[] = await playersWithRanking;

		if (url.searchParams.has('simple')) {
			result = players
				.map((player) => ({
					id: player.id,
					name: player.name
				}))
				.toSorted((a, b) => (a.name < b.name ? -1 : 1));
		}
		return new Response(JSON.stringify(result));
	} catch (e) {
		console.log('', e);
		return new Response(JSON.stringify('error'));
	}
};
