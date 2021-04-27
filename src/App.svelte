<script>
  export let basePage;
  import Nav from "./micro/nav.svelte";
  import Home from "./pages/home.svelte";

  import Footer from "./micro/footer.svelte";

  import Team from "./pages/team.svelte";
  import Proj from "./pages/proj.svelte";
  import Facc from "./pages/events.svelte";
  import Obs from "./pages/obs.svelte";

  $: currentPage = basePage;
  const changePage = (page) => {
    if (typeof page === "string") currentPage = page;
    else {
      currentPage = document.querySelector("input[name=navigator]:checked")
        .value;
      document.querySelector("#nav").removeAttribute("open");
    }
    window.history.pushState(
      {},
      "",
      window.location.href.split("#")[0] + "#" + currentPage
    );
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const pages = [
    { page: "Home", component: Home },
    { page: "Team", component: Team },
    { page: "Observations", component: Obs },
    { page: "Events", component: Facc },
    { page: "Projects", component: Proj },
  ];
</script>

<Nav {pages} {changePage} {currentPage} />

{#if currentPage == 'Team'}
  <svelte:component this={Team} />
{:else if currentPage == 'Events'}
  <svelte:component this={Facc} />
{:else if currentPage == 'Observations'}
  <svelte:component this={Obs} />
{:else if currentPage == 'Projects'}
  <svelte:component this={Proj} />
{:else}
  <svelte:component this={Home} {changePage} />
{/if}

<Footer {changePage} {pages} />
