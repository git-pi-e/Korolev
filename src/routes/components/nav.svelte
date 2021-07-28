<script>
  import { onMount } from "svelte";
  import links from "$lib/data/routes.json";

  let currentPage;

  const navs = [
    ...Object.entries(links.internal),
    ["Education", links.web.educelestia],
    ["Blog", links.content.blog],
  ];

  const refreshHighlighted = () => (currentPage = window.location.pathname);
  onMount(refreshHighlighted);
</script>

<details id="nav" class="po-stx z-5" on:click={refreshHighlighted}>
  <summary class="po-rel" style="z-index:9999" />
  <div
    class="ul blur w-100 h-100 tx-c po-fix"
    onclick="this.parentElement.removeAttribute('open')"
  >
    {#each navs as pj, i}
      <a
        sveltekit:prefetch
        class="li {pj[1] === currentPage ? 'active' : ''}"
        href={pj[1]}
        style="animation-delay:{i / 20}s"
      >
        {pj[0]}
      </a>
    {/each}
  </div>
</details>

<style type="text/scss">
  details > summary {
    font-size: 3em;
    list-style: none;
    padding-left: 1rem;

    &::-webkit-details-marker {
      display: none;
    }
    &::details-marker {
      display: none;
    }
    &::before {
      display: inline-block;
      content: " ";
      background-image: url("/assets/svgs/bars.svg");
      background-size: 28px 28px;
      height: 28px;
      width: 28px;
    }
  }
  details[open] > summary::before {
    background-image: url("/assets/svgs/times.svg");
  }
  .ul {
    top: -1em;
    left: 0;
    list-style: none;
    z-index: -1;
    color: #fff;
    animation: enter forwards 0.5s ease;
    padding: 10% 0;
    .li {
      text-transform: capitalize;
      display: block;
      opacity: 0;
      animation: enter forwards 0.5s ease;
      width: 7em;
      margin: 1rem auto;
      padding: 0.75rem 0;
      font-size: 2rem;
    }
  }
  #nav {
    top: 10px;
    left: 20px;
    height: 0;
    .active {
      background: linear-gradient(to right, #60f, #18f);
    }
  }
  @keyframes enter {
    to {
      opacity: 1;
    }
  }
</style>
