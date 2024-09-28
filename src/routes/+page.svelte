<script lang="ts">
	import { inView, currentInViewIds, isInView, inViewData } from '$lib/index.js';

	$inspect('Test 1', isInView('test1'), inViewData('test1'));
</script>

<div class="sticky-top">
	{currentInViewIds().join(', ')}
</div>
<div style="height: 100vh;"></div>

<section>
	<div class="element" use:inView={{ id: 'test1' }}></div>
	<div class="element" use:inView={{ id: 'test2' }}></div>
	<div class="element" use:inView={{ id: 'test3' }}></div>
	<div class="element" use:inView={{ id: 'test4' }}></div>
	<div class="element" use:inView={{ id: 'text5' }}></div>
</section>

<style>
	:global {
		body {
			margin: 0;
			padding: 0;
		}
	}

	.sticky-top {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;

		background-color: rgba(0, 0, 0, 0.5);
	}

	.sticky-top,
	.element {
		--py: 64px;
		padding-top: var(--py);
		padding-bottom: var(--py);

		padding-left: 8px;
		padding-right: 8px;

		color: white;

		font-size: 32px;
	}

	.element {
		&:nth-child(1) {
			background-color: crimson;
		}

		&:nth-child(2) {
			background-color: rgb(20, 140, 220);
		}

		&:nth-child(3) {
			background-color: rgb(20, 220, 70);
		}

		&:nth-child(4) {
			background-color: rgb(200, 220, 20);
		}

		&:nth-child(5) {
			background-color: rgb(203, 20, 220);
		}
	}
</style>
