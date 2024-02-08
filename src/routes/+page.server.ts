import { fail, type Actions } from '@sveltejs/kit';
import DB from '../lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const players = await DB.player.findMany({
		orderBy: [{wins: 'desc'}],
		include: {
			team: true
		}
	});
	const teams = await DB.team.findMany({
		orderBy: [{score: 'desc'}],
		include: {
			players: true
		}
	});
	const matches = await DB.match.findMany({
		orderBy: [{createdAt: 'desc'}],
		include: {
			player1: true,
			player2: true,
			winner: true
		},
		take: 20
	});

	return { players, teams, matches };
};

export const actions: Actions = {
	addTeam: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));

		if (!name) {
			return fail(400, { name, missing: true });
		}

		await DB.team.create({
			data: { name: name as string }
		});

		return { success: true }
	},
	deleteTeam: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await DB.team.delete({ where: { id } });
	},
	editTeam: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = String(data.get('name'));

		if (!name) {
			return fail(400, { name, missing: true });
		}

		await DB.team.update({
			where: { id },
			data: { name }
		});

		return { success: true }
	},

	addPlayer: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const teamId = Number(data.get('team'));

		if (!name) {
			return fail(400, { name, missing: true });
		}

		await DB.player.create({
			data: { name, teamId }
		});

		return { success: true }
	},
	deletePlayer: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await DB.player.delete({ where: { id } });
	},
	editPlayer: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = String(data.get('name'));
		const teamId = Number(data.get('team'));

		if (!name) {
			return fail(400, { name, missing: true });
		}
		
		await DB.player.update({
			where: { id },
			data: { name, teamId }
		});

		return { success: true }
	},

	addMatch: async ({ request }) => {
		const data = await request.formData();
		const player1Id = Number(data.get('player1'));
		const player2Id = Number(data.get('player2'));
		const winnerId = Number(data.get('winner'));

		const winningPlayer = await DB.player.findFirst({ 
			where: {id: winnerId}, 
			include: {
				team: true
			}
		})

		if (!winningPlayer) {
			return fail(400, { winnerId, notFound: true });
		}

		await DB.match.create({
			data: { player1Id, player2Id, winnerId }
		});

		await DB.player.update({
			where: { id: winningPlayer.id },
			data: {
				wins: winningPlayer?.wins + 1
			}
		})

		await DB.team.update({
			where: {id: winningPlayer.team.id },
			data: {
				score: winningPlayer.team.score + 1
			}
		})

		return { success: true }
	}
};
