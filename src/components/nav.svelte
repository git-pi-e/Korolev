<script>
	export let pages, currentPage;

	import { fade } from "svelte/transition";

	let showNav = false;
</script>

<style type="text/scss">
	#nav {
		position: absolute;
		top: 10px;
		left: 10px;
		cursor: pointer;
		color: #fff;
		z-index: 2;
	}
	nav {
		width: 100%;
		height: 100%;
		z-index: 1;
		background: #0008;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		backdrop-filter: blur(20px);
		-moz-backdrop-filter: blur(20px);
		-ms-backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}
	ul {
		list-style: none;
		text-align: center;
		li {
			padding: 10px;
			cursor: pointer;
			font-size: 2rem;
		}
	}
</style>

<div id="nav">
	<svg
		viewBox="0 0 32 32"
		width="32"
		height="32"
		stroke-width="2"
		on:click={() => (showNav = !showNav)}>
		<path
			d={showNav ? 'M10 6 L2 16 10 26 M2 16 L30 16' : 'M4 8 L28 8 M4 16 L28 16 M4 24 L28 24'} />
	</svg>
</div>
{#if showNav}
	<nav transition:fade>
		<ul>
			{#each pages as pj}
				<li on:click={() => (currentPage = pj)}>{pj}</li>
			{/each}
		</ul>
	</nav>
{/if}
