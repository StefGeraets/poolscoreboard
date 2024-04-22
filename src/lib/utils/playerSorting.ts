import type { Player } from '@prisma/client';

export type FilterOptions = 'score' | 'wins' | 'losses' | 'total';
export type CompareOptions = 'daily' | 'weekly' | 'monthly';

export const filterPlayers = (sortType: FilterOptions, players: Player[]): Player[] => {
	if (sortType === 'wins') {
		return players.sort((p1, p2) => {
			if (p1.s1_wins < p2.s1_wins) return 1;
			if (p1.s1_wins > p2.s1_wins) return -1;

			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			return 0;
		});
	}

	if (sortType === 'total') {
		return players.sort((p1, p2) => {
			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			return 0;
		});
	}

	if (sortType === 'losses') {
		return players.sort((p1, p2) => {
			if (p1.s1_lossess < p2.s1_lossess) return 1;
			if (p1.s1_lossess > p2.s1_lossess) return -1;

			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			return 0;
		});
	}

	if (sortType === 'score') {
		return players.sort((p1, p2) => {
			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			if (p1.s1_wins < p2.s1_wins) return 1;
			if (p1.s1_wins > p2.s1_wins) return -1;

			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			return 0;
		});
	}

	return players;
};

export const previousPlayerRanking = (compareType: CompareOptions, players: Player[]): Player[] => {
	return players;
};
