import type { Action } from 'svelte/action';

type Attributes = {
	'on:outside'?: (event: CustomEvent) => void;
};
type clickOutsideAction = Action<HTMLElement, unknown, Attributes>;

export const clickOutside: clickOutsideAction = (element) => {
	function handleClick(event: MouseEvent) {
		const targetEl = event.target as HTMLElement;

		if (element && !element.contains(targetEl)) {
			const clickOutsideEvent = new CustomEvent('outside');
			element.dispatchEvent(clickOutsideEvent);
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
