# Svelte Inview

A _simple_ and _easy_ to `use` intersection observer library for Svelte 5.

> ⚠ WIP, expect bugs.

## Installation

This library just relies on Svelte 5.

```sh
$ npm install --save svelte-5-inview
# or
$ bun add svelte-5-inview
# or
$ pnpm add svelte-5-inview
```

## Usage

### Simple Example

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-5-inview';
</script>

<div use:inView={{ id: 'testElement' }}>test</div>

{isInView('testElement') ? 'In' : 'Out'}
```

### Lazy Loading Images

Lazy loading images before they enter the viewport.

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-5-inview';
</script>

<div use:inView={{ id: 'image', rootMargin: '100px', once: true }}>
	{#if isInView('image')}
		<img src="path/to/image.jpg" />
	{:else}
		<div class="placeholder" />
	{/if}
</div>
```

### Video Control

Play/pause a video when it's in/out the viewport.

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-5-inview';

	let videoElement: HTMLVideoElement;
	$effect(() => {
		if (isInView('video')) {
			videoElement?.play();
		} else {
			videoElement?.pause();
		}
	});
</script>

<div>
	<video width="500" controls use:inView={{ id: 'video' }} bind:this={videoElement}>
		<source src="path/to/video.mp4" type="video/mp4" />
	</video>
</div>
```

# License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
