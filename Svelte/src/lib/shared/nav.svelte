<script>
  import { onMount } from "svelte";
  import links from "$lib/data/routes.json";

  let currentPage;

  onMount(() => {
    currentPage = window.location.href;
  });
</script>

<details id="nav" class="po-stx z-5">
  <summary class="po-rel" style="z-index:9999" />
  <ul class="blur w-100 h-100 tx-c po-fix">
    {#each links.internal as pj, i}
      <li style="animation-delay:{i / 20}s">
        <input
          type="radio"
          name="navigator"
          class="w-100"
          value={pj}
          checked={i === 0}
        />
        <label for={pj}>{pj}</label>
      </li>
    {/each}
    <li
      style="animation-delay:0.2s"
      onclick="window.location.href='http://edu.sedscelestia.org'"
    >
      <input type="radio" name="navigator" value="Education" />
      <label for="Education">Education</label>
    </li>
    <li
      style="animation-delay:0.25s"
      onclick="window.location.href='http://blog.sedscelestia.org'"
    >
      <input type="radio" name="navigator" value="Blog" />
      <label for="Blog">Blog</label>
    </li>
  </ul>
</details>

<style type="text/scss">
  details > summary {
    font-size: 3em;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
    &::details-marker {
      display: none;
    }
    &::before {
      display: inline-block;
      content: " ";
      background-image: url("../assets/svgs/bars.svg");
      background-size: 28px 28px;
      height: 28px;
      width: 28px;
    }
  }
  details[open] > summary::before {
    background-image: url("../assets/svgs/times.svg");
  }
  ul {
    top: -1em;
    left: 0;
    list-style: none;
    z-index: -1;
    color: #fff;
    animation: enter forwards 0.5s ease;
    padding: 10% 0;
    li {
      position: relative;
      left: -1em;
      opacity: 0;
      animation: enter forwards 0.5s ease;
      width: 7em;
      margin: 0 auto;
      padding: 10px;
      font-size: 2rem;
    }
  }
  #nav {
    top: 10px;
    left: 10px;
    height: 0;
    input[name="navigator"] {
      opacity: 0 !important;
      height: 3em;
    }
    label {
      padding: 10px;
      width: 6em;
      text-align: center;
      pointer-events: none !important;
      position: absolute;
      top: calc(0.5em - 10px);
      left: 1.25em;
    }
    input[name="navigator"]:checked + label {
      background: linear-gradient(to right, #60f, #18f);
    }
  }
  @keyframes enter {
    to {
      opacity: 1;
    }
  }
</style>
