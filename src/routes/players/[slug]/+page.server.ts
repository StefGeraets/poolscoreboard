import { redirect } from '@sveltejs/kit';
import DB from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const name = params.slug;
	const player = await DB.player.findUnique({ where: { name } });

	if (!player) return redirect(301, '/');

	return {
		player,
		matches: await fetch(`/api/player/${player.id}/matches`).then((r) => r.json())
	};
};
