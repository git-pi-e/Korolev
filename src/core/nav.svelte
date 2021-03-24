<script>
	export let pages, changePage, state, navTog;
</script>

<div id="nav">
	<svg
		viewBox="0 0 32 32"
		width="32"
		height="32"
		stroke-width="2"
		on:click={navTog}
	>
		<path
			d={state.showNav
				? "M10 6 L2 16 10 26 M2 16 L30 16"
				: "M4 8 L28 8 M4 16 L28 16 M4 24 L28 24"}
		/>
	</svg>
</div>
{#if state.showNav}
	<nav>
		<ul>
			{#each pages as pj, i}
				<li
					class={state.currentPage === pj.page ? "active" : ""}
					on:click={changePage}
					style="animation-delay:{i / 10}s"
				>
					{pj.page}
				</li>
			{/each}
			<li style="animation-delay:0.4s">
				<a href="http://edu.sedscelestia.org">Education</a>
			</li>
			<li style="animation-delay:0.5s">
				<a href="http://blog.sedscelestia.org">Blog</a>
			</li>
		</ul>
	</nav>
{/if}

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
		-webkit-backdrop-filter: blur(15px);
	}
	ul {
		list-style: none;
		text-align: center;
		li {
			position: relative;
			left: -30px;
			opacity: 0;
			animation: enter forwards 0.5s ease;
			padding: 10px;
			cursor: pointer;
			font-size: 2rem;
		}
		.active {
			font-weight: bold;
			background: #60f;
		}
	}
	@keyframes enter {
		to {
			left: 0;
			opacity: 1;
		}
	}
</style>
