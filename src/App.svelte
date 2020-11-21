<script>
	import Nav from "./components/nav.svelte";
	import Team from "./components/team.svelte";
	import Home from "./components/home.svelte";
	import Education from "./components/edu.svelte";
	import Facilities from "./components/facilities.svelte";
	import Projects from "./components/projects.svelte";

	import data from "./core/data.json";

	$: showNav = false;

	const navTog = () => (showNav = !showNav);
	const changePage = (e) => {
		navTog();
		currentPage = e.target.innerText;
	};

	$: currentPage = "Home";
	const pages = [
		{ page: "Home", component: Home },
		{ page: "Education", component: Education },
		{ page: "Team", component: Team },
		{ page: "Facilities", component: Facilities },
		{ page: "Projects", component: Projects },
	];
</script>

<style type="text/scss">
</style>

<Nav {pages} {currentPage} {changePage} {navTog} {showNav} />

<svelte:component
	this={pages[pages.findIndex((e) => e.page === currentPage)].component}
	data={data[currentPage.toLowerCase()]} />
