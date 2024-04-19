import { fail, type Actions } from '@sveltejs/kit';
import DB from '../lib';
import type { PageServerLoad } from './$types';
// import { players } from '../lib/db/fetches';
import type { Player } from '@prisma/client';

export const load: PageServerLoad = async ({ fetch }) => {
	const players = await fetch(`/api/players`).then((r) => r.json());

	return {
		players: await players
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

		return { success: true };
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

		return { success: true };
	},

	addPlayer: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const teamId = Number(data.get('team'));

		if (!name) {
			return fail(400, { name, missing: true });
		}

		const strippedName = name
			.replace(
				/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
				''
			)
			.trim();

		await DB.player.create({
			data: { name: strippedName, teamId }
		});

		return { success: true };
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

		const strippedName = name
			.replace(
				/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
				''
			)
			.trim();

		await DB.player.update({
			where: { id },
			data: { name: strippedName, teamId }
		});

		return { success: true };
	},

	addMatch: async ({ request }) => {
		const data = await request.formData();
		const player1Id = Number(data.get('player1'));
		const player2Id = Number(data.get('player2'));
		const winnerId = Number(data.get('winner'));
		const method = String(data.get('method')) || 'fair';

		const BASE_WIN_SCORE = 10;
		const BASE_LOSE_SCORE = 0;
		const allPlayers = await DB.player.findMany({
			orderBy: {
				s1_score: 'desc'
			}
		});

		const gamePlayers = await DB.player.findMany({
			where: { id: { in: [player1Id, player2Id] } }
		});

		const winningPlayer = gamePlayers.find((p) => p.id === winnerId);
		const losingPlayer = gamePlayers.find((p) => p.id !== winnerId);

		if (!winningPlayer || !method || !losingPlayer) {
			return fail(400, { winnerId, notFound: true });
		}

		const streakData = (player: Player, isWinning: boolean = false) => {
			let s1_onAStreak: boolean = false;
			let s1_currentStreak: number = 0;
			const s1_longestStreak: number =
				player.s1_longestStreak > player.s1_currentStreak
					? player.s1_longestStreak
					: player.s1_currentStreak;

			if (isWinning) {
				s1_onAStreak = true;
				s1_currentStreak = player.s1_currentStreak + 1;
			}

			return {
				s1_onAStreak,
				s1_currentStreak,
				s1_longestStreak
			};
		};

		const getScore = (isWinning: boolean = false) => {
			let s1_score: number = 0;
			let _score: number = 0;

			// Player is winning
			if (isWinning) {
				// losing player is not ranked
				if (!losingPlayer.s1_ranked) {
					_score = 10;
					s1_score = winningPlayer.s1_score + 10;
				} else {
					// Score calculation
					_score = Math.min(Math.max(5, BASE_WIN_SCORE + (winningIndex - losingIndex)), 15);
					s1_score = winningPlayer.s1_score + _score;
				}
			} else {
				// Player is loser
				_score = Math.min(Math.max(-5, losingIndex - winningIndex), BASE_LOSE_SCORE);
				s1_score = losingPlayer.s1_score + _score;
			}

			return {
				s1_score,
				s1_ranked: true,
				_score
			};
		};

		const losingIndex: number =
			winningPlayer.s1_ranked && losingPlayer.s1_ranked
				? allPlayers.findIndex((p) => p.id === losingPlayer.id) + 1
				: 0;

		const winningIndex: number =
			winningPlayer.s1_ranked && losingPlayer.s1_ranked
				? allPlayers.findIndex((p) => p.id === winningPlayer.id) + 1
				: 0;

		const winScore = getScore(true);
		const loseScore = getScore();

		// TODO: un comment this create match
		await DB.match.create({
			data: {
				player1Id,
				player2Id,
				winnerId,
				method,
				s1: true,
				s1_pointsWon: winScore._score,
				s1_pointsLost: loseScore._score
			}
		});

		// update winner
		await DB.player.update({
			where: { id: winningPlayer.id },
			data: {
				...streakData(winningPlayer, true),
				s1_score: winScore.s1_score,
				s1_ranked: winScore.s1_ranked,
				s1_wins: winningPlayer.s1_wins + 1,
				s1_totalGames: winningPlayer.s1_totalGames + 1
			}
		});

		// update loser
		await DB.player.update({
			where: { id: losingPlayer.id },
			data: {
				...streakData(losingPlayer),
				s1_score: loseScore.s1_score,
				s1_ranked: loseScore.s1_ranked,
				s1_lossess: winningPlayer.s1_lossess + 1,
				s1_totalGames: winningPlayer.s1_totalGames + 1
			}
		});

		return { success: true };
	}
};
