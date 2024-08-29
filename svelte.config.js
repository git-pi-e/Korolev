// import adapter from '@sveltejs/adapter-auto';
import statix from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: statix({
			pages: 'build',
			assets: 'build',
			precompress: true
		}),
		prerender: {
			entries: ['*'],  // Define specific pages or set to ['*'] for all pages
	}
	}
};

export default config;
