<script>
	export let pages, changePage, state;
</script>

<details id="nav">
	<summary style="z-index:9999">&nbsp;</summary>
	<ul>
		{#each pages as pj, i}
			<li
				class={state.currentPage === pj.page ? "active" : ""}
				on:click={changePage}
				style="animation-delay:{i / 20}s"
			>
				{pj.page}
			</li>
		{/each}
		<li style="animation-delay:0.2s">
			<a href="http://edu.sedscelestia.org">Education</a>
		</li>
		<li style="animation-delay:0.25s">
			<a href="http://blog.sedscelestia.org">Blog</a>
		</li>
	</ul>
</details>

<style type="text/scss">
	#nav {
		position: absolute;
		top: 10px;
		left: 10px;
		color: #fff;
		z-index: 5;
	}
	details > summary {
		list-style-type: none;
		z-index: 1;
		outline: none;
		font-size: 3em;

		&::-webkit-details-marker {
			display: none;
		}
		&::before {
			content: "+";
		}
	}
	details[open] > summary::before {
		content: "-";
	}
	ul {
		position: fixed;
		width: 100%;
		top: -15px;
		left: 0;
		overflow: hidden;
		height: 100%;
		z-index: -1;
		background: #0004;
		color: #fff;
		backdrop-filter: blur(32px);
		-moz-backdrop-filter: blur(32px);
		-webkit-backdrop-filter: blur(32px);
		list-style: none;
		text-align: center;
		padding: 10% 0;
		li {
			position: relative;
			opacity: 0;
			animation: enter forwards 0.5s ease;
			padding: 10px;
			width: 200px;
			margin: 0 auto;
			cursor: pointer;
			font-size: 2rem;
		}
		.active {
			font-weight: bold;
			background: linear-gradient(to right, #60f, #18f);
		}
	}
	@keyframes enter {
		to {
			opacity: 1;
		}
	}
</style>
