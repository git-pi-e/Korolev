<script>
	import Nav from "./core/nav.svelte";
	import Home from "./components/home.svelte";

	import Team from "./components/team.svelte";
	import Proj from "./components/proj.svelte";
	import Facc from "./components/facc.svelte";

	import prjs from "./core/projects.json";
	import data from "./core/data.json";

	$: state = { showNav: 0, currentPage: "Projects" };

	const navTog = () => (state.showNav = !state.showNav);

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

<Nav {pages} {state} {changePage} {navTog} />

{#if state.currentPage == "Team"}
	<svelte:component this={Team} data={data.team} />
{:else if state.currentPage == "Facilities"}
	<svelte:component this={Facc} data={data.facilities} />
{:else if state.currentPage == "Projects"}
	<svelte:component this={Proj} data={prjs} />
{:else}
	<svelte:component this={Home} data={data.home} />
{/if}

<style type="text/scss">
</style>
