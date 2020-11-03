<script>
	import Nav from "./components/nav.svelte";
	import Home from "./components/home.svelte";
	import Team from "./components/team.svelte";
	import Facilities from "./components/facilities.svelte";
	import Events from "./components/events.svelte";
	import Observations from "./components/observations.svelte";
	import Projects from "./components/projects.svelte";

	import data from "./core/data.json";

	$: currentPage = "Facilities";
	const pages = [
		{ page: "Home", component: Home },
		{ page: "Team", component: Team },
		{ page: "Facilities", component: Facilities },
		{ page: "Observations", component: Events },
		{ page: "Talks", component: Projects },
		{ page: "Projects", component: Observations },
	];
</script>

<style type="text/scss">
</style>

<Nav {pages} {currentPage} />

<svelte:component
	this={pages[pages.findIndex((el) => el.page === currentPage)].component}
	data={data[currentPage.toLowerCase()]} />
<!-- <Facilities /> -->
