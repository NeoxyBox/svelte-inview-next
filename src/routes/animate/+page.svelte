<script lang="ts">
	import { inView, isInView } from '$lib/index.js';

	$inspect(isInView('box'));
</script>

<section>
	<!-- ! threshold 1.0 flickers when page loaded with element in viewport -->
	<div class:animate={isInView('box')} use:inView={{ id: 'box', rootMargin: '-116px' }}></div>
</section>

<style>
	section {
		height: 300vh;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	section > div {
		background-color: rgb(30, 120, 255);
		border-radius: 12px;

		width: 128px;
		height: 128px;
	}

	.animate {
		animation: rotate 300ms 100ms normal forwards ease-in-out;
	}

	@keyframes rotate {
		100% {
			transform: rotateZ(180deg);
		}
	}
</style>
