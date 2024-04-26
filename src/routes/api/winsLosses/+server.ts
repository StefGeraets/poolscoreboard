import DB from '$lib/prisma.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const players = await DB.player.findMany();
	const matches = await DB.match.findMany();

	const matchesPerPlayer = players.map((player) => {
		const playedGames = matches
			.filter((match) => !match.s1)
			.filter((match) => {
				if (match.player1Id === player.id || match.player2Id === player.id) {
					return true;
				}
				return false;
			});

		const losses = playedGames.length - player.wins;
		const basicKd = Number((player.wins / losses).toFixed(2));
		const kd = basicKd === Infinity ? player.wins : basicKd;

		return {
			id: player.id,
			name: player.name,
			amountOfGames: playedGames.length,
			wins: player.wins,
			losses: losses,
			kd
		};
	});

	return new Response(JSON.stringify({ matchesPerPlayer }));
};
