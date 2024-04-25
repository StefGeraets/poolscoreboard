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
			player: { name: string; wins: number };
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
			let lossess = 0;

			if (player.id === game.winnerId) {
				if (groupedGames[key]) {
					wins = groupedGames[key].player.wins + 1;
					lossess = groupedGames[key].opponent.wins;
				} else {
					wins++;
				}
			} else {
				if (groupedGames[key]) {
					wins = groupedGames[key].player.wins;
					lossess = groupedGames[key].opponent.wins + 1;
				} else {
					lossess++;
				}
			}

			groupedGames[key] = {
				player: {
					name: player.name,
					wins
				},
				opponent: {
					name: opponent.name,
					wins: lossess
				}
			};
		});

	const groupedGamesArray = Object.keys(groupedGames).map((key) => [groupedGames[key]]);
	return new Response(JSON.stringify(groupedGamesArray.flat()));
};
