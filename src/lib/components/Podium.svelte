<script lang="ts">
	import type { Player } from '@prisma/client';
	import { fly, slide, type FlyParams, type SlideParams } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { expoInOut, quadOut } from 'svelte/easing';

	export let player: Player;
	export let place: 1 | 2 | 3 = 1;

	const flyAnimation: Record<'1' | '2' | '3', FlyParams> = {
		'1': { delay: 1750, y: 15, opacity: 0, easing: expoInOut },
		'2': { delay: 1250, y: 15, opacity: 0, easing: expoInOut },
		'3': { delay: 750, y: 15, opacity: 0, easing: expoInOut }
	};

	const slideAnimation: Record<'1' | '2' | '3', SlideParams> = {
		'1': { delay: 1100, duration: 750, easing: quadOut },
		'2': { delay: 600, duration: 750, easing: quadOut },
		'3': { delay: 100, duration: 750, easing: quadOut }
	};
</script>

<div>
	<a
		href={`/players/${player.name}`}
		in:fly={flyAnimation[place]}
		class="flex flex-col pb-3 font-black leading-none text-center uppercase"
	>
		<div class="flex items-center justify-center">
			<div class="text-[8px] grid grid-rows-2 place-items-center place-content-center mr-1.5">
				{#if true}
					<div class="self-start text-green-600">
						<Icon name="arrowUp" size={10} />
					</div>
					<div class="text-green-600">+2</div>
					<!-- <div class="self-end text-red-600">
          <Icon name="arrowDown" size={10} />
        </div> -->
				{:else}
					<span class="w-2.5"></span>
				{/if}
			</div>
			{player.name}
			<div class="grid grid-cols-1 grid-rows-1 ml-1 -mt-1 place-items-center">
				{#if player.s1_onAStreak && player.s1_currentStreak >= 3}
					<span class="col-start-1 row-start-1 opacity-50">🔥</span>
					<span class="z-10 col-start-1 row-start-1 pt-1 text-[10px] font-black text-white">
						{player.s1_currentStreak}
					</span>
				{:else}
					<span class="w-5"></span>
				{/if}
			</div>
		</div>
		<span class="text-sm font-normal normal-case text-gray-50/75">
			{player.s1_ranked ? player.s1_score : 'Not Ranked'}
		</span>
	</a>
	<div
		in:slide={slideAnimation[place]}
		class="relative rounded-t-md"
		class:gold-bar={place === 1}
		class:silver-bar={place === 2}
		class:bronze-bar={place === 3}
	>
		<div class=" bg-black/65 absolute rounded-t-md bottom-0 inset-px p-2 flex flex-col gap-0.5">
			<div class="flex justify-between text-xs">
				<span>W / L:</span>
				<span class="font-bold text-white">
					<span class="text-green-400">{player.s1_wins}</span> /
					<span class="text-red-400">{player.s1_lossess}</span>
				</span>
			</div>
			<div class="flex justify-between text-xs">
				<span>Matches:</span><span class="font-bold text-white">
					{player.s1_totalGames}
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.gold-bar {
		height: 128px;
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#fedb37 0%,
				#fdb931 8%,
				#9f7928 30%,
				#8a6e2f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#ffffac 8%,
				#d1b464 25%,
				#5d4a1f 62.5%,
				#5d4a1f 100%
			);
	}
	.gold-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsla(60, 100%, 84%, 15%);
	}

	.silver-bar {
		height: 96px;
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#b2d5dd 0%,
				#97bfd8 8%,
				#6e92a5 30%,
				#5f808f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#e3f3f6 8%,
				#a1c7d1 25%,
				#4b6e75 62.5%,
				#375964 100%
			);
	}

	.silver-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsla(189, 51%, 93%, 15%);
	}

	.bronze-bar {
		height: 64px;
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#fea437 0%,
				#fd8d31 8%,
				#9f5a28 30%,
				#8a582f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#ffd6ac 8%,
				#d19064 25%,
				#5d3c1f 62.5%,
				#5d3c1f 100%
			);
	}

	.bronze-bar:after {
		content: '';
		display: block;
		position: absolute;
		left: 3px;
		top: 3px;
		background: transparent;
		border-radius: 10px;
		box-shadow: 0 0 15px 10px hsl(30, 100%, 84%, 15%);
	}
</style>
