# Svelte Inview Next

A _simple_, _small_ and _easy_ to `use` intersection observer library for Svelte 5.

> ⚠ WIP, and the maintainer is not a web veteran. Expect bugs.

## Installation

```sh
$ npm install --save svelte-inview-next
# or
$ bun add svelte-inview-next
# or
$ pnpm add svelte-inview-next
# or
$ yarn add svelte-inview-next
```

## Usage

### Simple Example

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-inview-next';
</script>

<div use:inView={{ id: 'testElement' }}>test</div>

{isInView('testElement') ? 'In' : 'Out'}
```

### Lazy Loading Images

Lazy loading of images before they enter the viewport.

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-inview-next';
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

Play/pause a video when it's in/out of the viewport.

```svelte
<script lang="ts">
	import { inView, isInView } from 'svelte-inview-next';

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
