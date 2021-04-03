<script>
	import Nav from "./core/nav.svelte";
	import Home from "./components/home.svelte";

	import Team from "./components/team.svelte";
	import Proj from "./components/proj.svelte";
	import Facc from "./components/facc.svelte";
	import Obs from "./components/obs.svelte";

	import data from "./core/data.json";

	$: currentPage = "Observations";

	const changePage = () => {
		currentPage = document.querySelector("input[name=navigator]:checked")
			.value;
		document.querySelector("#nav").removeAttribute("open");
	};

	const pages = [
		{ page: "Home", component: Home },
		{ page: "Team", component: Team },
		{ page: "Observations", component: Obs },
		{ page: "Facilities", component: Facc },
		{ page: "Projects", component: Proj },
	];
</script>

<Nav {pages} {changePage} />

{#if currentPage == "Team"}
	<svelte:component this={Team} data={data.team} />
{:else if currentPage == "Facilities"}
	<svelte:component this={Facc} data={data.facilities} />
{:else if currentPage == "Observations"}
	<svelte:component this={Obs} data={data.lookUp} />
{:else if currentPage == "Projects"}
	<svelte:component this={Proj} />
{:else}
	<svelte:component this={Home} data={data.home} />
{/if}
