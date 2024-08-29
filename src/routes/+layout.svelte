<script>
	import Navigator from "$lib/components/site/nav.svelte";
	import Footer from "$lib/components/site/footer.svelte";
</script>

<Navigator />

<main>
	<slot />
</main>

<Footer />