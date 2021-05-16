import sveltePreprocess from "svelte-preprocess";

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'main'
	},
	preprocess: sveltePreprocess()
};

export default config;
