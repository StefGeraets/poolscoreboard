import type { PageServerLoad } from '../$types';
import DB from '$lib';

export const load: PageServerLoad = async ({ fetch }) => {
	const winsLosses = await fetch(`/api/winsLosses`).then((r) => r.json());
	const players = await DB.player.findMany({
		orderBy: [{ wins: 'desc' }],
		include: {
			team: true
		}
	});

	return {
		players: players,
		// teams: await teams(),
		// matches: await matches(),
		winsLosses: winsLosses.matchesPerPlayer
	};
};
