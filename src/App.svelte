<script>
	import Nav from "./nav.svelte";
	import Home from "./components/home.svelte";

	import Footer from "./micro/footer.svelte";

	import Team from "./components/team.svelte";
	import Proj from "./components/proj.svelte";
	import Facc from "./components/facc.svelte";
	import Obs from "./components/obs.svelte";

	$: currentPage = "Home";

	const changePage = (page) => {
		if (typeof page === "string") currentPage = page;
		else {
			console.log(
				document.querySelector("input[name=navigator]:checked").value
			);
			currentPage = document.querySelector(
				"input[name=navigator]:checked"
			).value;
			document.querySelector("#nav").removeAttribute("open");
		}
	};

	const pages = [
		{ page: "Home", component: Home },
		{ page: "Team", component: Team },
		{ page: "Observations", component: Obs },
		{ page: "Facilities", component: Facc },
		{ page: "Projects", component: Proj },
	];
</script>

<Nav {pages} {changePage} {currentPage} />

{#if currentPage == "Team"}
	<svelte:component this={Team} />
{:else if currentPage == "Facilities"}
	<svelte:component this={Facc} />
{:else if currentPage == "Observations"}
	<svelte:component this={Obs} />
{:else if currentPage == "Projects"}
	<svelte:component this={Proj} />
{:else}
	<svelte:component this={Home} {changePage} />
{/if}

<Footer {changePage} />
