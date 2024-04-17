import type { LayoutServerLoad } from './$types';

type SimplePlayer = {
	id: number;
	name: string;
};

export const load: LayoutServerLoad = async ({ fetch }) => {
	const playersList: SimplePlayer[] = await fetch(`/api/players?simple=true`).then((r) => r.json());

	return {
		playersList
	};
};
