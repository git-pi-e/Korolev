<script>
	export let pages, changePage;
</script>

<link rel="preconnect" href="http://edu.sedscelestia.org" />
<link rel="preconnect" href="http://blog.sedscelestia.org" />

<details id="nav">
	<summary style="z-index:9999">&nbsp;</summary>
	<ul class="blur" on:click={changePage}>
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
		color: #fff;
		animation: enter forwards 0.5s ease;
		list-style: none;
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
	@keyframes enter {
		to {
			opacity: 1;
		}
	}
</style>
