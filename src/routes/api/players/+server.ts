import DB from '$lib/prisma.js';
import type { Player } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const players = await DB.player.findMany();

	const sortedPlayers = players.sort((a, b) => {
		if (a.s1_curRanking < b.s1_curRanking) return 1;
		if (a.s1_curRanking > b.s1_curRanking) return -1;

		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;

		return 0;
	});

	let result: Partial<Player[]> = sortedPlayers;
	if (url.searchParams.has('simple')) {
		result = sortedPlayers.map((player) => ({
			id: player.id,
			name: player.name
		}));
	}

	return new Response(JSON.stringify(result));
};
