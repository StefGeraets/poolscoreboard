import { fail, type Actions } from '@sveltejs/kit';
import DB from '../lib';
import type { PageServerLoad } from './$types';
import { matches, players, teams } from '../lib/db/fetches';

export const load: PageServerLoad = async ({fetch}) => {
	const winsLossess = await fetch(`/api/winsLossess`).then((r) => r.json())

	return { 
		players: await players(), 
		teams: await teams(), 
		matches: await matches(),
		winsLossess: winsLossess.matchesPerPlayer
	};
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

		const strippedName = name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    ).trim();

		await DB.player.create({
			data: { name: strippedName, teamId }
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

		const strippedName = name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    ).trim();
		
		await DB.player.update({
			where: { id },
			data: { name: strippedName, teamId }
		});

		return { success: true }
	},

	addMatch: async ({ request }) => {
		const data = await request.formData();
		const player1Id = Number(data.get('player1'));
		const player2Id = Number(data.get('player2'));
		const winnerId = Number(data.get('winner'));
		const method = String(data.get("method"));

		const players = await DB.player.findMany({ 
			where: {id: { in: [player1Id, player2Id]}}, 
			include: {
				team: true
			}
		})

		const winningPlayer = await DB.player.findFirst({ 
			where: {id: winnerId}, 
			include: {
				team: true
			}
		})

		if (!winningPlayer || !method) {
			return fail(400, { winnerId, notFound: true });
		}

		await DB.match.create({
			data: { player1Id, player2Id, winnerId, method }
		});

		await DB.player.update({
			where: { id: winningPlayer.id },
			data: {
				wins: winningPlayer?.wins + 1
			}
		})

		if(players[0].teamId !== players[1].teamId) {
			await DB.team.update({
				where: {id: winningPlayer.team.id },
				data: {
					score: winningPlayer.team.score + 1
				}
			})
		}

		return { success: true }
	}
};
