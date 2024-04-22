import { redirect } from '@sveltejs/kit';
import DB from '$lib';
import type { PageServerLoad } from './$types';
import type { Player } from '@prisma/client';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const name = params.slug;
	const player = await DB.player.findUnique({ where: { name } });
	const statsRes = await fetch(`/api/winsLossess`).then((r) => r.json());

	if (!player) return redirect(301, '/');

	const stats = statsRes.matchesPerPlayer.find((stat: Player) => stat.id === player.id);

	return {
		player,
		stats,
		matches: await fetch(`/api/player/${player.id}/matches`).then((r) => r.json())
	};
};
