import statix from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: statix(),
		target: 'main'
	}
};