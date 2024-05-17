import DB from '$lib/prisma.js';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const id = Number(params.id);

	const player = await DB.player.findUnique({ where: { id } });
	const players = await DB.player.findMany();
	const matches = await DB.match.findMany();

	if (!player) return error(404, 'Player not found');

	const gamesPlayed = matches.filter((match) => {
		if (match.player1Id === player.id || match.player2Id === player.id) {
			return true;
		}
		return false;
	});

	const getPlayer = (id: number) => players.find((p) => p.id === id);

	const groupedGames: Record<
		string,
		{
			player: { name: string; wins: number; gained: number; lost: number };
			opponent: { name: string; wins: number };
		}
	> = {};

	gamesPlayed
		.filter((game) => game.s1)
		.map((game) => {
			let opponent = getPlayer(game.player1Id);

			if (player.id === game.player1Id) {
				opponent = getPlayer(game.player2Id);
			}

			if (!opponent) return;

			const key = `${player.name}_${opponent.name}`;

			let wins = 0;
			let losses = 0;
			let gained = groupedGames[key]?.player.gained || 0;
			let lost = groupedGames[key]?.player.lost || 0;

			if (player.id === game.winnerId) {
				if (groupedGames[key]) {
					wins = groupedGames[key].player.wins + 1;
					losses = groupedGames[key].opponent.wins;
					gained = groupedGames[key].player.gained + game.s1_pointsWon;
				} else {
					wins++;
					gained = game.s1_pointsWon;
				}
			} else {
				if (groupedGames[key]) {
					wins = groupedGames[key].player.wins;
					losses = groupedGames[key].opponent.wins + 1;
					lost = groupedGames[key].player.lost + game.s1_pointsLost;
				} else {
					losses++;
					lost = game.s1_pointsLost;
				}
			}

			groupedGames[key] = {
				player: {
					name: player.name,
					wins,
					gained,
					lost
				},
				opponent: {
					name: opponent.name,
					wins: losses
				}
			};
		});

	const groupedGamesArray = Object.keys(groupedGames).map((key) => [groupedGames[key]]);
	return new Response(JSON.stringify(groupedGamesArray.flat()));
};
