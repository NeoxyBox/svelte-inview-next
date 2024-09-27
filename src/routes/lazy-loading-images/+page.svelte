<script lang="ts">
	import { inView, isInView } from '$lib/index.js';
</script>

{#snippet image(id: string)}
	{@const ivId = 'image' + id}
	<div use:inView={{ id: ivId, rootMargin: '50px', once: true }}>
		{#if isInView(ivId)}
			<img
				src="https://picsum.photos/id/{Math.floor(Math.random() * 50)}/200/300"
				alt="placeholder"
			/>
		{/if}
		<!-- or use a placeholder, loader etc. -->
	</div>
{/snippet}

<section>
	<div>
		{@render image('1')}
		{@render image('2')}
		{@render image('3')}
		{@render image('4')}
		{@render image('5')}
		{@render image('6')}
	</div>
</section>

<style>
	:global {
		section > div {
			& div,
			& img {
				width: 200px;
				height: 300px;
			}
		}

		section > div {
			position: absolute;
			display: flex;
			gap: 4px;
			flex-wrap: wrap;
			bottom: 0;
			left: 0;
		}
	}

	section {
		height: 300vh;
		position: relative;
	}
</style>
