import type { Player } from '@prisma/client';

export type FilterOptions = 'score' | 'wins' | 'losses' | 'total';
export type CompareOptions = 'daily' | 'weekly' | 'monthly';
export type RankedPlayer = Player & {
	dailyRank: number;
	weeklyRank: number;
	monthlyRank: number;
};

export const filterPlayers = (sortType: FilterOptions, players: RankedPlayer[]): RankedPlayer[] => {
	if (sortType === 'wins') {
		return players.sort((p1, p2) => {
			if (p1.s1_wins < p2.s1_wins) return 1;
			if (p1.s1_wins > p2.s1_wins) return -1;

			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			if (p1.name > p2.name) return 1;
			if (p1.name < p2.name) return -1;

			return 0;
		});
	}

	if (sortType === 'total') {
		return players.sort((p1, p2) => {
			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			if (p1.s1_wins < p2.s1_wins) return 1;
			if (p1.s1_wins > p2.s1_wins) return -1;

			if (p1.name > p2.name) return 1;
			if (p1.name < p2.name) return -1;

			return 0;
		});
	}

	if (sortType === 'losses') {
		return players.sort((p1, p2) => {
			if (p1.s1_lossess < p2.s1_lossess) return 1;
			if (p1.s1_lossess > p2.s1_lossess) return -1;

			if (p1.s1_score < p2.s1_score) return 1;
			if (p1.s1_score > p2.s1_score) return -1;

			if (p1.s1_wins < p2.s1_wins) return 1;
			if (p1.s1_wins > p2.s1_wins) return -1;

			if (p1.s1_totalGames < p2.s1_totalGames) return 1;
			if (p1.s1_totalGames > p2.s1_totalGames) return -1;

			if (p1.name > p2.name) return 1;
			if (p1.name < p2.name) return -1;

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

			if (p1.name > p2.name) return 1;
			if (p1.name < p2.name) return -1;

			return 0;
		});
	}

	return players;
};

export const previousPlayerRanking = (compareType: CompareOptions, players: Player[]): Player[] => {
	return players;
};

export const compareScore = (player: RankedPlayer, compare: CompareOptions): number => {
	if (compare === 'daily') return player.s1_score - player.s1_dayScore;
	if (compare === 'weekly') return player.s1_score - player.s1_weekScore;
	if (compare === 'monthly') return player.s1_score - player.s1_monthScore;
	return 0;
};

export const isPositive = (num: number) => {
	return Math.sign(num) === 1 ? true : false;
};
