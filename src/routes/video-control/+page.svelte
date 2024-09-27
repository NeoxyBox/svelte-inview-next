<script lang="ts">
	import { inView, isInView } from '$lib/index.js';

	let videoElement: HTMLVideoElement;

	$effect(() => {
		if (isInView('video')) {
			// ? use navigator.userActivation.hasBeenActive to don't get autoplay error.
			videoElement?.play();
		} else {
			videoElement?.pause();
		}
	});
	$inspect(isInView('video'));
</script>

<div style="height: 200vh;">
	<video width="500" controls use:inView={{ id: 'video' }} bind:this={videoElement}>
		<source
			src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
			type="video/mp4"
		/>
	</video>
</div>
