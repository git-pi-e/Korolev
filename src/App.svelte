<script>
	import Nav from "./components/nav.svelte";

	let currentPage = "Home";
	const pages = [
		"Home",
		"Events",
		"Observations",
		"Talks",
		"Projects",
		"About",
	];
</script>

<style type="text/scss">
</style>

<Nav {pages} {currentPage} />
