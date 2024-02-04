import DB from '../lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const players = await DB.player.findMany({
		include: {
			team: true
		}
	});
	const teams = await DB.team.findMany({
		include: {
			players: true
		}
	});
	const matches = await DB.match.findMany({
		include: {
			player1: true,
			player2: true,
			winner: true
		}
	});

	return { players, teams, matches };
};
