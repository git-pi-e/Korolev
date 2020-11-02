<script>
	import Nav from "./components/nav.svelte";
	import Home from "./components/home.svelte";
	import About from "./components/about.svelte";
	import Facilities from "./components/facilities.svelte";
	import Events from "./components/events.svelte";
	import Observations from "./components/observations.svelte";
	import Projects from "./components/projects.svelte";

	let currentPage = "Home";
	const pages = [
		"Home",
		"Events",
		"Facilities",
		"Observations",
		"Talks",
		"Projects",
		"About",
	];
</script>

<style type="text/scss">
</style>

<Nav {pages} {currentPage} />
<Facilities />
