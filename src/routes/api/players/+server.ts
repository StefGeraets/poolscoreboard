import DB from '$lib/prisma.js';
import type { Player } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const players = await DB.player.findMany({
		orderBy: [
			{
				s1_score: 'desc'
			},
			{
				name: 'asc'
			}
		]
	});

	// const sortedPlayers = players.sort((a, b) => {
	// 	if (a.s1_score < b.s1_score) return 1;
	// 	if (a.s1_score > b.s1_score) return -1;

	// 	if (a.name < b.name) return -1;
	// 	if (a.name > b.name) return 1;

	// 	return 0;
	// });

	let result: Partial<Player>[] = players;
	if (url.searchParams.has('simple')) {
		result = players
			.map((player) => ({
				id: player.id,
				name: player.name
			}))
			.sort((a, b) => (a.name < b.name ? -1 : 1));
	}

	if (url.searchParams.has('daily')) {
		result = players.sort((p1, p2) => {
			if (p1.s1_dayScore < p2.s1_dayScore) return 1;
			if (p1.s1_dayScore > p2.s1_dayScore) return -1;

			if (p1.name < p2.name) return 1;
			if (p1.name > p2.name) return -1;

			return 0;
		});
	}

	if (url.searchParams.has('weekly')) {
		result = players.sort((p1, p2) => {
			if (p1.s1_weekScore < p2.s1_weekScore) return 1;
			if (p1.s1_weekScore > p2.s1_weekScore) return -1;

			if (p1.name < p2.name) return 1;
			if (p1.name > p2.name) return -1;

			return 0;
		});
	}

	if (url.searchParams.has('monthly')) {
		result = players.sort((p1, p2) => {
			if (p1.s1_monthScore < p2.s1_monthScore) return 1;
			if (p1.s1_monthScore > p2.s1_monthScore) return -1;

			if (p1.name < p2.name) return 1;
			if (p1.name > p2.name) return -1;

			return 0;
		});
	}

	return new Response(JSON.stringify(result));
};
