<script>
	import data from '$lib/data/home';
	import Logo from '$lib/components/micro/logo.svelte';
	import { Containr } from '$lib/shared';
	import Rocket from '$lib/components/macro/rocket.svelte';
	import { onMount } from 'svelte';

	import { base } from '$app/paths';

	import links from '$lib/data/routes.json';

	onMount(() => {
		const target = document.querySelector('#rocket');
		let handleIntersection = (entries) =>
			entries.map((entry) => {
				if (entry.isIntersecting) entry.target.childNodes[0].classList.add('display');
			});
		const observer = new IntersectionObserver(handleIntersection);
		observer.observe(target);
		return 0;
	});
</script>

<title>Home | SEDS Celestia</title>
<celestia-page class="p-0 m-0">
	<div class="section">
		<div class="image-container p-0 m-0 w-100 po-rel" style="height:100vh;">
			<div class="z-0 po-abs w-gen logo">
				<Logo wd="200" />
			</div>
			<!-- <img
				class="m-0 w-100 h-100"
				src="https://stsci-opo.org/STScI-01GF42D0KV99R21EAD1RAZ3JB7.png"
				alt=""
			/> -->
		</div>
		<div
			class="p-20 po-abs flex jtx-ct welc"
			bg="0008"
			style="height:calc(100% - 40px);width:calc(100% - 40px)"
		>
			Welcome to SEDS Celestia

		</div>
		<div class="po-abs w-100 flex jtx-ct darr">&darr;</div>
	</div>
	<section class="adaptive">
		<article class="flex jtx-ar">
			<a href="/projects">
				<button class="btn-std">Projects</button>
			</a>
			<a href="http://blog.sedscelestia.org">
				<button class="btn-std">Blog</button>
			</a>
		</article>

		<div id="rocket" style="min-height:100px;">
			<Rocket />
		</div>
		<Containr title="Through the Telescope" icon="clock" bg="e66-c26">
			<article class="flex-col p-10 milestones rx-5" slot="body">
				{#each data.miles.reverse() as event}
					<div class="tx-c m-10 p-10" style="white-space: nowrap;">
						<div class="p-10">{event.event}</div>
						<div class="po-rel">
							<li class="p-0 m-0 po-abs" style="top:-0.66em;left:calc(50% - 5px);font-size:48px;" />
							<hr />
						</div>
						<div class="p-10">{event.year}</div>
					</div>
				{/each}
			</article>
		</Containr>
		<Containr title="Connect With Us" icon="heart" bg="66e-37f">
			<article class="social-links" slot="body">
			  <a target="_blank" href={links.content.yt}>
				<img class="social-icon" src="{base}/assets/icons/youtube.svg" alt="Youtube" />
			  </a>
			  <a target="_blank" href={links.social.fb}>
				<img class="social-icon" src="{base}/assets/icons/facebook.svg" alt="Facebook" />
			  </a>
			  <a target="_blank" href={links.social.ig}>
				<img class="social-icon" src="{base}/assets/icons/insta.svg" alt="Instagram" />
			  </a>
			  <a target="_blank" href={links.social.tw}>
				<img class="social-icon" src="{base}/assets/icons/twitter.svg" alt="Twitter" />
			  </a>
			  <a target="_blank" href={links.social.spo}>
				<img class="social-icon" src="{base}/assets/icons/spotify.svg" alt="Spotify" />
			  </a>
			</article>
		  </Containr>
		  
	</section>
</celestia-page>

<style type="text/scss" lang="scss">
	.logo {
		opacity: 0;
		transform: translateY(40vh) scale(1);
		--offset: calc(2 * (50% - 100px));
		padding: 10px calc(50% - 100px);
		animation: logopen 2s ease forwards;
	}
	.welc {
		align-items: center;
		top: 0;
		opacity: 0;
		font-size: 3em;
		animation: welcs 2s ease forwards;
	}
	.darr {
		bottom: 5px;
		font-size: 4em;
		animation: darr 2s ease forwards;
		transform: translateY(-20vh);
		opacity: 0;
	}
	article {
		margin: 20px auto;
	}
	.milestones {
		font-size: 24px;
		height: 400px;
		overflow-y: scroll;
	}
	.social-links {
		display: flex;
		justify-content: space-evenly;
		padding: 10px;
	}

	.social-icon {
		width: 48px;
		height: 48px;
		transition:
			width 0.3s,
			height 0.3s;
	}

	@media (max-width: 768px) {
		.social-icon {
			width: 40px;
			height: 40px;
		}
	}

	@media (max-width: 480px) {
		.social-icon {
			width: 32px;
			height: 32px;
		}
	}
</style>
