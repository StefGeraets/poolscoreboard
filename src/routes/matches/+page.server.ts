import type { PageServerLoad } from '../$types';
import DB from '$lib';

const PAGE_SIZE: number = 20;

export const load: PageServerLoad = async ({ url }) => {
	const page = +(url.searchParams.get('page') || 1) - 1;

	const [count, matches] = await Promise.all([
		DB.match.count({ where: { s1: true } }),
		DB.match.findMany({
			orderBy: [
				{
					createdAt: 'desc'
				}
			],
			include: {
				player1: true,
				player2: true,
				winner: true
			},
			skip: page * PAGE_SIZE,
			take: PAGE_SIZE,
			where: { s1: true }
		})
	]);

	return {
		page,
		count,
		pages: Math.ceil(count / PAGE_SIZE),
		matches
	};
};
