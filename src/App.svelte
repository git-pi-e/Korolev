<script>
	import Nav from "./core/nav.svelte";
	import Home from "./components/home.svelte";

	import data from "./core/data.json";

	$: state = { showNav: 0, currentPage: "Home" };
	let Team, Facc, Proj;

	const navTog = () => {
		state.showNav = !state.showNav;
		if (!Team) {
			import("./components/team.svelte").then((r) => (Team = r.default));
			import("./components/facc.svelte").then((r) => (Facc = r.default));
			import("./components/proj.svelte").then((r) => (Proj = r.default));
		}
	};
	const changePage = (e) => {
		navTog();
		state.currentPage = e.target.innerText;
	};

	const pages = [
		{ page: "Home", component: Home },
		{ page: "Team", component: Team },
		{ page: "Facilities", component: Facc },
		{ page: "Projects", component: Proj },
	];
</script>

<style type="text/scss">
</style>

<Nav {pages} {state} {changePage} {navTog} />

{#if state.currentPage == 'Team'}
	<svelte:component this={Team} data={data.team} />
{:else if state.currentPage == 'Facilities'}
	<svelte:component this={Facc} data={data.facilities} />
{:else if state.currentPage == 'Projects'}
	<svelte:component this={Proj} data={data.projects} />
{:else}
	<svelte:component this={Home} data={data.home} />
{/if}

<!-- <svelte:component
	this={pages[pages.findIndex((e) => e.page === state.currentPage)].component}
	data={data[state.currentPage.toLowerCase()]} /> -->
