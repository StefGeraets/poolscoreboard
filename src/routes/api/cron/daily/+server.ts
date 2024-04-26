import type { RequestHandler } from '@sveltejs/kit';
import DB from '$lib';

export const GET: RequestHandler = async () => {
	await DB.$transaction(async (tx) => {
		const players = await tx.player.findMany({ where: { s1_ranked: true } });
		for (const player of players) {
			await tx.player.update({
				where: { id: player.id },
				data: {
					s1_dayScore: player.s1_score
				}
			});
		}
	});

	return new Response('updated daily score', { status: 200 });
};
