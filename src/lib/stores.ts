import { writable } from 'svelte/store';
import type { CompareOptions } from '$lib/utils/playerHelpers';

export const compare = writable<CompareOptions>('weekly');
