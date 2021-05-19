import statix from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: node(),
		target: 'main'
	}
};

export default config;