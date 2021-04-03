<script>
	export let pages, changePage;
</script>

<link rel="preconnect" href="http://edu.sedscelestia.org" />
<link rel="preconnect" href="http://blog.sedscelestia.org" />

<details id="nav">
	<summary style="z-index:9999">&nbsp;</summary>
	<ul class="blur w-100" on:click={changePage}>
		{#each pages as pj, i}
			<li style="animation-delay:{i / 20}s">
				<input
					type="radio"
					name="navigator"
					value={pj.page}
					checked={pj.page === "Home" ? 1 : 0}
				/>
				<label for={pj.page}>{pj.page}</label>
			</li>
		{/each}
		<li
			style="animation-delay:0.2s"
			onclick="window.location.href='http://edu.sedscelestia.org'"
		>
			<input type="radio" name="navigator" value="Education" />
			<label for="Education">Education</label>
		</li>
		<li
			style="animation-delay:0.25s"
			onclick="window.location.href='http://blog.sedscelestia.org'"
		>
			<input type="radio" name="navigator" value="Blog" />
			<label for="Blog">Blog</label>
		</li>
	</ul>
</details>

<style type="text/scss">
	details > summary {
		z-index: 1;
		outline: none;
		font-size: 3em;

		&::-webkit-details-marker {
			display: none;
		}
		&::before {
			display: block;
			content: " ";
			background-image: url("../assets/svgs/bars.svg");
			background-size: 28px 28px;
			height: 28px;
			width: 28px;
		}
	}
	details[open] > summary::before {
		background-image: url("../assets/svgs/times.svg");
	}
	ul {
		position: fixed;
		top: -15px;
		left: 0;
		overflow: hidden;
		list-style: none;
		height: 100%;
		z-index: -1;
		color: #fff;
		animation: enter forwards 0.5s ease;
		text-align: center;
		padding: 10% 0;
		li {
			position: relative;
			opacity: 0;
			animation: enter forwards 0.5s ease;
			width: 7em;
			margin: 0 auto;
			padding: 10px;
			font-size: 2rem;
		}
	}
	#nav {
		position: absolute;
		top: 10px;
		left: 10px;
		color: #fff;
		z-index: 5;
		input[name="navigator"] {
			width: 100%;
			opacity: 0 !important;
			height: 4em;
		}
		label {
			padding: 10px;
			width: 6em;
			text-align: center;
			pointer-events: none !important;
			position: absolute;
			top: calc(0.5em - 10px);
			left: 1.25em;
		}
		input[name="navigator"]:checked + label {
			background: linear-gradient(to right, #60f, #18f);
		}
	}
	@keyframes enter {
		to {
			opacity: 1;
		}
	}
</style>
