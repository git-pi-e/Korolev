import statix from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: statix({
			pages: 'build',
			assets: 'build',
			precompress: true
		}),
		prerender: { default: true }
	}
};