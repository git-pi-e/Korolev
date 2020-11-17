<script>
	export let pages, currentPage, changePage, showNav, navTog;

	import { fade } from "svelte/transition";
</script>

<style type="text/scss">
	#nav {
		position: absolute;
		top: 10px;
		left: 10px;
		cursor: pointer;
		color: #fff;
		z-index: 5;
	}
	nav {
		position: fixed;
		width: 100%;
		overflow: hidden;
		height: 100%;
		z-index: 4;
		background: #0006;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		backdrop-filter: blur(15px);
		-moz-backdrop-filter: blur(15px);
		-ms-backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
	}
	ul {
		list-style: none;
		text-align: center;
		li {
			padding: 10px;
			cursor: pointer;
			font-size: 2rem;
			.active {
				font-weight: bold;
				background: #60f;
			}
		}
	}
</style>

<div id="nav">
	<svg
		viewBox="0 0 32 32"
		width="32"
		height="32"
		stroke-width="2"
		on:click={navTog}>
		<path
			d={showNav ? 'M10 6 L2 16 10 26 M2 16 L30 16' : 'M4 8 L28 8 M4 16 L28 16 M4 24 L28 24'} />
	</svg>
</div>
{#if showNav}
	<nav>
		<ul>
			{#each pages as pj}
				<li
					class={currentPage == pj.page ? 'active' : ''}
					on:click={changePage}>
					{pj.page}
				</li>
			{/each}
		</ul>
	</nav>
{/if}
