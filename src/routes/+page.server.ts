import { fail, type Actions } from '@sveltejs/kit';
import DB from '../lib';
import type { Action, PageServerLoad } from './$types';

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

export const actions: Actions = {
	createTeam: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));

		if (!name) {
			return fail(400, { name, missing: true });
		}

		await DB.team.create({
			data: { name: name as string }
		});
	},
	deleteTeam: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await DB.team.delete({ where: { id } });
	}
};
